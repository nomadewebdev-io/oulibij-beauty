import React from 'react'
import { getRealisations } from '@/lib/actions/gallery'
import { RealisationsGallery } from '@/components/realisations/RealisationsGallery'
import { SALON_INFO } from '@/lib/constants'
import { Sparkles } from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Réalisations & Galerie Photos | ${SALON_INFO.name}`,
  description: `Découvrez la galerie des réalisations, tresses artistiques, balayages et soins capillaires réalisés par ${SALON_INFO.name}.`,
}

export default async function RealisationsPage() {
  const realisations = await getRealisations()

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Lookbook & Inspirations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight font-serif italic">
            Galerie de Nos Réalisations
          </h1>
          <p className="mt-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
            Parcourez notre galerie photo pour découvrir le savoir-faire de nos expertes et trouver l&apos;inspiration parfaite pour votre future coupe, coloration ou tressage.
          </p>
        </div>

        {/* Gallery with category filter */}
        <RealisationsGallery realisations={realisations} />
      </div>
    </div>
  )
}
