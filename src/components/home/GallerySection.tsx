import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Realisation } from '@/types'
import { Sparkles, ArrowRight, WhatsApp } from '@/components/ui/Icons'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'

interface GallerySectionProps {
  initialRealisations?: Realisation[]
}

export function GallerySection({ initialRealisations = [] }: GallerySectionProps) {
  const items = initialRealisations.length > 0 ? initialRealisations : (siteConfig.realisations as unknown as Realisation[])

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
              Découvrez en images les créations réalisées pour nos clientes au salon {siteConfig.brandName} ({siteConfig.district}, {siteConfig.city}).
            </p>
          </div>

          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-zinc-950 border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white transition-all self-start md:self-end min-h-[44px]"
            aria-label="Voir l'ensemble de notre galerie de réalisations"
          >
            <span>Voir toute la galerie</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 3).map((item, index) => {
            const isFeatured = index === 0
            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden shadow-md flex flex-col justify-end p-6 border border-rose-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${
                  isFeatured ? 'lg:col-span-2 min-h-[380px] lg:min-h-[440px]' : 'min-h-[340px]'
                }`}
              >
                <Image
                  src={item.image_url || '/images/hero-1.jpg'}
                  alt={`${item.titre} - Réalisation coiffure ${siteConfig.brandName} ${siteConfig.district}`}
                  fill
                  sizes={isFeatured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2">
                    {item.categorie && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 text-white border border-white/20">
                        {item.categorie}
                      </span>
                    )}
                    {isFeatured && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-700 text-white">
                        Création Coup de Cœur
                      </span>
                    )}
                  </div>
                  <h3 className={`font-bold text-white leading-snug ${isFeatured ? 'text-lg sm:text-xl' : 'text-sm'}`}>
                    {item.titre}
                  </h3>
                  <a
                    href={getWhatsAppBookingUrl(item.titre)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200 transition-colors pt-1 min-h-[36px]"
                    aria-label={`Demander la coiffure ${item.titre} sur WhatsApp`}
                  >
                    <WhatsApp className="w-4 h-4 text-emerald-400" />
                    <span>Demander cette réalisation sur WhatsApp</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
