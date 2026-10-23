'use server'

import { Profile, RendezVous, Service, Staff, Disponibilite } from '@/types'
import { DEFAULT_SERVICES, DEFAULT_STAFF } from '@/lib/constants'
import { redirect } from 'next/navigation'

export interface AdminActionResult {
  success: boolean
  message: string
}

export async function verifyAdminUser(): Promise<{ user: { id: string; email?: string }; profile: Profile }> {
  redirect('/login?redirect=/admin')
}

export async function getAdminStats() {
  return {
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    totalServices: DEFAULT_SERVICES.length,
    totalStaff: DEFAULT_STAFF.length,
  }
}

export async function getAllAdminAppointments(): Promise<RendezVous[]> {
  return []
}

export async function getAllAdminServices(): Promise<Service[]> {
  return DEFAULT_SERVICES
}

export async function getAllAdminStaff(): Promise<Staff[]> {
  return DEFAULT_STAFF
}

export async function getAllAdminDisponibilites(): Promise<Disponibilite[]> {
  return []
}

export async function updateAppointmentStatusAction(_appointmentId: string, _statut: string): Promise<AdminActionResult> {
  return { success: true, message: 'Statut mis à jour.' }
}

export async function deleteAppointmentAction(_appointmentId: string): Promise<AdminActionResult> {
  return { success: true, message: 'Rendez-vous supprimé.' }
}

export async function saveServiceAction(_formData: FormData | Record<string, unknown>): Promise<AdminActionResult> {
  return { success: true, message: 'Prestation enregistrée.' }
}

export async function toggleServiceStatusAction(_serviceId: string, _currentStatus: boolean): Promise<AdminActionResult> {
  return { success: true, message: 'Statut de la prestation modifié.' }
}

export async function deleteServiceAction(_serviceId: string): Promise<AdminActionResult> {
  return { success: true, message: 'Prestation supprimée.' }
}

export async function saveStaffAction(_formData: FormData | Record<string, unknown>): Promise<AdminActionResult> {
  return { success: true, message: 'Membre de l’équipe enregistré.' }
}

export async function toggleStaffStatusAction(_staffId: string, _currentStatus: boolean): Promise<AdminActionResult> {
  return { success: true, message: 'Statut du membre modifié.' }
}

export async function deleteStaffAction(_staffId: string): Promise<AdminActionResult> {
  return { success: true, message: 'Membre supprimé.' }
}

export async function saveDisponibiliteAction(_data: Record<string, unknown>): Promise<AdminActionResult> {
  return { success: true, message: 'Disponibilité enregistrée.' }
}

export async function deleteDisponibiliteAction(_disponibiliteId: string): Promise<AdminActionResult> {
  return { success: true, message: 'Disponibilité supprimée.' }
}
