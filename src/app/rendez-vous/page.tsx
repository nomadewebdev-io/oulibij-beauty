import { getServices } from '@/lib/actions/services'
import { getStaffMembers } from '@/lib/actions/staff'
import { BookingWizard } from '@/components/booking/BookingWizard'
import { Badge } from '@/components/ui/Badge'
import { SALON_INFO } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Réservation en Ligne | ${SALON_INFO.name}`,
  description: `Prenez rendez-vous en ligne en quelques clics chez ${SALON_INFO.name}. Choisissez votre coiffeur, votre date et votre horaire.`,
}

interface RendezVousPageProps {
  searchParams: Promise<{ service?: string; staff?: string }>
}

export default async function RendezVousPage({ searchParams }: RendezVousPageProps) {
  const params = await searchParams
  const [services, staff] = await Promise.all([
    getServices(),
    getStaffMembers(),
  ])

  return (
    <div className="pt-28 pb-20 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="gold" className="mb-3">
            Réservation 24/7
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Planifiez Votre Visite
          </h1>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Sélectionnez votre prestation et votre créneau idéal. Confirmation immédiate.
          </p>
        </div>

        <BookingWizard
          initialServices={services}
          initialStaff={staff}
          preselectedServiceId={params?.service}
          preselectedStaffId={params?.staff}
        />
      </div>
    </div>
  )
}
