import { createClient } from '@/lib/supabase/server'
import { Salon } from '@/types'
import { SALON_INFO } from '@/lib/constants'

export async function getSalon(salonId: string = SALON_INFO.id): Promise<Salon | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('salons')
      .select('*')
      .eq('id', salonId)
      .maybeSingle()

    if (error || !data) {
      // If table doesn't have this specific ID, try fetching first salon in table
      const { data: firstSalon } = await supabase
        .from('salons')
        .select('*')
        .limit(1)
        .maybeSingle()

      return firstSalon ? (firstSalon as unknown as Salon) : null
    }

    return data as unknown as Salon
  } catch (err) {
    console.error('Error fetching salon:', err)
    return null
  }
}
