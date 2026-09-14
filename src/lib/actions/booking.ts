'use server'

import { createClient } from '@/lib/supabase/server'
import { BookingFormData, RendezVous, Service, Staff } from '@/types'
import { SALON_INFO } from '@/lib/constants'
import { revalidatePath } from 'next/cache'

export interface BookingResult {
  success: boolean
  message: string
  appointmentId?: string
}

export interface TimeSlotAvailability {
  time: string // e.g. "09:00"
  available: boolean
  assignedStaffId?: string
}

function isValidUuid(id?: string | null): boolean {
  if (!id) return false
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

function parseTimeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 60 + (minutes || 0)
}

function formatMinutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

/**
 * Calcule les créneaux disponibles pour une date, un service et une coiffeuse
 * en tenant compte des disponibilites et en excluant les créneaux pris dans rendez_vous.
 */
export async function getAvailableTimeSlotsAction(params: {
  salonId?: string
  serviceId: string
  staffId?: string
  date: string // YYYY-MM-DD
}): Promise<TimeSlotAvailability[]> {
  try {
    const supabase = await createClient()
    const salonId = isValidUuid(params.salonId) ? params.salonId : SALON_INFO.id

    // 1. Durée du service
    let serviceDuration = 45
    if (isValidUuid(params.serviceId)) {
      const { data: serviceData } = await (supabase
        .from('services') as any)
        .select('duree_minutes')
        .eq('id', params.serviceId)
        .maybeSingle()

      if (serviceData?.duree_minutes) {
        serviceDuration = Number(serviceData.duree_minutes)
      }
    }

    // 2. Jour de la semaine (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi)
    const [year, month, day] = params.date.split('-').map(Number)
    const dateObj = new Date(year, month - 1, day)
    const dayOfWeek = dateObj.getDay()

    // 3. Récupérer les membres du staff actifs
    let staffQuery = (supabase.from('staff') as any)
      .select('id, nom, prenom, specialite, is_active')
      .eq('salon_id', salonId)
      .eq('is_active', true)

    if (isValidUuid(params.staffId)) {
      staffQuery = staffQuery.eq('id', params.staffId)
    }

    const { data: staffList, error: staffError } = await staffQuery
    if (staffError || !staffList || staffList.length === 0) {
      return []
    }

    const activeStaff = staffList as Staff[]

    // 4. Récupérer les disponibilités pour ce jour de la semaine
    const staffIds = activeStaff.map((s) => s.id)
    const { data: dispoData } = await (supabase
      .from('disponibilites') as any)
      .select('*')
      .in('staff_id', staffIds)
      .eq('jour_semaine', dayOfWeek)
      .eq('is_active', true)

    // Si dimanche et aucun créneau explicitement défini, le salon est fermé
    if (dayOfWeek === 0 && (!dispoData || dispoData.length === 0)) {
      return []
    }

    // Map staffId -> plages de travail [debutMinutes, finMinutes]
    const staffWorkHoursMap = new Map<string, Array<{ start: number; end: number }>>()

    for (const staff of activeStaff) {
      const staffDispos = dispoData?.filter((d: any) => d.staff_id === staff.id) || []
      if (staffDispos.length > 0) {
        const ranges = staffDispos.map((d: any) => ({
          start: parseTimeToMinutes(d.heure_debut),
          end: parseTimeToMinutes(d.heure_fin),
        }))
        staffWorkHoursMap.set(staff.id, ranges)
      } else if (dayOfWeek !== 0) {
        // Horaires par défaut salon (09:00 - 19:00) si non configuré individuellement
        staffWorkHoursMap.set(staff.id, [{ start: 9 * 60, end: 19 * 60 }])
      }
    }

    // 5. Récupérer les rendez-vous existants pour cette date
    const startOfDay = new Date(`${params.date}T00:00:00.000Z`)
    const endOfDay = new Date(`${params.date}T23:59:59.999Z`)

    const { data: existingRdvs } = await (supabase
      .from('rendez_vous') as any)
      .select('id, staff_id, date_heure_debut, date_heure_fin, statut')
      .in('staff_id', staffIds)
      .neq('statut', 'annule')
      .gte('date_heure_debut', startOfDay.toISOString())
      .lte('date_heure_debut', endOfDay.toISOString())

    const appointments = (existingRdvs || []) as RendezVous[]

    // 6. Générer les créneaux toutes les 30 minutes de 09:00 à 18:30
    const startHourMinutes = 9 * 60
    const endHourMinutes = 19 * 60
    const slotStepMinutes = 30

    // Vérifier si la date est aujourd'hui pour exclure les heures passées
    const now = new Date()
    const isToday =
      now.getFullYear() === year &&
      now.getMonth() === month - 1 &&
      now.getDate() === day
    const currentMinutesNow = now.getHours() * 60 + now.getMinutes()

    const slotsResult: TimeSlotAvailability[] = []

    for (let minute = startHourMinutes; minute + serviceDuration <= endHourMinutes; minute += slotStepMinutes) {
      const timeStr = formatMinutesToTime(minute)
      const slotStartMin = minute
      const slotEndMin = minute + serviceDuration

      // Exclure si déjà passé aujourd'hui (avec marge de 15 minutes)
      if (isToday && slotStartMin <= currentMinutesNow + 15) {
        continue
      }

      // Chercher au moins une coiffeuse disponible
      let isAvailable = false
      let eligibleStaffId: string | undefined = undefined

      for (const staff of activeStaff) {
        const workRanges = staffWorkHoursMap.get(staff.id) || []
        // Vérifie si la coiffeuse travaille pendant toute la durée du soin
        const isWorking = workRanges.some(
          (range) => slotStartMin >= range.start && slotEndMin <= range.end
        )

        if (!isWorking) continue

        // Vérifie s'il y a un chevauchement avec un rendez-vous existant de cette coiffeuse
        const slotStartTimestamp = new Date(`${params.date}T${timeStr}:00`).getTime()
        const slotEndTimestamp = slotStartTimestamp + serviceDuration * 60 * 1000

        const hasConflict = appointments.some((rdv) => {
          if (rdv.staff_id !== staff.id) return false
          const rdvStart = new Date(rdv.date_heure_debut).getTime()
          const rdvEnd = new Date(rdv.date_heure_fin).getTime()
          // Chevauchement : début_rdv < fin_créneau ET fin_rdv > début_créneau
          return rdvStart < slotEndTimestamp && rdvEnd > slotStartTimestamp
        })

        if (!hasConflict) {
          isAvailable = true
          eligibleStaffId = staff.id
          break
        }
      }

      slotsResult.push({
        time: timeStr,
        available: isAvailable,
        assignedStaffId: eligibleStaffId,
      })
    }

    return slotsResult
  } catch (err) {
    console.error('Error in getAvailableTimeSlotsAction:', err)
    return []
  }
}

