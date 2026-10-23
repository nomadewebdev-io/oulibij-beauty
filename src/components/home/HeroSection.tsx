'use client'

import React from 'react'
import Image from 'next/image'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'
import { Scissors, Sparkles, ShieldCheck, WhatsApp } from '@/components/ui/Icons'

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Scissors,
  Sparkles,
  ShieldCheck,
}

export function HeroSection() {
  const scrollToPrestations = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('prestations')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const whatsappUrl = getWhatsAppBookingUrl()

  return (
    <section className="relative pt-6 sm:pt-12 pb-14 px-4 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline, Description, CTAs, Highlights */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-8 text-left">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="sm:hidden">SALON DE COIFFURE • {siteConfig.city.toUpperCase()}</span>
            <span className="hidden sm:inline">{siteConfig.hero.badge} • {siteConfig.city}</span>
          </div>

          {/* Main Title on 2 Lines: Bold Sans-Serif */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-zinc-950 tracking-tight leading-[1.08]">
            {siteConfig.hero.titleLine1}<br />
            <span className="text-rose-700">
              {siteConfig.hero.titleLine2}
            </span>
          </h1>

          {/* Short Subtitle */}
          <p className="text-zinc-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Bienvenue chez <span className="font-semibold text-zinc-900">{siteConfig.name}</span> à {siteConfig.district}. Une expérience haute coiffure sur-mesure alliant créativité, soins profonds réparateurs et maîtrise experte de toutes les textures capillaires.
          </p>

          {/* Two Pill-Shaped CTAs: 100% width on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer min-h-[48px] text-center"
              aria-label={`Réserver un rendez-vous sur WhatsApp avec ${siteConfig.brandName}`}
            >
              <WhatsApp className="w-5 h-5 text-white shrink-0" />
              <span>{siteConfig.hero.ctaWhatsApp}</span>
            </a>

            <a
              href="#prestations"
              onClick={scrollToPrestations}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-sm sm:text-base font-bold text-zinc-950 bg-white border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white active:scale-[0.98] transition-all cursor-pointer shadow-sm min-h-[48px] text-center"
              aria-label="Faire défiler vers la liste des soins et tarifs"
            >
              {siteConfig.hero.ctaDiscover}
            </a>
          </div>

          {/* Row of Highlights with Vector Icons */}
          <div className="pt-8 border-t border-rose-100/90 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {siteConfig.hero.highlights.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Sparkles
              return (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0 group-hover:scale-105 group-hover:bg-rose-100 transition-all">
                    <IconComp className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-zinc-900 tracking-wide uppercase">
                      {item.title}
                    </h2>
                    <p className="text-[12px] text-zinc-500 leading-snug mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Photo Collage (2 columns, varied heights) */}
        <div className="lg:col-span-6 xl:col-span-5 relative">
          {/* Subtle Ambient Glow behind collage */}
          <div className="absolute -inset-4 bg-rose-100/40 rounded-[3rem] blur-xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {/* Left Collage Column */}
            <div className="space-y-4 sm:space-y-5">
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-white/60 group">
                <Image
                  src="/images/hero-1.jpg"
                  alt={`Coiffure Wavy et Brushing Signature chez ${siteConfig.name} ${siteConfig.district}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold text-white tracking-wide">Brushing Signature</span>
                </div>
              </div>

              <div className="relative h-44 sm:h-52 rounded-3xl overflow-hidden shadow-lg border border-white/60 group">
                <Image
                  src="/images/hero-2.jpg"
                  alt={`Soin profond et rituel bien-être chez ${siteConfig.name}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold text-white tracking-wide">Soins Délicats</span>
                </div>
              </div>
            </div>

            {/* Right Collage Column */}
            <div className="space-y-4 sm:space-y-5 pt-8 sm:pt-10">
              <div className="relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-lg border border-white/60 group">
                <Image
                  src="/images/hero-4.jpg"
                  alt={`Balayage blond miel lumineux réalisé chez ${siteConfig.brandName}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold text-white tracking-wide">Balayage Soleil</span>
                </div>
              </div>

              <div className="relative h-60 sm:h-72 rounded-3xl overflow-hidden shadow-lg border border-white/60 group">
                <Image
                  src="/images/hero-3.jpg"
                  alt={`Tresses knotless et coiffure protectrice d'art chez ${siteConfig.name}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold text-white tracking-wide">Art des Tresses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Circular "Scroll Down" Badge */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <a
          href="#prestations"
          onClick={scrollToPrestations}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-white border border-rose-200 shadow-md hover:shadow-lg hover:border-rose-400 hover:scale-110 transition-all cursor-pointer"
          aria-label="Faire défiler vers les prestations et tarifs"
        >
          {/* Subtle spinning ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-rose-300 animate-spin-slow" />
          {/* Bouncing down arrow */}
          <svg
            className="w-5 h-5 text-rose-500 group-hover:text-rose-600 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
