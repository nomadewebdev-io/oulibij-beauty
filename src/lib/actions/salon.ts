import { Salon } from '@/types'
import { siteConfig } from '@/config/site'

/**
 * Récupère les données du salon configuré (mode autonome sans Supabase)
 */
export async function getSalon(_salonId?: string): Promise<Salon | null> {
  return {
    id: siteConfig.id,
    nom: siteConfig.name,
    slug: siteConfig.slug,
    adresse: `${siteConfig.address}, ${siteConfig.district}, ${siteConfig.city}, ${siteConfig.country}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    logo_url: null,
    couleur_theme: siteConfig.theme.primary,
    horaires_ouverture: siteConfig.openingHours,
    created_at: '2026-09-14T00:00:00.000Z',
    updated_at: '2026-09-14T00:00:00.000Z',
  } as unknown as Salon
}
