import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Realisation } from '@/types'
import { Sparkles, ArrowRight, WhatsAppBrand } from '@/components/ui/Icons'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'

interface GallerySectionProps {
  initialRealisations?: Realisation[]
}

export function GallerySection({ initialRealisations = [] }: GallerySectionProps) {
  const items =
    initialRealisations.length > 0
      ? initialRealisations
      : (siteConfig.realisations as unknown as Realisation[])

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 border-t border-amber-900/10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf9f0] border border-amber-600/30 text-amber-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Lookbook • {siteConfig.brandName}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0e0c] tracking-tight">
              Réalisations &amp; Inspirations
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              Aperçu des mises en beauté du regard, poses lace, tresses et coiffures réalisées dans notre salon à {siteConfig.district}, {siteConfig.city}.
            </p>
          </div>

          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 transition-all self-start md:self-end min-h-[44px]"
            aria-label="Voir l'ensemble de notre galerie de réalisations"
          >
            <span>Voir toute la galerie</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 3).map((item, index) => {
            const isFeatured = index === 0
            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden shadow-lg flex flex-col justify-end p-6 border border-amber-500/30 bg-[#0f0e0c] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] ${
                  isFeatured ? 'lg:col-span-2 min-h-[380px] lg:min-h-[440px]' : 'min-h-[340px]'
                }`}
              >
                <Image
                  src={item.image_url || '/images/hero-1.jpg'}
                  alt={`${item.titre} — ${siteConfig.brandName} ${siteConfig.district}`}
                  fill
                  sizes={
                    isFeatured
                      ? '(max-width: 1024px) 100vw, 50vw'
                      : '(max-width: 768px) 100vw, 25vw'
                  }
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.categorie && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0f0e0c]/90 text-amber-300 border border-amber-500/40">
                        {item.categorie}
                      </span>
                    )}
                    {isFeatured && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-[#0f0e0c]">
                        Signature Regard &amp; Coiffure
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-bold text-white leading-snug ${
                      isFeatured ? 'text-lg sm:text-xl' : 'text-sm'
                    }`}
                  >
                    {item.titre}
                  </h3>
                  <a
                    href={getWhatsAppBookingUrl(item.titre)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200 transition-colors pt-1 min-h-[36px]"
                    aria-label={`Demander ${item.titre} sur WhatsApp`}
                  >
                    <WhatsAppBrand className="w-4 h-4 text-emerald-400" />
                    <span>Demander sur WhatsApp</span>
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
