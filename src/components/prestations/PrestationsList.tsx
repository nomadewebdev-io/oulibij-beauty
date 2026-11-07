'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { ServiceWithCategory, Service } from '@/types'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import {
  ArrowRight,
  Clock,
  Scissors,
  Eye,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Phone,
  WhatsAppBrand,
} from '@/components/ui/Icons'

interface PrestationsListProps {
  initialGroupedServices: ServiceWithCategory[]
  allServices: Service[]
}

function getGroupIcon(category: string) {
  if (category.toLowerCase().includes('maquillage')) return Eye
  return Scissors
}

export function PrestationsList({ initialGroupedServices, allServices }: PrestationsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')

  const categories = useMemo(() => {
    const cats = ['Toutes']
    initialGroupedServices.forEach((group) => {
      if (group.category && !cats.includes(group.category)) {
        cats.push(group.category)
      }
    })
    return cats
  }, [initialGroupedServices])

  const displayedGroups = useMemo(() => {
    if (selectedCategory === 'Toutes') {
      return initialGroupedServices
    }
    return initialGroupedServices.filter((g) => g.category === selectedCategory)
  }, [initialGroupedServices, selectedCategory])

  return (
    <div className="space-y-12">
      {categories.length > 2 && (
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            const count =
              cat === 'Toutes'
                ? allServices.length
                : initialGroupedServices.find((g) => g.category === cat)?.services.length || 0

            return (
              <button
                key={cat}
                type="button"
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
                    isSelected ? 'bg-amber-400 text-[#0f0e0c]' : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <div className="space-y-16">
        {displayedGroups.map((group) => {
          const GroupIcon = getGroupIcon(group.category)

          return (
            <section key={group.category} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f0e0c] border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                    <GroupIcon className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f0e0c] tracking-tight">
                    {group.category}
                  </h2>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#fdf9f0] text-amber-900 border border-amber-600/30">
                  {group.services.length}{' '}
                  {group.services.length > 1 ? 'spécialités' : 'spécialité'}
                </span>
                <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-amber-600/30 via-amber-500/10 to-transparent ml-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.services.map((service, index) => {
                  const bookingUrl = getWhatsAppBookingUrl(service.nom)

                  return (
                    <RevealOnScroll key={service.id} delayMs={(index % 3) * 60}>
                      <div className="h-full bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-600/50 hover:bg-white hover:shadow-xl hover:shadow-stone-950/5 transition-all duration-300 group">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-[#0f0e0c] px-3 py-1 rounded-full border border-amber-500/40">
                                {service.categorie}
                              </span>
                              {service.necessite_essai && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                                  Événement
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-lg sm:text-xl font-black text-[#0f0e0c] group-hover:text-amber-800 transition-colors">
                                {formatCurrency(Number(service.prix), true)}
                              </span>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-[#0f0e0c] mb-2 flex items-start gap-2 group-hover:text-amber-800 transition-colors leading-snug">
                            <GroupIcon className="w-4 h-4 text-amber-700 shrink-0 mt-1" />
                            <span>{service.nom}</span>
                          </h3>

                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                            {service.description}
                          </p>

                          {service.necessite_essai && (
                            <div className="p-3 rounded-2xl bg-[#fdf9f0] border border-amber-500/30 text-amber-950 text-xs mb-5 flex items-start gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                              <p className="leading-snug text-[11px]">
                                <strong>Cérémonie &amp; Mariée :</strong> Échangez avec nous sur WhatsApp pour adapter le maquillage à votre tenue et l&apos;horaire de votre événement.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between mt-auto gap-3">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-white px-2.5 py-1 rounded-lg border border-amber-900/10">
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
                            <span>Réserver sur WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </RevealOnScroll>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      <RevealOnScroll>
        <div className="p-6 sm:p-8 rounded-3xl bg-[#faf8f4] border border-amber-900/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0f0e0c]">
                Cosmétiques, Parfums &amp; Accessoires
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Retrouvez tous nos produits cosmétiques, notre parfumerie et nos accessoires beauté dans notre espace Boutique dédié.
              </p>
            </div>
          </div>

          <Link
            href="/boutique"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 transition-all shrink-0 min-h-[44px]"
          >
            <span>Découvrir la Boutique</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </RevealOnScroll>

      <div className="mt-10 p-8 rounded-3xl bg-[#0f0e0c] text-white border border-amber-500/40 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left items-center">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Ouvert 7j/7 • 9h – 21h</h3>
              <p className="text-xs text-stone-400">Du lundi au dimanche à {siteConfig.district}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Appel Direct : {siteConfig.phone}</h3>
              <a href={getPhoneCallUrl()} className="text-xs text-amber-400 hover:underline">
                Joindre le salon par téléphone
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
              <WhatsAppBrand className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Paiements Mobiles</h3>
              <p className="text-xs text-stone-400">{siteConfig.payments.join(' • ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
