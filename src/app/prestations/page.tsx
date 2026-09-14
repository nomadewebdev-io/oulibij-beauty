import React from 'react'
import { getServices, getServicesGroupedByCategory } from '@/lib/actions/services'
import { PrestationsList } from '@/components/prestations/PrestationsList'
import { SALON_INFO } from '@/lib/constants'
import { Sparkles } from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Prestations & Tarifs | ${SALON_INFO.name}`,
  description: `Découvrez la carte complète des soins et tarifs du salon ${SALON_INFO.name} : coupes, tresses, balayages, lissages et soins profonds.`,
}

export default async function PrestationsPage() {
  const [groupedServices, allServices] = await Promise.all([
    getServicesGroupedByCategory(),
    getServices(),
  ])

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Menu & Tarifs Officiels</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight font-serif italic">
            Nos Prestations & Soins
          </h1>
          <p className="mt-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
            Chaque prestation comprend un diagnostic capillaire personnalisé, un shampoing massant relaxant et des conseils experts pour sublimer votre chevelure.
          </p>
        </div>

        {/* Dynamic Services grouped by Category */}
        <PrestationsList
          initialGroupedServices={groupedServices}
          allServices={allServices}
        />
      </div>
    </div>
  )
}
