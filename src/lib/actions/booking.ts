'use server'

import { BookingFormData, RendezVous } from '@/types'
import { revalidatePath } from 'next/cache'

export interface BookingResult {
  success: boolean
  message: string
  appointmentId?: string
}

export interface TimeSlotAvailability {
  time: string
  available: boolean
  assignedStaffId?: string
}

/**
 * Créneaux disponibles (Mode autonome sans Supabase)
 * Le code complet Postgres est archivé dans @/lib/supabase-archive/booking-actions.ts
 */
export async function getAvailableTimeSlotsAction(_params: {
  salonId?: string
  serviceId: string
  staffId?: string
  date: string
}): Promise<TimeSlotAvailability[]> {
  const standardSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '13:00', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ]

  return standardSlots.map((time) => ({
    time,
    available: true,
  }))
}

export async function createAppointmentAction(_formData: BookingFormData): Promise<BookingResult> {
  return {
    success: true,
    message: 'Votre demande a bien été préparée. Veuillez confirmer sur WhatsApp.',
  }
}

export async function getUserAppointments(_limit?: number): Promise<RendezVous[]> {
  return []
}

export async function cancelAppointmentAction(_appointmentId: string): Promise<boolean> {
  revalidatePath('/compte/mes-rendez-vous')
  return true
}
