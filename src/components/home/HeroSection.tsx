'use client'

import React from 'react'
import Image from 'next/image'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import {
  Eye,
  Scissors,
  Gem,
  Sparkles,
  ShieldCheck,
  Phone,
  MapPin,
  Clock,
  WhatsAppBrand,
} from '@/components/ui/Icons'

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Eye,
  Scissors,
  Gem,
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
  const phoneUrl = getPhoneCallUrl()

  return (
    <section className="relative pt-6 sm:pt-12 pb-14 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#faf8f4] to-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-6 xl:col-span-7 space-y-7 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/50 text-amber-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="sm:hidden">OULIBIJ BEAUTÉ • {siteConfig.district.toUpperCase()}</span>
            <span className="hidden sm:inline">
              {siteConfig.hero.badge} • {siteConfig.district}, {siteConfig.city}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl xl:text-[64px] font-black text-[#0f0e0c] tracking-tight leading-[1.08]">
            {siteConfig.hero.titleLine1}
            <br />
            <span className="text-amber-700 font-serif italic font-extrabold">
              {siteConfig.hero.titleLine2}
            </span>
          </h1>

          <p className="text-stone-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            À <strong className="font-semibold text-[#0f0e0c]">{siteConfig.district}</strong> ({siteConfig.address}),{' '}
            <strong className="font-semibold text-[#0f0e0c]">{siteConfig.brandName}</strong> réunit maquillage professionnel (cérémonie, simple et contouring), coiffure féminine complète (tissage, tresse, bouclage, pose lace, Stream Pod, teinture, soins) et espace cosmétiques, parfumerie &amp; accessoires.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-stone-700">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Lundi au dimanche : 9h – 21h</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Cité Sonatel 2, face UNO des 2 Voies</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-1 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer min-h-[48px] text-center"
              aria-label={`Réserver un rendez-vous sur WhatsApp avec ${siteConfig.brandName}`}
            >
              <WhatsAppBrand className="w-5 h-5 text-white shrink-0" />
              <span>{siteConfig.hero.ctaWhatsApp}</span>
            </a>

            <a
              href={phoneUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-amber-300 bg-[#0f0e0c] border border-amber-500/50 hover:bg-stone-900 active:scale-[0.98] transition-all cursor-pointer shadow-md min-h-[48px] text-center"
              aria-label={`Appeler directement ${siteConfig.brandName} au ${siteConfig.phone}`}
            >
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{siteConfig.hero.ctaCall}</span>
            </a>
          </div>

          <div className="pt-6 border-t border-amber-900/15 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {siteConfig.hero.highlights.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Sparkles
              return (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-2xl bg-[#0f0e0c] border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-[#0f0e0c] tracking-wide uppercase">
                      {item.title}
                    </h2>
                    <p className="text-[12px] text-stone-600 leading-snug mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-5 relative">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-4 sm:space-y-5">
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border-2 border-amber-500/30 group bg-[#0f0e0c]">
                <Image
                  src="/images/hero-1.jpg"
                  alt={`Maquillage du regard et bouclage glamour chez ${siteConfig.brandName} à ${siteConfig.district}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-amber-200 tracking-wide">
                    Beauté du Regard &amp; Bouclage
                  </span>
                </div>
              </div>

              <div className="relative h-44 sm:h-52 rounded-3xl overflow-hidden shadow-xl border-2 border-amber-500/25 group bg-[#0f0e0c]">
                <Image
                  src="/images/hero-2.jpg"
                  alt={`Lissage vapeur Stream Pod, soins et accessoires dorés chez ${siteConfig.brandName}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-amber-200 tracking-wide">
                    Stream Pod &amp; Accessoires
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5 pt-8 sm:pt-10">
              <div className="relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-xl border-2 border-amber-500/25 group bg-[#0f0e0c]">
                <Image
                  src="/images/hero-4.jpg"
                  alt={`Pose lace, teinture lumineuse et contouring chez ${siteConfig.brandName}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-amber-200 tracking-wide">
                    Pose Lace &amp; Contouring
                  </span>
                </div>
              </div>

              <div className="relative h-60 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-2 border-amber-500/30 group bg-[#0f0e0c]">
                <Image
                  src="/images/hero-3.jpg"
                  alt={`Tresses africaines, tissage et maquillage cérémonie chez ${siteConfig.brandName}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-amber-200 tracking-wide">
                    Tresses, Tissage &amp; Cérémonie
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12 sm:mt-14">
        <a
          href="#prestations"
          onClick={scrollToPrestations}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0f0e0c] border border-amber-500/60 shadow-lg hover:scale-110 transition-all cursor-pointer"
          aria-label="Faire défiler vers la liste des prestations"
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/50 animate-spin-slow" />
          <svg
            className="w-5 h-5 text-amber-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
