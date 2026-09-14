'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SALON_INFO, HERO_HIGHLIGHTS } from '@/lib/constants'
import { Scissors, Sparkles, ShieldCheck } from '@/components/ui/Icons'

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Scissors: Scissors,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
}

export function HeroSection() {
  const scrollToPrestations = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('prestations')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative pt-6 sm:pt-12 pb-16 px-4 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline, Description, CTAs, Highlights */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-8 text-left">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Salon de Coiffure & Esthétique Féminine</span>
          </div>

          {/* Main Title on 2 Lines: Bold Sans-Serif */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-zinc-950 tracking-tight leading-[1.08]">
            Révélez Votre Éclat,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
              Sublimez Votre Chevelure.
            </span>
          </h1>

          {/* Short Subtitle */}
          <p className="text-zinc-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Bienvenue chez <span className="font-semibold text-zinc-900">{SALON_INFO.name}</span>. Une expérience haute coiffure sur-mesure combinant créativité, soins bien-être intenses et maîtrise parfaite de toutes les textures.
          </p>

          {/* Two Pill-Shaped CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/reserver"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Réserver un créneau
            </Link>

            <a
              href="#prestations"
              onClick={scrollToPrestations}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm sm:text-base font-bold text-zinc-950 bg-white border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              Découvrir nos soins
            </a>
          </div>

          {/* Row of 3 Highlights with Icons */}
          <div className="pt-8 border-t border-rose-100/90 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HERO_HIGHLIGHTS.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Sparkles
              return (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shrink-0 group-hover:scale-105 group-hover:bg-pink-100 transition-all">
                    <IconComp className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 tracking-wide uppercase">
                      {item.title}
                    </h3>
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
          <div className="absolute -inset-4 bg-gradient-to-tr from-pink-200/50 via-rose-100/40 to-pink-300/30 rounded-[3rem] blur-2xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {/* Left Collage Column */}
            <div className="space-y-4 sm:space-y-5">
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-white/60 group">
                <Image
                  src="/images/hero-1.jpg"
                  alt="Coiffure Wavy & Brushing Oulibij"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold text-white tracking-wide">Brushing Signature</span>
                </div>
              </div>

              <div className="relative h-44 sm:h-52 rounded-3xl overflow-hidden shadow-lg border border-white/60 group">
                <Image
                  src="/images/hero-2.jpg"
                  alt="Gestes de coiffure délicats"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold text-white tracking-wide">Soins Délicats</span>
                </div>
              </div>
            </div>

            {/* Right Collage Column */}
            <div className="space-y-4 sm:space-y-5 pt-8 sm:pt-10">
              <div className="relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-lg border border-white/60 group">
                <Image
                  src="/images/hero-4.jpg"
                  alt="Balayage lumineux et éclat"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold text-white tracking-wide">Balayage Soleil</span>
                </div>
              </div>

              <div className="relative h-60 sm:h-72 rounded-3xl overflow-hidden shadow-lg border border-white/60 group">
                <Image
                  src="/images/hero-3.jpg"
                  alt="Tresses artistiques & coiffure texturée"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
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
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-white border border-pink-200 shadow-md hover:shadow-lg hover:border-pink-400 hover:scale-110 transition-all cursor-pointer"
          aria-label="Faire défiler vers les prestations"
        >
          {/* Subtle spinning ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-pink-300 animate-spin-slow" />
          {/* Bouncing down arrow */}
          <svg
            className="w-5 h-5 text-pink-500 group-hover:text-pink-600 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
