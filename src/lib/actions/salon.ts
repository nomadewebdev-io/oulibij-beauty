import { Salon } from '@/types'
import { siteConfig } from '@/config/site'

export async function getSalon(_salonId?: string): Promise<Salon | null> {
  return {
    id: siteConfig.id,
    nom: siteConfig.brandName,
    slug: siteConfig.slug,
    description: siteConfig.description,
    adresse: siteConfig.address,
    ville: siteConfig.city,
    telephone: siteConfig.phone,
    email: siteConfig.email || null,
    logo_url: null,
    couleur_theme: siteConfig.theme.primary,
    horaires_ouverture: null,
    created_at: '2026-11-07T00:00:00.000Z',
    updated_at: '2026-11-07T00:00:00.000Z',
  } as unknown as Salon
}
