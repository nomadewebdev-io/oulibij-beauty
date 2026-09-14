import { getCurrentUser } from '@/lib/actions/auth'
import { getUserAppointments } from '@/lib/actions/booking'
import { AppointmentsList } from '@/components/dashboard/AppointmentsList'
import { Calendar, User, Sparkles } from '@/components/ui/Icons'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SALON_INFO } from '@/lib/constants'

export const metadata = {
  title: `Mon Espace Client | ${SALON_INFO.name}`,
  description: `Consultez et gérez vos réservations au salon de coiffure ${SALON_INFO.name}.`,
}

export default async function DashboardPage() {
  const userSession = await getCurrentUser()

  if (!userSession?.user) {
    redirect('/login?redirect=/compte/mes-rendez-vous')
  }

  const appointments = await getUserAppointments()

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Profile Box */}
        <div className="bg-pink-50/60 border border-rose-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white font-black text-xl flex items-center justify-center shadow-md shadow-pink-500/20">
              {userSession.profile?.full_name ? userSession.profile.full_name[0].toUpperCase() : 'C'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-950">
                  {userSession.profile?.full_name || 'Cliente Privilège'}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  {userSession.profile?.role === 'admin' ? 'Admin' : userSession.profile?.role === 'staff' ? 'Équipe Staff' : 'Cliente Privilège'}
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                {userSession.user.email}
              </p>
            </div>
          </div>

          <Link
            href="/reserver"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all self-start md:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Nouveau rendez-vous</span>
          </Link>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight">
              Mes Rendez-vous
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Retrouvez l'historique et le suivi de vos séances chez {SALON_INFO.name}
            </p>
          </div>

          <AppointmentsList initialAppointments={appointments} />
        </div>
      </div>
    </div>
  )
}
