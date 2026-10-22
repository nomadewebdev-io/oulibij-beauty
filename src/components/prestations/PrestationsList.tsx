'use client'

import React, { useState, useMemo } from 'react'
import { ServiceWithCategory, Service } from '@/types'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { getWhatsAppBookingUrl } from '@/lib/constants'
import { Clock, Scissors, Sparkles, CheckCircle2, WhatsApp } from '@/components/ui/Icons'

interface PrestationsListProps {
  initialGroupedServices: ServiceWithCategory[]
  allServices: Service[]
}

export function PrestationsList({ initialGroupedServices, allServices }: PrestationsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')

  // List of all unique categories
  const categories = useMemo(() => {
    const cats = ['Toutes']
    initialGroupedServices.forEach((group) => {
      if (group.category && !cats.includes(group.category)) {
        cats.push(group.category)
      }
    })
    return cats
  }, [initialGroupedServices])

  // Filtered grouped services
  const displayedGroups = useMemo(() => {
    if (selectedCategory === 'Toutes') {
      return initialGroupedServices
    }
    return initialGroupedServices.filter((g) => g.category === selectedCategory)
  }, [initialGroupedServices, selectedCategory])

  return (
    <div className="space-y-12">
      {/* Category Pills Filter */}
      {categories.length > 2 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            const count =
              cat === 'Toutes'
                ? allServices.length
                : initialGroupedServices.find((g) => g.category === cat)?.services.length || 0

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-lg shadow-zinc-950/15 scale-105'
                    : 'bg-white text-zinc-600 hover:bg-rose-50 hover:text-zinc-900 border border-rose-100 shadow-sm'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Grouped Services Sections */}
      <div className="space-y-16">
        {displayedGroups.map((group) => {
          const isMakeup =
            group.category.toLowerCase().includes('maquillage') ||
            group.category.toLowerCase().includes('mariée')

          return (
            <section key={group.category} className="space-y-6 scroll-mt-28">
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-sm">
                    {isMakeup ? <Sparkles className="w-4 h-4" /> : <Scissors className="w-4 h-4" />}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    {group.category}
                  </h2>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60">
                  {group.services.length} {group.services.length > 1 ? (isMakeup ? 'prestations' : 'soins') : (isMakeup ? 'prestation' : 'soin')}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-rose-200 via-rose-100 to-transparent ml-2" />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.services.map((service) => {
                  const bookingUrl = getWhatsAppBookingUrl(service.nom)

                  return (
                    <div
                      key={service.id}
                      className="bg-white border border-rose-100/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 group"
                    >
                      <div>
                        {/* Top row: category & price in FCFA */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                              {service.categorie}
                            </span>
                            {service.necessite_essai && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                                Essai inclus
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black text-zinc-950 group-hover:text-rose-600 transition-colors">
                              {formatCurrency(Number(service.prix))}
                            </span>
                          </div>
                        </div>

                        {/* Service Name */}
                        <h3 className="text-lg font-bold text-zinc-900 mb-2 flex items-start gap-2 group-hover:text-rose-600 transition-colors leading-snug">
                          <Sparkles className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{service.nom}</span>
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                          {service.description}
                        </p>

                        {/* Notice essai préalable */}
                        {service.necessite_essai && (
                          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs mb-5 flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <p className="leading-snug text-[11px]">
                              <strong>Pack Mariée :</strong> Séance d'essai personnalisée incluse pour définir le style parfait avant le jour J.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Bottom row: duration & WhatsApp booking button */}
                      <div className="pt-4 border-t border-rose-100/70 flex items-center justify-between mt-auto gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-100">
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
            </section>
          )
        })}
      </div>

      {/* Bottom Reassurance Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-pink-50/50 to-rose-50 border border-rose-200/70 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Diagnostic Offert</h4>
              <p className="text-xs text-zinc-500">Bilan personnalisé avant chaque soin</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Produits Haut de Gamme</h4>
              <p className="text-xs text-zinc-500">Kératine végétale, botox & huiles pures</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <WhatsApp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Réservation WhatsApp</h4>
              <p className="text-xs text-zinc-500">Confirmation immédiate 7j/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
