'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Service } from '@/types'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { getWhatsAppBookingUrl } from '@/lib/constants'
import { Clock, ArrowRight, Scissors, Sparkles, WhatsApp } from '@/components/ui/Icons'

interface ServicesSectionProps {
  initialServices?: Service[]
  showAllLink?: boolean
}

export function ServicesSection({ initialServices = [], showAllLink = true }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('Tous')

  // Dynamic categories
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
    <section id="prestations" className="py-20 px-4 sm:px-8 lg:px-12 border-t border-rose-100/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Nos Prestations Féminines • Tarifs en FCFA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Menu des Soins & Tarifs
          </h2>
          <p className="mt-3 text-zinc-600 text-sm sm:text-base">
            Des soins haut de gamme adaptés à la texture de vos cheveux, prodigués par nos stylistes passionnées aux Almadies.
          </p>
        </div>

        {/* Category Tabs */}
        {categories.length > 2 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-950 text-white shadow-md shadow-zinc-950/15'
                    : 'bg-white text-zinc-600 hover:bg-rose-50 hover:text-zinc-900 border border-rose-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isMakeup = (service.categorie || '').toLowerCase().includes('maquillage')
            const bookingUrl = getWhatsAppBookingUrl(service.nom)

            return (
              <div
                key={service.id}
                className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                        {service.categorie}
                      </span>
                      {service.necessite_essai && (
                        <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Essai inclus
                        </span>
                      )}
                    </div>
                    <span className="text-xl font-black text-zinc-950 group-hover:text-rose-600 transition-colors">
                      {formatCurrency(Number(service.prix))}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950 mb-2 flex items-center gap-2 group-hover:text-rose-600 transition-colors">
                    {isMakeup ? (
                      <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
                    ) : (
                      <Scissors className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span>{service.nom}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-rose-100/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>{formatDuration(service.duree_minutes)}</span>
                  </div>

                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <WhatsApp className="w-3.5 h-3.5 text-white" />
                    <span>Réserver sur WhatsApp</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Link */}
        {showAllLink && (
          <div className="text-center mt-12">
            <Link
              href="/prestations"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-rose-600 transition-colors"
            >
              <span>Consulter l&apos;ensemble de notre carte de prestations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
