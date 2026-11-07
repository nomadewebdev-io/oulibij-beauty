import { siteConfig } from '@/config/site'
import { formatCurrency } from '@/lib/utils'

export type ProductCategory = 'Cosmétiques' | 'Parfums' | 'Accessoires'

export type BoutiqueFilterCategory = 'Tous' | ProductCategory

export const BOUTIQUE_CATEGORIES: readonly BoutiqueFilterCategory[] = [
  'Tous',
  'Cosmétiques',
  'Parfums',
  'Accessoires',
] as const

export interface Product {
  id: string
  name: string
  category: ProductCategory
  image: string
  price?: number
  available: boolean
}

/**
 * Catalogue officiel de la Boutique OuliBij Beauté.
 * Laisser vide tant que les références réelles du salon ne sont pas renseignées.
 */
export const products: Product[] = []

/**
 * Génère le lien WhatsApp de commande prérempli avec le nom du produit
 */
export function getWhatsAppProductOrderUrl(productName: string, price?: number): string {
  const hasValidPrice = typeof price === 'number' && price > 0
  const message = hasValidPrice
    ? `Bonjour ${siteConfig.brandName}, je souhaite commander le produit « ${productName} » (${formatCurrency(price)}) vu dans votre Boutique.`
    : `Bonjour ${siteConfig.brandName}, je souhaite commander le produit « ${productName} » vu dans votre Boutique et connaître son tarif.`

  return `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`
}

/**
 * Génère le lien WhatsApp d'information générale sur la Boutique
 */
export function getWhatsAppBoutiqueInquiryUrl(category?: ProductCategory): string {
  const message = category
    ? `Bonjour ${siteConfig.brandName}, je souhaite découvrir vos articles disponibles en rayon ${category} à ${siteConfig.district}.`
    : `Bonjour ${siteConfig.brandName}, je souhaite découvrir votre sélection Boutique (cosmétiques, parfums et accessoires) disponible au salon à ${siteConfig.district}.`

  return `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`
}
