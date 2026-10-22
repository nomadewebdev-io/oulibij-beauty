import { Realisation } from '@/types'
import { DEFAULT_REALISATIONS, SALON_INFO } from '@/lib/constants'

/**
 * Récupère les réalisations du salon (mode autonome sans Supabase)
 */
export async function getRealisations(_salonId: string = SALON_INFO.id, limit: number = 60): Promise<Realisation[]> {
  return DEFAULT_REALISATIONS.slice(0, limit)
}
