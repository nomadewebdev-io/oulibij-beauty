import { createClient } from '@/lib/supabase/server'
import { Service } from '@/types'
import { SALON_INFO } from '@/lib/constants'

export async function getServices(salonId: string = SALON_INFO.id): Promise<Service[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('salon_id', salonId)
      .eq('is_active', true)
      .order('prix', { ascending: true })

    if (error) {
      console.warn('Supabase fetch error or table empty, returning default services:', error.message)
      return []
    }

    return (data as Service[]) || []
  } catch (err) {
    console.error('Error fetching services:', err)
    return []
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data as Service
  } catch (err) {
    console.error('Error fetching service:', err)
    return null
  }
}
