import React from 'react'
import { getCurrentUser } from '@/lib/actions/auth'
import { getUserAppointments } from '@/lib/actions/booking'
import { AppointmentsList } from '@/components/dashboard/AppointmentsList'
import { Calendar } from '@/components/ui/Icons'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Mes Rendez-Vous',
  description: `Consultez et gérez vos réservations chez ${siteConfig.brandName}.`,
}

export default async function MesRendezVousPage() {
  const userSession = await getCurrentUser()

  if (!userSession?.user) {
    redirect('/login?redirect=/compte/mes-rendez-vous')
  }

  const appointments = await getUserAppointments()

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0f0e0c] border border-amber-500/40 text-amber-300 font-black text-2xl flex items-center justify-center shadow-xs">
              {userSession.profile?.full_name ? userSession.profile.full_name[0].toUpperCase() : 'C'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f0e0c] font-serif italic">
                  {userSession.profile?.full_name || 'Espace Client'}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#0f0e0c] text-amber-300 border border-amber-500/40">
                  {userSession.profile?.role === 'admin'
                    ? 'Administrateur'
                    : userSession.profile?.role === 'staff'
                      ? 'Équipe'
                      : 'Cliente Privilège'}
                </span>
              </div>
              <p className="text-xs text-stone-500">{userSession.user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {userSession.profile?.role === 'admin' && (
              <Link
                href="/admin"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#0f0e0c] bg-white border border-amber-900/15 hover:bg-amber-50 transition-all min-h-[44px]"
              >
                <span>Accéder à l&apos;Admin</span>
              </Link>
            )}
            <Link
              href="/reserver"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 shadow-sm active:scale-95 transition-all min-h-[44px]"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Nouveau rendez-vous</span>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f0e0c] tracking-tight font-serif italic">
              Mes Réservations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Suivez le statut de vos séances chez {siteConfig.brandName}.
            </p>
          </div>

          <AppointmentsList initialAppointments={appointments} />
        </div>
      </div>
    </div>
  )
}
