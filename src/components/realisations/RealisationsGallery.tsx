'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Realisation } from '@/types'
import { formatDateFrench } from '@/lib/utils'
import { getWhatsAppBookingUrl } from '@/config/site'
import { Sparkles, X, Eye, WhatsAppBrand } from '@/components/ui/Icons'
import { EmptyState } from '@/components/ui/EmptyState'

interface RealisationsGalleryProps {
  realisations: Realisation[]
}

export function RealisationsGallery({ realisations }: RealisationsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')
  const [selectedItem, setSelectedItem] = useState<Realisation | null>(null)

  const categories = useMemo(() => {
    const set = new Set<string>()
    realisations.forEach((r) => {
      if (r.categorie && r.categorie.trim()) {
        set.add(r.categorie.trim())
      }
    })
    return ['Toutes', ...Array.from(set)]
  }, [realisations])

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'Toutes') {
      return realisations
    }
    return realisations.filter((r) => r.categorie === selectedCategory)
  }, [realisations, selectedCategory])

  if (!realisations || realisations.length === 0) {
    return (
      <EmptyState
        title="Aucune réalisation affichée"
        description="Contactez-nous directement sur WhatsApp pour découvrir nos dernières créations maquillage et coiffure."
        actionLabel="Prendre rendez-vous"
        actionHref="/reserver"
        icon={<Sparkles className="w-8 h-8 text-amber-400" />}
      />
    )
  }

  return (
    <div className="space-y-10">
      {categories.length > 2 && (
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-3 no-scrollbar">
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
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 min-h-[44px] ${
                  isSelected
                    ? 'bg-[#0f0e0c] text-amber-300 border border-amber-500/50 shadow-lg shadow-stone-950/15'
                    : 'bg-[#faf8f4] text-stone-700 hover:bg-amber-50 hover:text-[#0f0e0c] border border-amber-900/15'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    isSelected ? 'bg-amber-500 text-[#0f0e0c]' : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-8">
          <p className="text-stone-600 text-sm">
            Aucune réalisation trouvée pour la catégorie &laquo; {selectedCategory} &raquo;.
          </p>
          <button
            onClick={() => setSelectedCategory('Toutes')}
            className="mt-4 px-5 py-2.5 text-xs font-bold text-amber-300 bg-[#0f0e0c] rounded-full hover:bg-stone-900 transition-colors cursor-pointer"
          >
            Afficher toutes les réalisations
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4] flex flex-col justify-end p-5 border border-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:border-amber-400 hover:scale-[1.02] cursor-pointer bg-[#0f0e0c]"
          >
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={`${item.titre} — ${item.categorie || 'OuliBij Beauté'}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-[#0f0e0c] flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-amber-400/40" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity" />

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0f0e0c]/90 border border-amber-500/50 flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all">
              <Eye className="w-4 h-4" />
            </div>

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                {item.categorie && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-[#0f0e0c]">
                    {item.categorie}
                  </span>
                )}
                {item.date_realisation && (
                  <span className="text-[10px] text-stone-300">
                    {formatDateFrench(item.date_realisation)}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                {item.titre}
              </h3>

              {item.description && (
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-500/40 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-amber-900/10 bg-[#faf8f4]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-[#0f0e0c] px-3 py-1 rounded-full border border-amber-500/40">
                  {selectedItem.categorie || 'Réalisation'}
                </span>
                {selectedItem.date_realisation && (
                  <span className="text-xs text-stone-500">
                    • {formatDateFrench(selectedItem.date_realisation)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-9 h-9 rounded-full bg-[#0f0e0c] hover:bg-stone-800 text-amber-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full aspect-[4/3] bg-[#0f0e0c] overflow-hidden">
              {selectedItem.image_url ? (
                <Image
                  src={selectedItem.image_url}
                  alt={selectedItem.titre}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  Image non disponible
                </div>
              )}
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <h3 className="text-xl font-bold text-[#0f0e0c] mb-1 font-serif italic">
                  {selectedItem.titre}
                </h3>
                {selectedItem.description && (
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {selectedItem.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-stone-500">
                  Envie du même résultat chez OuliBij Beauté ?
                </span>
                <a
                  href={getWhatsAppBookingUrl(selectedItem.titre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedItem(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md active:scale-95 transition-all min-h-[44px]"
                >
                  <WhatsAppBrand className="w-3.5 h-3.5 text-white" />
                  <span>Demander sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
