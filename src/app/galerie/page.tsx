import { getRealisations } from '@/lib/actions/gallery'
import { GallerySection } from '@/components/home/GallerySection'
import { Badge } from '@/components/ui/Badge'
import { SALON_INFO } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Galerie & Créations | ${SALON_INFO.name}`,
  description: `Découvrez les créations artistiques, tresses, colorations et coupes réalisées par l'équipe ${SALON_INFO.name}.`,
}

export default async function GaleriePage() {
  const realisations = await getRealisations()

  return (
    <div className="pt-28 pb-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <Badge variant="gold" className="mb-4">
            Lookbook & Inspirations
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Galerie de Nos Réalisations
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Parcourez notre galerie photo pour trouver l'inspiration de votre future coiffure.
          </p>
        </div>

        <GallerySection initialRealisations={realisations} />
      </div>
    </div>
  )
}
