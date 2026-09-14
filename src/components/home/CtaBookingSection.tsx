import React from 'react'
import Link from 'next/link'
import { SALON_INFO } from '@/lib/constants'
import { Sparkles, Phone } from '@/components/ui/Icons'

export function CtaBookingSection() {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white rounded-b-[2rem] sm:rounded-b-[2.75rem]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Offrez-vous un moment rien qu'à vous</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Prête Pour Votre Prochaine Coiffure ?
        </h2>

        <p className="text-pink-50 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Sélectionnez votre prestation et votre horaire en quelques instants. Confirmation immédiate.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reserver"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold bg-white text-zinc-950 shadow-xl hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all"
          >
            Prendre rendez-vous en ligne
          </Link>
          <a
            href={`tel:${SALON_INFO.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-pink-600/40 text-white border border-white/40 hover:bg-pink-600/60 active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>{SALON_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
