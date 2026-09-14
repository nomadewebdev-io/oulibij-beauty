import React from 'react'
import {
  verifyAdminUser,
  getAdminStats,
  getAllAdminAppointments,
  getAllAdminServices,
  getAllAdminStaff,
  getAllAdminDisponibilites,
} from '@/lib/actions/admin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { SALON_INFO } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Administration & Gestion | ${SALON_INFO.name}`,
  description: `Espace d'administration sécurisé du salon ${SALON_INFO.name}. Gestion des rendez-vous, services, coiffeuses et disponibilités.`,
}

export default async function AdminPage() {
  const { user, profile } = await verifyAdminUser()

  const [stats, appointments, services, staff, disponibilites] = await Promise.all([
    getAdminStats(),
    getAllAdminAppointments(),
    getAllAdminServices(),
    getAllAdminStaff(),
    getAllAdminDisponibilites(),
  ])

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto">
        <AdminDashboard
          stats={stats}
          initialAppointments={appointments}
          initialServices={services}
          initialStaff={staff}
          initialDisponibilites={disponibilites}
          adminUser={{
            email: user.email,
            full_name: profile.full_name,
          }}
        />
      </div>
    </div>
  )
}
