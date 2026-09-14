import { createClient } from '@/lib/supabase/server'
import { Staff } from '@/types'
import { SALON_INFO } from '@/lib/constants'

export async function getStaffMembers(salonId: string = SALON_INFO.id): Promise<Staff[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('salon_id', salonId)
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (error) {
      console.warn('Supabase fetch notice for staff:', error.message)
      return []
    }

    return (data || []) as Staff[]
  } catch (err) {
    console.error('Error fetching staff:', err)
    return []
  }
}
