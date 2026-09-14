import { getStaffMembers } from '@/lib/actions/staff'
import { TeamSection } from '@/components/home/TeamSection'
import { Badge } from '@/components/ui/Badge'
import { SALON_INFO } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Notre Équipe de Stylistes | ${SALON_INFO.name}`,
  description: `Rencontrez les coiffeurs, coloristes et experts en tresses de ${SALON_INFO.name}. Des professionnels passionnés à votre écoute.`,
}

export default async function EquipePage() {
  const staff = await getStaffMembers()

  return (
    <div className="pt-28 pb-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <Badge variant="gold" className="mb-4">
            Artistes & Passionnés
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Les Coiffeurs OULIBIJ
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Une équipe polyvalente maîtrisant la haute coiffure, les techniques de coloration de pointe et l'art du cheveu texturé.
          </p>
        </div>

        <TeamSection initialStaff={staff} />
      </div>
    </div>
  )
}
