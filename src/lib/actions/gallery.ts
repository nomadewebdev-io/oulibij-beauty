import { createClient } from '@/lib/supabase/server'
import { Realisation } from '@/types'
import { SALON_INFO } from '@/lib/constants'

export async function getRealisations(salonId: string = SALON_INFO.id, limit: number = 60): Promise<Realisation[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('realisations')
      .select('*')
      .eq('salon_id', salonId)
      .order('date_realisation', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.warn('Supabase fetch notice for realisations:', error.message)
      return []
    }

    return (data || []) as Realisation[]
  } catch (err) {
    console.error('Error fetching realisations:', err)
    return []
  }
}
