import React from 'react'
import { getRealisations } from '@/lib/actions/gallery'
import { RealisationsGallery } from '@/components/realisations/RealisationsGallery'
import { siteConfig } from '@/config/site'
import { Sparkles } from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Réalisations & Galerie Photos',
  description: `Découvrez les réalisations maquillage, tresses, poses lace, bouclages et teintures signées ${siteConfig.brandName} à ${siteConfig.district}, ${siteConfig.city}.`,
}

export default async function RealisationsPage() {
  const realisations = await getRealisations()

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Lookbook • {siteConfig.brandName}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f0e0c] tracking-tight font-serif italic">
            Galerie de Nos Réalisations
          </h1>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Inspirez-vous de nos mises en beauté du regard, poses lace, tresses et coiffures réalisées au salon à {siteConfig.district} ({siteConfig.address}).
          </p>
        </div>

        <RealisationsGallery realisations={realisations} />
      </div>
    </div>
  )
}
