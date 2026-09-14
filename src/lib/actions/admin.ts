'use server'

import { createClient } from '@/lib/supabase/server'
import { AppointmentStatus, Profile, RendezVous, Service, Staff, Disponibilite, AppointmentWithDetails } from '@/types'
import { SALON_INFO } from '@/lib/constants'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * Contrôle serveur d'accès : vérifie que l'utilisateur courant est authentifié et possède le rôle admin.
 */
export async function verifyAdminUser(): Promise<{ user: any; profile: Profile }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/admin')
  }

  const { data: profile } = await (supabase
    .from('profiles') as any)
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || profile.role !== 'admin') {
    redirect('/?error=unauthorized')
  }

  return { user, profile: profile as Profile }
}

/**
 * Statistiques clés pour le tableau de bord admin
 */
export async function getAdminStats() {
  await verifyAdminUser()
  const supabase = await createClient()

  const [
    { count: totalAppointments },
    { count: pendingAppointments },
    { count: confirmedAppointments },
    { count: totalServices },
    { count: totalStaff },
  ] = await Promise.all([
    (supabase.from('rendez_vous') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('rendez_vous') as any).select('*', { count: 'exact', head: true }).eq('statut', 'en_attente'),
    (supabase.from('rendez_vous') as any).select('*', { count: 'exact', head: true }).eq('statut', 'confirme'),
    (supabase.from('services') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('staff') as any).select('*', { count: 'exact', head: true }),
  ])

  return {
    totalAppointments: totalAppointments || 0,
    pendingAppointments: pendingAppointments || 0,
    confirmedAppointments: confirmedAppointments || 0,
    totalServices: totalServices || 0,
    totalStaff: totalStaff || 0,
  }
}

/**
 * Récupère tous les rendez-vous reçus avec les détails du service et de la coiffeuse
 */
export async function getAllAdminAppointments(): Promise<AppointmentWithDetails[]> {
  await verifyAdminUser()
  const supabase = await createClient()

  const { data, error } = await (supabase
    .from('rendez_vous') as any)
    .select(`
      *,
      service:services(*),
      staff:staff(*)
    `)
    .order('date_heure_debut', { ascending: false })

  if (error) {
    console.error('Error fetching admin appointments:', error.message)
    return []
  }

  return (data as unknown as AppointmentWithDetails[]) || []
}

/**
 * Modification de statut d'un rendez-vous (en_attente → confirme → termine ou annule)
 */
export async function updateAppointmentStatusAction(
  appointmentId: string,
  newStatus: AppointmentStatus
): Promise<{ success: boolean; message: string }> {
  try {
    await verifyAdminUser()
    const supabase = await createClient()

    const { error } = await (supabase
      .from('rendez_vous') as any)
      .update({ statut: newStatus })
      .eq('id', appointmentId)

    if (error) {
      return { success: false, message: `Erreur : ${error.message}` }
    }

    revalidatePath('/admin')
    revalidatePath('/compte/mes-rendez-vous')
    revalidatePath('/dashboard')

    return { success: true, message: `Statut mis à jour (${newStatus}).` }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inattendue'
    return { success: false, message: msg }
  }
}

/**
 * GESTION DES SERVICES (CRUD & Activation/Désactivation)
 */
export async function getAllAdminServices(): Promise<Service[]> {
  await verifyAdminUser()
  const supabase = await createClient()

  const { data, error } = await (supabase
    .from('services') as any)
    .select('*')
    .order('categorie', { ascending: true })
    .order('prix', { ascending: true })

  if (error) {
    console.error('Error fetching admin services:', error.message)
    return []
  }

  return (data as Service[]) || []
}

export async function saveServiceAction(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    await verifyAdminUser()
    const supabase = await createClient()

    const id = (formData.get('id') as string)?.trim()
    const nom = (formData.get('nom') as string)?.trim()
    const description = (formData.get('description') as string)?.trim() || null
    const categorie = (formData.get('categorie') as string)?.trim() || 'Général'
    const duree_minutes = Number(formData.get('duree_minutes')) || 45
    const prix = Number(formData.get('prix')) || 0
    const is_active = formData.get('is_active') === 'true' || formData.get('is_active') === 'on'

    if (!nom) {
      return { success: false, message: 'Le nom du service est obligatoire.' }
    }

    if (id) {
      // Modification
      const { error } = await (supabase
        .from('services') as any)
        .update({
          nom,
          description,
          categorie,
          duree_minutes,
          prix,
          is_active,
        })
        .eq('id', id)

      if (error) return { success: false, message: error.message }
    } else {
      // Création
      const { error } = await (supabase
        .from('services') as any)
        .insert({
          salon_id: SALON_INFO.id,
          nom,
          description,
          categorie,
          duree_minutes,
          prix,
          is_active: true,
        })

      if (error) return { success: false, message: error.message }
    }

    revalidatePath('/admin')
    revalidatePath('/prestations')
    revalidatePath('/reserver')

    return { success: true, message: 'Service enregistré avec succès.' }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inattendue'
    return { success: false, message: msg }
  }
}

export async function toggleServiceStatusAction(
  serviceId: string,
  isActive: boolean
): Promise<{ success: boolean; message: string }> {
  try {
    await verifyAdminUser()
    const supabase = await createClient()

    const { error } = await (supabase
      .from('services') as any)
      .update({ is_active: isActive })
      .eq('id', serviceId)

    if (error) return { success: false, message: error.message }

    revalidatePath('/admin')
    revalidatePath('/prestations')
    revalidatePath('/reserver')

    return { success: true, message: `Service ${isActive ? 'activé' : 'désactivé'}.` }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inattendue'
    return { success: false, message: msg }
  }
}

