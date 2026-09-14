import React from 'react'
import { Realisation } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Sparkles, ArrowRight } from '@/components/ui/Icons'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const DEFAULT_REALISATIONS: Realisation[] = [
  {
    id: 'r1',
    salon_id: '00000000-0000-0000-0000-000000000001',
    staff_id: null,
    titre: 'Balayage Miel & Ondulations Hollywood',
    description: 'Éclaircissement fondu sur base brune avec brushing wavy souple.',
    image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    categorie: 'Coloration',
    date_realisation: '2026-09-01',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'r2',
    salon_id: '00000000-0000-0000-0000-000000000001',
    staff_id: null,
    titre: 'Box Braids Knotless Haute Précision',
    description: 'Tresses légères et impeccables avec séparation nette et finition soyeuse.',
    image_url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
    categorie: 'Tresses',
    date_realisation: '2026-09-05',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'r3',
    salon_id: '00000000-0000-0000-0000-000000000001',
    staff_id: null,
    titre: 'Dégradé Américain & Sculpting Barbe',
    description: 'Tracé ultra net au rasoir traditionnel et soin hydratant barbe.',
    image_url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    categorie: 'Homme',
    date_realisation: '2026-09-08',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'r4',
    salon_id: '00000000-0000-0000-0000-000000000001',
    staff_id: null,
    titre: 'Soin Botox & Lissage Organique Miroir',
    description: 'Transformation cheveux rebelles en matière lisse et lumineuse.',
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    categorie: 'Soins',
    date_realisation: '2026-09-10',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

interface GallerySectionProps {
  initialRealisations?: Realisation[]
}

export function GallerySection({ initialRealisations }: GallerySectionProps) {
  const items = (initialRealisations && initialRealisations.length > 0) ? initialRealisations : DEFAULT_REALISATIONS

  return (
    <section className="py-24 bg-zinc-900/40 border-t border-b border-zinc-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <Badge variant="gold" className="mb-4">
              Portfolio & Créations
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Nos Réalisations Récentes
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
              Découvrez en images quelques-unes des métamorphoses et coiffures confectionnées par nos experts chez OULIBIJ.
            </p>
          </div>
          <Link href="/galerie">
            <Button variant="outline" size="sm" className="gap-2 shrink-0">
              <span>Voir tout le book</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-lg aspect-[4/5] flex flex-col justify-end p-6 hover:border-amber-500/50 transition-all duration-300"
            >
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image_url})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Card Content */}
              <div className="relative z-10 space-y-2">
                {item.categorie && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {item.categorie}
                  </span>
                )}
                <h3 className="text-base font-bold text-zinc-100 leading-snug group-hover:text-amber-400 transition-colors">
                  {item.titre}
                </h3>
                {item.description && (
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
