'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Service } from '@/types'
import { SERVICE_CATEGORIES } from '@/lib/constants'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { Clock, ArrowRight, Scissors, Sparkles } from '@/components/ui/Icons'

const DEFAULT_SERVICES: Service[] = [
  {
    id: 's1',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Coupe & Brushing Signature',
    description: 'Diagnostic capillaire personnalisé, shampoing massant bien-être, coupe sur-mesure et brushing éclat.',
    categorie: 'Coupe & Coiffage',
    duree_minutes: 50,
    prix: 65,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's2',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Tresses & Braids Artistiques',
    description: 'Box braids knotless, nattes collées stylisées ou vanilles soignées avec traçage net.',
    categorie: 'Tresses & Braids',
    duree_minutes: 120,
    prix: 110,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's3',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Balayage & Nuance Lumineuse',
    description: 'Éclaircissement fondu sur-mesure, patine gloss brillance intense et soin réparateur nutri-protecteur.',
    categorie: 'Coloration & Balayage',
    duree_minutes: 90,
    prix: 135,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's4',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Soin Botox Capillaire & Kératine',
    description: 'Traitement réparateur profond pour restaurer la souplesse, dompter les frisottis et magnifier la fibre.',
    categorie: 'Soins & Traitements',
    duree_minutes: 75,
    prix: 95,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's5',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Lissage Brésilien Organique',
    description: 'Lissage thermo-actif enrichi en acides aminés et huiles précieuses pour un fini soyeux et longue durée.',
    categorie: 'Lissages & Détente',
    duree_minutes: 150,
    prix: 180,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's6',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Coiffure de Soirée & Événement',
    description: 'Chignon couture, ondulations glamour ou attaches sophistiquées pour vos grands moments.',
    categorie: 'Coupe & Coiffage',
    duree_minutes: 60,
    prix: 85,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
]

interface ServicesSectionProps {
  initialServices?: Service[]
  showAllLink?: boolean
}

export function ServicesSection({ initialServices, showAllLink = true }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const services = (initialServices && initialServices.length > 0) ? initialServices : DEFAULT_SERVICES

  const filteredServices = activeCategory === 'Tous'
    ? services
    : services.filter((s) => s.categorie === activeCategory)

  return (
    <section id="prestations" className="py-20 px-4 sm:px-8 lg:px-12 border-t border-rose-100/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Nos Prestations Féminines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Menu des Soins & Tarifs
          </h2>
          <p className="mt-3 text-zinc-600 text-sm sm:text-base">
            Des soins d'exception adaptés à votre nature de cheveu, prodigués par nos stylistes passionnées.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {SERVICE_CATEGORIES.map((cat) => (
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

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-rose-100/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                    {service.categorie}
                  </span>
                  <span className="text-xl font-black text-zinc-950 group-hover:text-pink-600 transition-colors">
                    {formatCurrency(Number(service.prix))}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-950 mb-2 flex items-center gap-2 group-hover:text-pink-600 transition-colors">
                  <Scissors className="w-4 h-4 text-pink-500 shrink-0" />
                  {service.nom}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-rose-100/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-pink-500" />
                  <span>{formatDuration(service.duree_minutes)}</span>
                </div>

                <Link
                  href={`/reserver?service=${service.id}`}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Réserver</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link */}
        {showAllLink && (
          <div className="text-center mt-12">
            <Link
              href="/prestations"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-pink-600 transition-colors"
            >
              <span>Consulter l'ensemble de notre carte de prestations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
