import React from 'react'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import { Sparkles, Phone, WhatsAppBrand } from '@/components/ui/Icons'

export function CtaBookingSection() {
  const whatsappUrl = getWhatsAppBookingUrl()
  const phoneUrl = getPhoneCallUrl()

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#faf8f4] border-t border-amber-900/10">
      <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-br from-[#171512] via-[#0f0e0c] to-[#1f1a10] border border-amber-500/40 p-8 sm:p-12 text-center text-white shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/35">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{siteConfig.tagline}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Votre Rendez-Vous Beauté à{' '}
          <span className="text-amber-400 font-serif italic">{siteConfig.district}</span>
        </h2>

        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
          Maquillage cérémonie ou contouring, pose lace, tresses, Stream Pod ou conseils parfumerie : réservez votre créneau en un clic sur WhatsApp ou appelez directement le salon, ouvert tous les jours de 9h à 21h.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all min-h-[48px]"
            aria-label={`Réserver sur WhatsApp (${siteConfig.whatsappDisplay})`}
          >
            <WhatsAppBrand className="w-4.5 h-4.5 text-white" />
            <span>WhatsApp : {siteConfig.whatsappDisplay}</span>
          </a>

          <a
            href={phoneUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-amber-500 hover:bg-amber-400 text-[#0f0e0c] shadow-lg active:scale-95 transition-all min-h-[48px]"
            aria-label={`Appeler le salon au ${siteConfig.phone}`}
          >
            <Phone className="w-4 h-4 text-[#0f0e0c]" />
            <span>Appeler le {siteConfig.phone}</span>
          </a>
        </div>

        <p className="text-[12px] text-amber-200/80 pt-2">
          {siteConfig.fullAddress} • Paiements : {siteConfig.payments.join(' • ')}
        </p>
      </div>
    </section>
  )
}
