import React from 'react'
import type { Metadata } from 'next'
import { getServices, getServicesGroupedByCategory } from '@/lib/actions/services'
import { PrestationsList } from '@/components/prestations/PrestationsList'
import { siteConfig } from '@/config/site'
import { Sparkles } from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

const baseUrl = siteConfig.seo.siteUrl.replace(/\/$/, '')

export const metadata: Metadata = {
  title: 'Prestations Maquillage & Coiffure',
  description: `Carte des prestations ${siteConfig.brandName} à ${siteConfig.district}, ${siteConfig.city} : maquillage (cérémonie, simple, contouring) et coiffure féminine (tissage, tresse, bouclage, pose lace, Stream Pod, teinture, soins).`,
  alternates: {
    canonical: `${baseUrl}/prestations`,
  },
}

export default async function PrestationsPage() {
  const [groupedServices, allServices] = await Promise.all([
    getServicesGroupedByCategory(),
    getServices(),
  ])

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Carte Officielle • {siteConfig.brandName}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f0e0c] tracking-tight font-serif italic">
            Maquillage &amp; Coiffure
          </h1>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            {siteConfig.tagline}. Découvrez nos prestations salon réalisées tous les jours de 9h à 21h à {siteConfig.fullAddress}.
          </p>
        </div>

        <PrestationsList
          initialGroupedServices={groupedServices}
          allServices={allServices}
        />
      </div>
    </div>
  )
}
