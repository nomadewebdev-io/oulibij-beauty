'use server'

import { createClient } from '@/lib/supabase/server'
import { BookingFormData, RendezVous, Service } from '@/types'
import { SALON_INFO, DEFAULT_SERVICES } from '@/lib/constants'
import { revalidatePath } from 'next/cache'

export interface BookingResult {
  success: boolean
  message: string
  appointmentId?: string
}

function isValidUuid(id?: string | null): boolean {
  if (!id) return false
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

export async function createAppointmentAction(formData: BookingFormData): Promise<BookingResult> {
  try {
    const supabase = await createClient()

    // 1. Check user authentication if logged in
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // 2. Fetch service duration and price to compute end time & total price
    let duration = 45
    let price = 0

    if (isValidUuid(formData.serviceId)) {
      const { data: serviceData } = await supabase
        .from('services')
        .select('duree_minutes, prix')
        .eq('id', formData.serviceId)
        .maybeSingle()

      if (serviceData) {
        const s = serviceData as unknown as { duree_minutes?: number; prix?: number }
        duration = s.duree_minutes || 45
        price = s.prix || 0
      } else {
        const fallback = DEFAULT_SERVICES.find((s) => s.id === formData.serviceId)
        if (fallback) {
          duration = fallback.duree_minutes || 45
          price = fallback.prix || 0
        }
      }
    } else {
      const fallback = DEFAULT_SERVICES.find((s) => s.id === formData.serviceId)
      if (fallback) {
        duration = fallback.duree_minutes || 45
        price = fallback.prix || 0
      }
    }

    // Compute start and end timestamps
    const startDateTime = new Date(`${formData.date}T${formData.time}:00`)
    const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000)

    const cleanServiceId = isValidUuid(formData.serviceId) ? formData.serviceId : null
    const cleanStaffId = isValidUuid(formData.staffId) ? formData.staffId : null
    const cleanSalonId = isValidUuid(formData.salonId) ? formData.salonId : SALON_INFO.id

    // 3. Insert appointment into rendez_vous table
    const { data: newRdvData, error } = await (supabase
      .from('rendez_vous') as any)
      .insert({
        salon_id: cleanSalonId,
        service_id: cleanServiceId,
        staff_id: cleanStaffId,
        client_id: user?.id || null,
        client_nom: formData.clientName,
        client_email: formData.clientEmail,
        client_telephone: formData.clientPhone,
        date_heure_debut: startDateTime.toISOString(),
        date_heure_fin: endDateTime.toISOString(),
        notes_client: formData.notes || null,
        statut: 'en_attente',
        prix_total: price,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error creating appointment:', error)
      if (error.message?.includes('schema cache') || error.code === 'PGRST205') {
        return {
          success: false,
          message:
            "Configuration Supabase : les tables de la base de données ne sont pas encore créées. Veuillez exécuter le script SQL 'supabase/setup_complete.sql' dans l'éditeur SQL de votre console Supabase.",
        }
      }
      return {
        success: false,
        message: `Erreur lors de la réservation : ${error.message}`,
      }
    }

    const newRdv = newRdvData as { id: string }

    revalidatePath('/dashboard')
    revalidatePath('/rendez-vous')
    revalidatePath('/compte/mes-rendez-vous')

    return {
      success: true,
      message: 'Votre réservation a été enregistrée avec succès.',
      appointmentId: newRdv?.id,
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Erreur inattendue'
    console.error('Error in createAppointmentAction:', err)
    return {
      success: false,
      message: `Une erreur est survenue: ${errorMessage}`,
    }
  }
}

export async function getUserAppointments(): Promise<RendezVous[]> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await (supabase
      .from('rendez_vous') as any)
      .select(`
        *,
        service:services(*),
        staff:staff(*)
      `)
      .eq('client_id', user.id)
      .order('date_heure_debut', { ascending: false })

    if (error) {
      console.error('Error fetching user appointments:', error.message)
      return []
    }

    return (data as unknown as RendezVous[]) || []
  } catch (err) {
    console.error('Error in getUserAppointments:', err)
    return []
  }
}

export async function cancelAppointmentAction(appointmentId: string): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { error } = await (supabase
      .from('rendez_vous') as any)
      .update({ statut: 'annule' })
      .eq('id', appointmentId)

    if (error) {
      console.error('Error cancelling appointment:', error)
      return false
    }

    revalidatePath('/dashboard')
    revalidatePath('/compte/mes-rendez-vous')
    return true
  } catch (err) {
    console.error('Error cancelling appointment:', err)
    return false
  }
}
