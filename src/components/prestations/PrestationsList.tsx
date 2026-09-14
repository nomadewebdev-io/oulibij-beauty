'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { ServiceWithCategory, Service } from '@/types'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { Clock, ArrowRight, Scissors, Sparkles, CheckCircle2 } from '@/components/ui/Icons'
import { EmptyState } from '@/components/ui/EmptyState'

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

  if (!allServices || allServices.length === 0) {
    return (
      <EmptyState
        title="Aucune prestation disponible pour le moment"
        description="Notre carte de soins et prestations est en cours de mise à jour dans le système. N'hésitez pas à nous contacter directement pour tout renseignement ou prise de rendez-vous."
        actionLabel="Nous contacter"
        actionHref="/contact"
        icon={<Scissors className="w-8 h-8 text-pink-500" />}
      />
    )
  }

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
                    isSelected ? 'bg-pink-500 text-white' : 'bg-rose-100 text-pink-700'
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
        {displayedGroups.map((group) => (
          <section key={group.category} className="space-y-6 scroll-mt-28">
            {/* Category Header */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-100/80 border border-pink-200/80 flex items-center justify-center text-pink-600 shadow-sm">
                  <Scissors className="w-4 h-4" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                  {group.category}
                </h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-pink-600 border border-rose-200/60">
                {group.services.length} {group.services.length > 1 ? 'soins' : 'soin'}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-rose-200 via-rose-100 to-transparent ml-2" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-rose-100/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 group"
                >
                  <div>
                    {/* Top row: category & price */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                        {service.categorie}
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-zinc-950 group-hover:text-pink-600 transition-colors">
                          {formatCurrency(Number(service.prix))}
                        </span>
                      </div>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-lg font-bold text-zinc-900 mb-2 flex items-start gap-2 group-hover:text-pink-600 transition-colors leading-snug">
                      <Sparkles className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                      <span>{service.nom}</span>
                    </h3>

                    {/* Description */}
                    {service.description ? (
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                        {service.description}
                      </p>
                    ) : (
                      <p className="text-xs text-zinc-400 italic mb-6">
                        Soin d'exception réalisé avec des produits professionnels de haute qualité.
                      </p>
                    )}
                  </div>

                  {/* Bottom row: duration & book button */}
                  <div className="pt-4 border-t border-rose-100/70 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-100">
                      <Clock className="w-3.5 h-3.5 text-pink-500" />
                      <span>{formatDuration(service.duree_minutes)}</span>
                    </div>

                    <Link
                      href={`/reserver?service=${service.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-sm shadow-pink-500/20 hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Réserver</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom Reassurance Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-rose-50/70 to-pink-50 border border-pink-200/70 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 border border-pink-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Diagnostic Offert</h4>
              <p className="text-xs text-zinc-500">Bilan personnalisé avant chaque soin</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 border border-pink-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Produits Haut de Gamme</h4>
              <p className="text-xs text-zinc-500">Formules nourrissantes & protectrices</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 border border-pink-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Réservation en Ligne 24/7</h4>
              <p className="text-xs text-zinc-500">Confirmation immédiate par e-mail</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
