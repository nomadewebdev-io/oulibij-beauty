import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { getWhatsAppBoutiqueInquiryUrl } from '@/data/products'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import {
  ArrowRight,
  Gem,
  ShoppingBag,
  Sparkles,
  WhatsAppBrand,
} from '@/components/ui/Icons'

export function BoutiqueSection() {
  return (
    <section
      id="boutique"
      className="py-20 px-4 sm:px-8 lg:px-12 bg-[#faf8f4] border-t border-amber-900/10 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>La Boutique • {siteConfig.district}, {siteConfig.city}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0e0c] tracking-tight">
              Cosmétiques, Parfums &amp; Accessoires
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Retrouvez en un seul espace notre sélection beauté disponible au salon et sur commande WhatsApp : soins cosmétiques, parfumerie féminine et accessoires raffinés.
            </p>
          </div>

          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 hover:-translate-y-0.5 transition-all shrink-0 min-h-[44px]"
          >
            <span>Accéder à la Boutique</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <RevealOnScroll className="lg:col-span-7" delayMs={60}>
            <div className="h-full rounded-3xl bg-[#0f0e0c] border border-amber-500/40 p-7 sm:p-9 text-white shadow-xl flex flex-col justify-between overflow-hidden group hover:border-amber-400/70 transition-all duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-7 space-y-4">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">
                    Écrin Beauté • {siteConfig.brandName}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-white leading-snug">
                    Vos indispensables beauté réunis à {siteConfig.district}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Après votre maquillage ou votre coiffure, complétez votre routine directement sur place à Cité Sonatel 2 (en face UNO des 2 Voies) ou commandez en un message sur WhatsApp.
                  </p>
                </div>

                <div className="sm:col-span-5">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-amber-500/35">
                    <Image
                      src="/images/hero-4.jpg"
                      alt={`Boutique ${siteConfig.brandName} — Cosmétiques, Parfums & Accessoires`}
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/boutique"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-[#0f0e0c] bg-amber-400 hover:bg-amber-300 shadow-md active:scale-95 transition-all min-h-[46px]"
                >
                  <ShoppingBag className="w-4 h-4 text-[#0f0e0c]" />
                  <span>Explorer la Boutique</span>
                </Link>

                <a
                  href={getWhatsAppBoutiqueInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md active:scale-95 transition-all min-h-[46px]"
                >
                  <WhatsAppBrand className="w-4 h-4 text-white" />
                  <span>Commander sur WhatsApp</span>
                </a>
              </div>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <RevealOnScroll delayMs={120}>
              <Link
                href="/boutique"
                className="block rounded-3xl bg-white border border-amber-900/15 p-6 sm:p-7 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-xl hover:shadow-stone-950/5 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#0f0e0c] group-hover:text-amber-800 transition-colors">
                        Cosmétiques &amp; Soins Beauté
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1">
                        Soins visage et corps, palettes regard, produits du teint et soins capillaires.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-700 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              <RevealOnScroll className="h-full" delayMs={170}>
                <Link
                  href="/boutique"
                  className="h-full rounded-3xl bg-white border border-amber-900/15 p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-xl hover:shadow-stone-950/5 transition-all duration-300 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Gem className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#0f0e0c] group-hover:text-amber-800 transition-colors">
                      Parfumerie
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1.5">
                      Eaux de parfum, brumes et senteurs féminines tenaces.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 mt-4">
                    <span>Découvrir</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </RevealOnScroll>

              <RevealOnScroll className="h-full" delayMs={220}>
                <Link
                  href="/boutique"
                  className="h-full rounded-3xl bg-white border border-amber-900/15 p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-xl hover:shadow-stone-950/5 transition-all duration-300 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#0f0e0c] group-hover:text-amber-800 transition-colors">
                      Accessoires
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1.5">
                      Faux cils, bijoux dorés, barrettes et bonnets satin.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 mt-4">
                    <span>Découvrir</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
