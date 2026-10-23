import {
  siteConfig,
  getWhatsAppBookingUrl as getWhatsAppBookingUrlConfig,
  type SalonOpeningHour,
  type SalonServiceItem,
  type SalonStaffMember,
  type SalonRealisation,
  type SalonReview,
  type HeroHighlight,
} from '@/config/site'
import { Service, Staff, Realisation } from '@/types'

export { siteConfig }
export type { SalonOpeningHour, SalonServiceItem, SalonStaffMember, SalonRealisation, SalonReview, HeroHighlight }

/**
 * Numéros WhatsApp centralisés
 */
export const WHATSAPP_PHONE = siteConfig.whatsappRaw
export const WHATSAPP_DISPLAY = siteConfig.whatsappDisplay

/**
 * Génère le lien wa.me officiel avec message pré-rempli
 */
export function getWhatsAppBookingUrl(serviceName?: string): string {
  return getWhatsAppBookingUrlConfig(serviceName)
}

/**
 * Informations du salon centralisées
 */
export const SALON_INFO = {
  id: siteConfig.id,
  name: siteConfig.name,
  brandName: siteConfig.brandName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  shortDescription: siteConfig.shortDescription,
  address: siteConfig.address,
  district: siteConfig.district,
  postalCode: '',
  city: siteConfig.city,
  country: siteConfig.country,
  landmarks: siteConfig.landmarks,
  phone: siteConfig.phone,
  whatsapp: siteConfig.whatsappDisplay,
  whatsappRaw: siteConfig.whatsappRaw,
  email: siteConfig.email,
  payments: siteConfig.payments,
  openingHours: siteConfig.openingHours,
  socials: siteConfig.socials,
}

export const NAV_LINKS = siteConfig.navLinks

export const HERO_HIGHLIGHTS = siteConfig.hero.highlights

export const SERVICE_CATEGORIES = siteConfig.categories

export const DEFAULT_SERVICES: Service[] = siteConfig.services as unknown as Service[]

export const DEFAULT_STAFF: Staff[] = siteConfig.staff as unknown as Staff[]

export const DEFAULT_REALISATIONS: Realisation[] = siteConfig.realisations as unknown as Realisation[]

export const CLIENT_REVIEWS = siteConfig.reviews