/**
 * Création de rendez-vous avec vérification d'authentification et anti-double réservation
 */
export async function createAppointmentAction(formData: BookingFormData): Promise<BookingResult> {
  try {
    const supabase = await createClient()

    // 1. Vérification stricte d'authentification
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        message: 'Vous devez être connecté(e) pour confirmer votre réservation.',
      }
    }

    if (!formData.serviceId || !formData.date || !formData.time) {
      return {
        success: false,
        message: 'Veuillez sélectionner une prestation, une date et un créneau horaire.',
      }
    }

    // 2. Récupération du service (durée et prix)
    let duration = 45
    let price = 0
    let cleanServiceId: string | null = null

    if (isValidUuid(formData.serviceId)) {
      const { data: serviceData } = await (supabase
        .from('services') as any)
        .select('id, duree_minutes, prix')
        .eq('id', formData.serviceId)
        .maybeSingle()

      if (serviceData) {
        cleanServiceId = serviceData.id
        duration = Number(serviceData.duree_minutes) || 45
        price = Number(serviceData.prix) || 0
      }
    }

    const cleanSalonId = isValidUuid(formData.salonId) ? formData.salonId : SALON_INFO.id

    // 3. Calcul des dates de début et fin
    const startDateTime = new Date(`${formData.date}T${formData.time}:00`)
    const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000)

    // 4. Déterminer la coiffeuse (si spécifique ou automatique)
    let assignedStaffId: string | null = isValidUuid(formData.staffId) ? formData.staffId! : null

    if (!assignedStaffId) {
      // Trouver une coiffeuse active disponible sur ce créneau
      const { data: activeStaff } = await (supabase
        .from('staff') as any)
        .select('id')
        .eq('salon_id', cleanSalonId)
        .eq('is_active', true)

      if (activeStaff && activeStaff.length > 0) {
        for (const staff of activeStaff) {
          // Vérifier conflit
          const { data: conflicts } = await (supabase
            .from('rendez_vous') as any)
            .select('id')
            .eq('staff_id', staff.id)
            .neq('statut', 'annule')
            .lt('date_heure_debut', endDateTime.toISOString())
            .gt('date_heure_fin', startDateTime.toISOString())

          if (!conflicts || conflicts.length === 0) {
            assignedStaffId = staff.id
            break
          }
        }
      }
    } else {
      // Vérifier que la coiffeuse sélectionnée n'a pas de conflit (anti double-réservation)
      const { data: conflicts } = await (supabase
        .from('rendez_vous') as any)
        .select('id')
        .eq('staff_id', assignedStaffId)
        .neq('statut', 'annule')
        .lt('date_heure_debut', endDateTime.toISOString())
        .gt('date_heure_fin', startDateTime.toISOString())

      if (conflicts && conflicts.length > 0) {
        return {
          success: false,
          message:
            'Ce créneau vient d’être réservé ou n’est plus disponible pour cette coiffeuse. Veuillez choisir un autre créneau.',
        }
      }
    }

    // 5. Insérer le rendez-vous avec le statut 'en_attente'
    const { data: newRdvData, error } = await (supabase
      .from('rendez_vous') as any)
      .insert({
        salon_id: cleanSalonId,
        service_id: cleanServiceId,
        staff_id: assignedStaffId,
        client_id: user.id,
        client_nom: formData.clientName || user.user_metadata?.full_name || 'Client',
        client_email: formData.clientEmail || user.email || '',
        client_telephone: formData.clientPhone || user.user_metadata?.telephone || null,
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
      return {
        success: false,
        message: `Erreur lors de la réservation : ${error.message}`,
      }
    }

    const newRdv = newRdvData as { id: string }

    revalidatePath('/dashboard')
    revalidatePath('/rendez-vous')
    revalidatePath('/reserver')
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
    revalidatePath('/rendez-vous')
    revalidatePath('/reserver')
    revalidatePath('/compte/mes-rendez-vous')
    return true
  } catch (err) {
    console.error('Error cancelling appointment:', err)
    return false
  }
}
