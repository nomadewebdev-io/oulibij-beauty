import React from 'react'
import { SALON_INFO, getWhatsAppBookingUrl } from '@/lib/constants'
import { Sparkles, Phone, WhatsApp } from '@/components/ui/Icons'

export function CtaBookingSection() {
  const whatsappUrl = getWhatsAppBookingUrl()

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#881337] text-white rounded-b-[2rem] sm:rounded-b-[2.75rem]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-rose-200" />
          <span>Offrez-vous un moment de pur bien-être</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Prête Pour Votre Prochaine Coiffure d&apos;Exception ?
        </h2>

        <p className="text-rose-100 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
          Échangez directement avec notre équipe sur WhatsApp. Choix du soin, conseil personnalisé et confirmation immédiate de votre créneau aux Almadies.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold bg-white text-zinc-950 shadow-lg hover:bg-rose-50 hover:scale-[1.02] active:scale-95 transition-all min-h-[48px]"
          >
            <WhatsApp className="w-4 h-4 text-emerald-600" />
            <span>Réserver sur WhatsApp</span>
          </a>

          <a
            href={`tel:${SALON_INFO.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-rose-900/60 text-white border border-rose-400/40 hover:bg-rose-900 active:scale-95 transition-all min-h-[48px]"
          >
            <Phone className="w-4 h-4" />
            <span>Appeler le salon : {SALON_INFO.phone}</span>
          </a>
        </div>

        <p className="text-[12px] text-pink-100/90 pt-3">
          Paiements acceptés : Wave • Orange Money • Free Money • Espèces
        </p>
      </div>
    </section>
  )
}
