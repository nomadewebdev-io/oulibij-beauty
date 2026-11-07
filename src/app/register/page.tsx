import React from 'react'
import Link from 'next/link'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import { WhatsAppBrand, Phone, ArrowLeft, CheckCircle2 } from '@/components/ui/Icons'

export const metadata = {
  title: 'Prise de Contact Directe',
}

export default function RegisterPage() {
  const whatsappUrl = getWhatsAppBookingUrl()
  const phoneUrl = getPhoneCallUrl()

  return (
    <div className="py-16 sm:py-24 px-4 flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-8 sm:p-10 shadow-lg space-y-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#0f0e0c] border border-amber-500/40 flex items-center justify-center mx-auto shadow-sm">
          <WhatsAppBrand className="w-7 h-7 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#0f0e0c]">Prise en Charge Directe</h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Pas d&apos;inscription nécessaire : chez <strong className="text-[#0f0e0c]">{siteConfig.brandName}</strong>, écrivez-nous sur WhatsApp ou appelez directement le salon.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-amber-900/15 text-left space-y-2 text-xs text-stone-700">
          <div className="flex items-center gap-2 font-bold text-[#0f0e0c]">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{siteConfig.brandName} — {siteConfig.district} :</span>
          </div>
          <p className="text-[11px] text-stone-600">
            Maquillage (cérémonie, simple, contouring), coiffure (tissage, tresse, bouclage, pose lace, Stream Pod, teinture, soins) et boutique cosmétiques, parfumerie &amp; accessoires.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px]"
          >
            <WhatsAppBrand className="w-4 h-4 text-white" />
            <span>Échanger sur WhatsApp</span>
          </a>

          <a
            href={phoneUrl}
            className="w-full py-3 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 flex items-center justify-center gap-2 transition-all min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Appeler le {siteConfig.phone}</span>
          </a>

          <Link
            href="/"
            className="w-full py-3 rounded-full text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-amber-900/15 flex items-center justify-center gap-2 transition-all min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Découvrir l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
