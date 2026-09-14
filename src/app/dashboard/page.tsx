import { getCurrentUser } from '@/lib/actions/auth'
import { getUserAppointments } from '@/lib/actions/booking'
import { AppointmentsList } from '@/components/dashboard/AppointmentsList'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Calendar, User, ShieldCheck } from '@/components/ui/Icons'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SALON_INFO } from '@/lib/constants'

export const metadata = {
  title: `Mon Espace Client | ${SALON_INFO.name}`,
  description: `Consultez et gérez vos rendez-vous au salon de coiffure ${SALON_INFO.name}.`,
}

export default async function DashboardPage() {
  const userSession = await getCurrentUser()

  if (!userSession?.user) {
    redirect('/login?redirect=/dashboard')
  }

  const appointments = await getUserAppointments()

  return (
    <div className="pt-28 pb-20 bg-zinc-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Profile Bar */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-zinc-950 font-black text-xl flex items-center justify-center">
              {userSession.profile?.full_name ? userSession.profile.full_name[0].toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-zinc-100">
                  {userSession.profile?.full_name || 'Client Privilège'}
                </h1>
                <Badge variant="gold">
                  {userSession.profile?.role === 'admin' ? 'Administrateur' : userSession.profile?.role === 'staff' ? 'Équipe Staff' : 'Client Privilège'}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                {userSession.user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/rendez-vous">
              <Button variant="gold" size="md" className="gap-2">
                <Calendar className="w-4 h-4" />
                <span>Nouveau Rendez-vous</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-100">Historique des Rendez-vous</h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Vos séances passées et à venir chez {SALON_INFO.name}
              </p>
            </div>
          </div>

          <AppointmentsList initialAppointments={appointments} />
        </div>
      </div>
    </div>
  )
}
