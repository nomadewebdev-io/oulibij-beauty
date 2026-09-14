import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Calendar, Phone, Sparkles } from '@/components/ui/Icons'
import { SALON_INFO } from '@/lib/constants'

export function CtaBookingSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border-t border-zinc-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Prêt pour une nouvelle métamorphose ?</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-zinc-100 tracking-tight leading-tight">
          Réservez Votre Moment Privilégié Chez{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
            {SALON_INFO.name}
          </span>
        </h2>

        <p className="mt-4 text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto font-light">
          Choisissez votre prestation, votre coiffeur préféré et votre horaire en quelques clics. Confirmation instantanée par e-mail et SMS.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/rendez-vous" className="w-full sm:w-auto">
            <Button variant="gold" size="lg" className="w-full sm:w-auto gap-3 text-base shadow-xl shadow-amber-500/20">
              <Calendar className="w-5 h-5" />
              <span>Prendre Rendez-vous en Ligne</span>
            </Button>
          </Link>
          <a href={`tel:${SALON_INFO.phone}`} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Phone className="w-4 h-4" />
              <span>{SALON_INFO.phone}</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
