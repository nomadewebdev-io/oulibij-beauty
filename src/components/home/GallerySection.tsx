import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Realisation } from '@/types'
import { Sparkles, ArrowRight, WhatsApp } from '@/components/ui/Icons'
import { DEFAULT_REALISATIONS, getWhatsAppBookingUrl } from '@/lib/constants'

interface GallerySectionProps {
  initialRealisations?: Realisation[]
}

export function GallerySection({ initialRealisations = [] }: GallerySectionProps) {
  const items = initialRealisations.length > 0 ? initialRealisations : DEFAULT_REALISATIONS

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 border-t border-rose-100/70">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Nos Réalisations • Créations en Salon</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Inspirations & Métamorphoses
            </h2>
            <p className="mt-2 text-zinc-600 text-sm sm:text-base max-w-xl">
              Découvrez en images les créations réalisées pour nos clientes au salon des Almadies.
            </p>
          </div>

          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-zinc-950 border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white transition-all self-start md:self-end"
          >
            <span>Voir toute la galerie</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden shadow-md aspect-[3/4] flex flex-col justify-end p-5 border border-rose-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <Image
                src={item.image_url || '/images/hero-1.jpg'}
                alt={item.titre}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 space-y-2">
                {item.categorie && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                    {item.categorie}
                  </span>
                )}
                <h3 className="text-sm font-bold text-white leading-snug">
                  {item.titre}
                </h3>
                <a
                  href={getWhatsAppBookingUrl(item.titre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 hover:text-emerald-200 transition-colors pt-1"
                >
                  <WhatsApp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Demander cette coupe sur WhatsApp →</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
