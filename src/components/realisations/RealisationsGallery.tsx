'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Realisation } from '@/types'
import { formatDateFrench } from '@/lib/utils'
import { getWhatsAppBookingUrl } from '@/lib/constants'
import { Sparkles, X, Eye, WhatsApp } from '@/components/ui/Icons'
import { EmptyState } from '@/components/ui/EmptyState'

interface RealisationsGalleryProps {
  realisations: Realisation[]
}

export function RealisationsGallery({ realisations }: RealisationsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')
  const [selectedItem, setSelectedItem] = useState<Realisation | null>(null)

  // Dynamically extract categories present in the data
  const categories = useMemo(() => {
    const set = new Set<string>()
    realisations.forEach((r) => {
      if (r.categorie && r.categorie.trim()) {
        set.add(r.categorie.trim())
      }
    })
    return ['Toutes', ...Array.from(set)]
  }, [realisations])

  // Filtered realisations based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'Toutes') {
      return realisations
    }
    return realisations.filter((r) => r.categorie === selectedCategory)
  }, [realisations, selectedCategory])

  if (!realisations || realisations.length === 0) {
    return (
      <EmptyState
        title="Aucune réalisation pour le moment"
        description="Notre portfolio de créations, balayages et tresses artistiques sera prochainement mis en ligne. Venez échanger avec nous en salon ou prenez rendez-vous en ligne."
        actionLabel="Prendre rendez-vous"
        actionHref="/reserver"
        icon={<Sparkles className="w-8 h-8 text-pink-500" />}
      />
    )
  }

  return (
    <div className="space-y-10">
      {/* Dynamic Category Filter Bar */}
      {categories.length > 2 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            const count =
              cat === 'Toutes'
                ? realisations.length
                : realisations.filter((r) => r.categorie === cat).length

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

      {/* Empty state for filtered category */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white/60 border border-rose-100 rounded-3xl p-8">
          <p className="text-zinc-500 text-sm">
            Aucune réalisation trouvée pour la catégorie &laquo; {selectedCategory} &raquo;.
          </p>
          <button
            onClick={() => setSelectedCategory('Toutes')}
            className="mt-4 px-4 py-2 text-xs font-semibold text-pink-600 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors"
          >
            Afficher toutes les réalisations
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-3xl overflow-hidden shadow-md aspect-[3/4] flex flex-col justify-end p-5 border border-rose-100/90 transition-all duration-300 hover:shadow-2xl hover:border-pink-300 hover:scale-[1.02] cursor-pointer bg-zinc-900"
          >
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={`${item.titre} - Réalisation coiffure ${item.categorie || ''}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white/40" />
              </div>
            )}

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity" />

            {/* Zoom icon on hover */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all">
              <Eye className="w-4 h-4" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                {item.categorie && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-700 text-white shadow-xs">
                    {item.categorie}
                  </span>
                )}
                {item.date_realisation && (
                  <span className="text-[10px] text-zinc-300">
                    {formatDateFrench(item.date_realisation)}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white leading-snug group-hover:text-pink-200 transition-colors">
                {item.titre}
              </h3>

              {item.description && (
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal on item click */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-pink-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  {selectedItem.categorie || 'Réalisation'}
                </span>
                {selectedItem.date_realisation && (
                  <span className="text-xs text-zinc-500">
                    • {formatDateFrench(selectedItem.date_realisation)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative w-full aspect-[4/3] bg-zinc-900 overflow-hidden">
              {selectedItem.image_url ? (
                <Image
                  src={selectedItem.image_url}
                  alt={`${selectedItem.titre} - Coiffure réalisée chez ${selectedItem.categorie || 'salon'}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                  Image non disponible
                </div>
              )}
            </div>

            {/* Modal Details & CTA */}
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <h3 className="text-xl font-bold text-zinc-950 mb-1 font-serif italic">
                  {selectedItem.titre}
                </h3>
                {selectedItem.description && (
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {selectedItem.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  Envie du même style ou d&apos;une personnalisation ?
                </span>
                <a
                  href={getWhatsAppBookingUrl(selectedItem.titre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedItem(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <WhatsApp className="w-3.5 h-3.5 text-white" />
                  <span>Demander cette coiffure sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
