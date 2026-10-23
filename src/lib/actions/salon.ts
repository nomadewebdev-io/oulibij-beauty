import { Salon } from '@/types'
import { SALON_INFO } from '@/lib/constants'

/**
 * Récupère les données du salon Oulibij Beauty (mode autonome sans Supabase)
 */
export async function getSalon(_salonId?: string): Promise<Salon | null> {
  return {
    id: SALON_INFO.id,
    nom: SALON_INFO.name,
    slug: 'oulibij-beauty',
    adresse: `${SALON_INFO.address}, ${SALON_INFO.city}, ${SALON_INFO.country}`,
    telephone: SALON_INFO.phone,
    email: SALON_INFO.email,
    logo_url: null,
    couleur_theme: '#ec4899',
    created_at: '2026-09-14T00:00:00.000Z',
    updated_at: '2026-09-14T00:00:00.000Z',
  } as unknown as Salon
}
