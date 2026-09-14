import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Calendar, Sparkles, Star, ShieldCheck, Clock } from '@/components/ui/Icons'
import { SALON_INFO } from '@/lib/constants'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-zinc-950">
      {/* Background Decorative Gradients & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950/80 to-zinc-950 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a10_1px,transparent_1px),linear-gradient(to_bottom,#27272a10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Prestige Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-md animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
          <span>Salon de Coiffure & Esthétique Haute Couture</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 max-w-4xl mx-auto leading-[1.15]">
          Sublimez Votre Style,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
            Révélez Votre Éclat
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
          Bienvenue chez <span className="font-semibold text-amber-400">{SALON_INFO.name}</span>. L'alliance parfaite de l'expertise technique, des soins bien-être sur-mesure et de la haute précision pour sublimer chaque chevelure.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/rendez-vous" className="w-full sm:w-auto">
            <Button variant="gold" size="lg" className="w-full sm:w-auto gap-3 text-base shadow-xl shadow-amber-500/20">
              <Calendar className="w-5 h-5" />
              <span>Réserver Votre Rendez-vous</span>
            </Button>
          </Link>
          <Link href="/services" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Consulter Nos Prestations & Tarifs
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-zinc-800/60">
          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 backdrop-blur-sm">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <div className="text-left">
              <div className="text-sm font-bold text-zinc-100">4.9 / 5</div>
              <div className="text-[11px] text-zinc-400">+500 avis vérifiés</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <div className="text-sm font-bold text-zinc-100">Mixte & Texturé</div>
              <div className="text-[11px] text-zinc-400">Tous types de cheveux</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <div className="text-sm font-bold text-zinc-100">Produits Prémium</div>
              <div className="text-[11px] text-zinc-400">100% de qualité certifiée</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 backdrop-blur-sm">
            <Clock className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <div className="text-sm font-bold text-zinc-100">Réservation 24/7</div>
              <div className="text-[11px] text-zinc-400">Confirmation instantanée</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
