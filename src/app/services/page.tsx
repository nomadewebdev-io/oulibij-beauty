import { getServices } from '@/lib/actions/services'
import { ServicesSection } from '@/components/home/ServicesSection'
import { Badge } from '@/components/ui/Badge'
import { SALON_INFO } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Prestations & Tarifs | ${SALON_INFO.name}`,
  description: `Découvrez la carte complète des soins et tarifs du salon ${SALON_INFO.name} : coupes, tresses, balayages, lissages et soins profonds.`,
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="pt-28 pb-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <Badge variant="gold" className="mb-4">
            Carte Complète
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Nos Prestations & Tarifs
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Tous nos tarifs incluent le diagnostic personnalisé, le shampoing traitant et les conseils d'entretien sur-mesure.
          </p>
        </div>

        <ServicesSection initialServices={services} showAllLink={false} />
      </div>
    </div>
  )
}
