'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Service } from '@/types'
import { SERVICE_CATEGORIES } from '@/lib/constants'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Clock, ArrowRight, Scissors } from '@/components/ui/Icons'

// Default fallback services if DB is fresh
const DEFAULT_FALLBACK_SERVICES: Service[] = [
  {
    id: 's1',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Coupe & Coiffage Signature',
    description: 'Diagnostic personnalisé, shampoing massant traitant, coupe stylisée et brushing haute tenue.',
    categorie: 'Coiffure & Coupe',
    duree_minutes: 50,
    prix: 65,
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's2',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Tresses & Braids Artistiques',
    description: 'Nattes collées, box braids, knotless ou vanilles avec traçage géométrique parfait.',
    categorie: 'Tresses & Braids',
    duree_minutes: 120,
    prix: 110,
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's3',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Balayage & Nuance Lumineuse',
    description: 'Éclaircissement naturel sur-mesure, patine gloss brillance intense et soin réparateur.',
    categorie: 'Coloration & Balayage',
    duree_minutes: 90,
    prix: 135,
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's4',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Soin Botox Capillaire & Kératine',
    description: 'Nutrition en profondeur, domptage des frisottis et régénération totale de la fibre.',
    categorie: 'Soins Profonds',
    duree_minutes: 75,
    prix: 95,
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's5',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Lissage Brésilien Organique',
    description: 'Lissage thermo-actif enrichi en acides aminés et huiles végétales sans formol.',
    categorie: 'Lissages',
    duree_minutes: 150,
    prix: 180,
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's6',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Coupe Homme & Barbe Prestige',
    description: 'Coupe ciseaux/tondeuse, dégradé à blanc, taille de barbe soignée, serviette chaude et huile.',
    categorie: 'Homme & Barbe',
    duree_minutes: 45,
    prix: 45,
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

interface ServicesSectionProps {
  initialServices?: Service[]
  showAllLink?: boolean
}

export function ServicesSection({ initialServices, showAllLink = true }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const services = (initialServices && initialServices.length > 0) ? initialServices : DEFAULT_FALLBACK_SERVICES

  const filteredServices = activeCategory === 'Tous'
    ? services
    : services.filter((s) => s.categorie === activeCategory)

  return (
    <section className="py-24 bg-zinc-900/50 border-t border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="gold" className="mb-4">
            Nos Prestations
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Menu des Services & Tarifs
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Des prestations d'exception personnalisées pour hommes et femmes, réalisées par nos artistes coiffeurs avec des produits de haute cosmétique.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-800/70 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    {service.categorie}
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-black text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {formatCurrency(Number(service.prix))}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors mb-2 flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-amber-500/70 group-hover:text-amber-400 shrink-0" />
                  {service.nom}
                </h3>

                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{formatDuration(service.duree_minutes)}</span>
                </div>

                <Link href={`/rendez-vous?service=${service.id}`}>
                  <Button variant="gold" size="sm" className="gap-1 text-xs">
                    <span>Réserver</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {showAllLink && (
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="md">
                Voir l'ensemble de la carte des soins →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
