import { Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

export type Salon = Tables<'salons'>
export type Profile = Tables<'profiles'>
export type Service = Tables<'services'>
export type Staff = Tables<'staff'>
export type Disponibilite = Tables<'disponibilites'>
export type RendezVous = Tables<'rendez_vous'>
export type Realisation = Tables<'realisations'>

export type AppointmentStatus = 'en_attente' | 'confirme' | 'annule' | 'termine'
export type UserRole = 'client' | 'staff' | 'admin'

export interface TimeSlot {
  time: string // format "09:00"
  available: boolean
}

export interface BookingFormData {
  salonId: string
  serviceId: string
  staffId?: string
  date: string
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  notes?: string
}

export interface SalonOpeningHours {
  [day: string]: {
    ouvert: boolean
    debut: string | null
    fin: string | null
  }
}

export interface ServiceWithCategory {
  category: string
  services: Service[]
}

export interface AppointmentWithDetails extends RendezVous {
  service?: Service | null
  staff?: Staff | null
  client?: Profile | null
}
