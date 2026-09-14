import { createClient } from '@/lib/supabase/server'
import { Service, ServiceWithCategory } from '@/types'
import { SALON_INFO } from '@/lib/constants'

export async function getServices(salonId: string = SALON_INFO.id): Promise<Service[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('salon_id', salonId)
      .eq('is_active', true)
      .order('categorie', { ascending: true })
      .order('prix', { ascending: true })

    if (error) {
      console.warn('Supabase fetch notice for services:', error.message)
      return []
    }

    return (data || []) as Service[]
  } catch (err) {
    console.error('Error fetching services:', err)
    return []
  }
}

export async function getServicesGroupedByCategory(salonId: string = SALON_INFO.id): Promise<ServiceWithCategory[]> {
  const services = await getServices(salonId)
  if (!services || services.length === 0) {
    return []
  }

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

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error || !data) {
      return null
    }
    return data as Service
  } catch (err) {
    console.error('Error fetching service:', err)
    return null
  }
}
