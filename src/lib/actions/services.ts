import { Service, ServiceWithCategory } from '@/types'
import { DEFAULT_SERVICES, SALON_INFO } from '@/lib/constants'

/**
 * Récupère les prestations actives du salon (mode autonome sans Supabase)
 */
export async function getServices(_salonId: string = SALON_INFO.id): Promise<Service[]> {
  return DEFAULT_SERVICES
}

/**
 * Récupère les prestations regroupées par catégorie
 */
export async function getServicesGroupedByCategory(_salonId: string = SALON_INFO.id): Promise<ServiceWithCategory[]> {
  const services = DEFAULT_SERVICES
  const map = new Map<string, Service[]>()

  for (const service of services) {
    const cat = service.categorie?.trim() || 'Autres prestations'
    if (!map.has(cat)) {
      map.set(cat, [])
    }
    map.get(cat)!.push(service)
  }

  const result: ServiceWithCategory[] = []
  for (const [category, items] of map.entries()) {
    result.push({
      category,
      services: items,
    })
  }

  return result
}

/**
 * Récupère un service par son identifiant
 */
export async function getServiceById(id: string): Promise<Service | null> {
  const service = DEFAULT_SERVICES.find((s) => s.id === id)
  return service || null
}
