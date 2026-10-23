import { Staff } from '@/types'
import { DEFAULT_STAFF } from '@/lib/constants'

/**
 * Récupère les membres de l'équipe du salon (mode autonome sans Supabase)
 */
export async function getStaffMembers(_salonId?: string): Promise<Staff[]> {
  return DEFAULT_STAFF
}

/**
 * Récupère un membre du staff par son identifiant
 */
export async function getStaffById(id: string): Promise<Staff | null> {
  const staff = DEFAULT_STAFF.find((s) => s.id === id)
  return staff || null
}
