'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Service } from '@/types'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Clock, ArrowRight, Scissors, Eye, Sparkles, WhatsAppBrand } from '@/components/ui/Icons'

interface ServicesSectionProps {
  initialServices?: Service[]
  showAllLink?: boolean
}

function getCategoryIcon(category: string) {
  if (category.toLowerCase().includes('maquillage')) return Eye
  return Scissors
}

export function ServicesSection({ initialServices = [], showAllLink = true }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const categories = useMemo(() => {
    const cats = new Set<string>()
    initialServices.forEach((s) => {
      if (s.categorie?.trim()) {
        cats.add(s.categorie.trim())
      }
    })
    return ['Tous', ...Array.from(cats)]
  }, [initialServices])

  const filteredServices =
    activeCategory === 'Tous'
      ? initialServices
      : initialServices.filter((s) => s.categorie === activeCategory)

  return (
    <section id="prestations" className="py-20 px-4 sm:px-8 lg:px-12 border-t border-amber-900/10 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf9f0] border border-amber-600/30 text-amber-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Maquillage • Coiffure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0e0c] tracking-tight">
            Nos Prestations &amp; Spécialités
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Retrouvez les prestations maquillage et coiffure {siteConfig.brandName} à {siteConfig.district}. Tarifs indicatifs en Franc CFA — confirmation et devis sur-mesure sur WhatsApp.
          </p>
        </RevealOnScroll>

        {categories.length > 2 && (
          <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
                    isSelected
                      ? 'bg-[#0f0e0c] text-amber-300 border border-amber-500/50 shadow-md shadow-stone-950/15'
                      : 'bg-[#faf8f4] text-stone-700 hover:bg-amber-50 hover:text-[#0f0e0c] border border-amber-900/15'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const CategoryIcon = getCategoryIcon(service.categorie || '')
            const bookingUrl = getWhatsAppBookingUrl(service.nom)

            return (
              <RevealOnScroll key={service.id} delayMs={(index % 3) * 60}>
                <div className="h-full bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-600/50 hover:bg-white hover:shadow-xl hover:shadow-stone-950/5 transition-all duration-300 group">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-[#0f0e0c] px-3 py-1 rounded-full border border-amber-500/40">
                          {service.categorie}
                        </span>
                        {service.necessite_essai && (
                          <span className="text-[10px] font-bold uppercase text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                            Cérémonie
                          </span>
                        )}
                      </div>
                      <span className="text-base sm:text-lg font-black text-[#0f0e0c] group-hover:text-amber-800 transition-colors text-right">
                        {formatCurrency(Number(service.prix), true)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0f0e0c] mb-2 flex items-center gap-2 group-hover:text-amber-800 transition-colors">
                      <CategoryIcon className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{service.nom}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-stone-600">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{formatDuration(service.duree_minutes)}</span>
                    </div>

                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 shadow-sm hover:shadow-md active:scale-95 transition-all min-h-[40px]"
                    >
                      <WhatsAppBrand className="w-3.5 h-3.5 text-white" />
                      <span>Réserver</span>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>

        {showAllLink && (
          <div className="text-center mt-12">
            <Link
              href="/prestations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 transition-all min-h-[44px]"
            >
              <span>Consulter toute la carte des prestations</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