export async function deleteServiceAction(serviceId: string): Promise<{ success: boolean; message: string }> {
  try {
    await verifyAdminUser()
    const supabase = await createClient()

    const { error } = await (supabase
      .from('services') as any)
      .delete()
      .eq('id', serviceId)

    if (error) return { success: false, message: error.message }

    revalidatePath('/admin')
    revalidatePath('/prestations')
    revalidatePath('/reserver')

    return { success: true, message: 'Service supprimé.' }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inattendue'
    return { success: false, message: msg }
  }
}

/**
 * GESTION DE L'ÉQUIPE (STAFF)
 */
export async function getAllAdminStaff(): Promise<Staff[]> {
  await verifyAdminUser()
  const supabase = await createClient()

  const { data, error } = await (supabase
    .from('staff') as any)
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching admin staff:', error.message)
    return []
  }

  return (data as Staff[]) || []
}

export async function saveStaffAction(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    await verifyAdminUser()
    const supabase = await createClient()

    const id = (formData.get('id') as string)?.trim()
    const nom = (formData.get('nom') as string)?.trim()
    const prenom = (formData.get('prenom') as string)?.trim()
    const specialite = (formData.get('specialite') as string)?.trim() || null
    const bio = (formData.get('bio') as string)?.trim() || null
    const email = (formData.get('email') as string)?.trim() || null
    const telephone = (formData.get('telephone') as string)?.trim() || null
    const avatar_url = (formData.get('avatar_url') as string)?.trim() || null
    const is_active = formData.get('is_active') === 'true' || formData.get('is_active') === 'on'

    if (!nom || !prenom) {
      return { success: false, message: 'Le nom et le prénom sont obligatoires.' }
    }

    if (id) {
      const { error } = await (supabase
        .from('staff') as any)
        .update({
          nom,
          prenom,
          specialite,
          bio,
          email,
          telephone,
          avatar_url,
          is_active,
        })
        .eq('id', id)

      if (error) return { success: false, message: error.message }
    } else {
      const { error } = await (supabase
        .from('staff') as any)
        .insert({
          salon_id: SALON_INFO.id,
          nom,
          prenom,
          specialite,
          bio,
          email,
          telephone,
          avatar_url,
          is_active: true,
        })

      if (error) return { success: false, message: error.message }
    }

    revalidatePath('/admin')
    revalidatePath('/a-propos')
    revalidatePath('/reserver')

    return { success: true, message: 'Membre de l’équipe enregistré avec succès.' }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inattendue'
    return { success: false, message: msg }
  }
}

export async function toggleStaffStatusAction(
  staffId: string,
  isActive: boolean
): Promise<{ success: boolean; message: string }> {
  try {
    await verifyAdminUser()
    const supabase = await createClient()

    const { error } = await (supabase
      .from('staff') as any)
      .update({ is_active: isActive })
      .eq('id', staffId)

    if (error) return { success: false, message: error.message }

    revalidatePath('/admin')
    revalidatePath('/a-propos')
    revalidatePath('/reserver')

    return { success: true, message: `Coiffeuse ${isActive ? 'activée' : 'désactivée'}.` }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inattendue'
    return { success: false, message: msg }
  }
}

export async function deleteStaffAction(staffId: string): Promise<{ success: boolean; message: string }> {
  try {
    await verifyAdminUser()
    const supabase = await createClient()

    const { error } = await (supabase
      .from('staff') as any)
      .delete()
      .eq('id', staffId)

    if (error) return { success: false, message: error.message }

    revalidatePath('/admin')
    revalidatePath('/a-propos')
    revalidatePath('/reserver')

    return { success: true, message: 'Membre de l’équipe supprimé.' }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inattendue'
    return { success: false, message: msg }
  }
}

/**
 * GESTION DES DISPONIBILITÉS
 */
export async function getAllAdminDisponibilites(): Promise<Disponibilite[]> {
  await verifyAdminUser()
  const supabase = await createClient()

  const { data, error } = await (supabase
    .from('disponibilites') as any)
    .select('*')
    .order('staff_id')
    .order('jour_semaine')

  if (error) {
    console.error('Error fetching admin disponibilites:', error.message)
    return []
  }

  return (data as Disponibilite[]) || []
}

export async function saveDisponibiliteAction(params: {
  staffId: string
  jourSemaine: number
  heureDebut: string
  heureFin: string
  isActive: boolean
}): Promise<{ success: boolean; message: string }> {
  try {
    await verifyAdminUser()
    const supabase = await createClient()

    const { data: existing } = await (supabase
      .from('disponibilites') as any)
      .select('id')
      .eq('staff_id', params.staffId)
      .eq('jour_semaine', params.jourSemaine)
      .maybeSingle()

    if (existing) {
      const { error } = await (supabase
        .from('disponibilites') as any)
        .update({
          heure_debut: params.heureDebut,
          heure_fin: params.heureFin,
          is_active: params.isActive,
        })
        .eq('id', existing.id)

      if (error) return { success: false, message: error.message }
    } else {
      const { error } = await (supabase
        .from('disponibilites') as any)
        .insert({
          salon_id: SALON_INFO.id,
          staff_id: params.staffId,
          jour_semaine: params.jourSemaine,
          heure_debut: params.heureDebut,
          heure_fin: params.heureFin,
          is_active: params.isActive,
        })

      if (error) return { success: false, message: error.message }
    }

    revalidatePath('/admin')
    revalidatePath('/reserver')

    return { success: true, message: 'Disponibilité enregistrée avec succès.' }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inattendue'
    return { success: false, message: msg }
  }
}
