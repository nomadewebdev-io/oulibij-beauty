import React from 'react'
import Link from 'next/link'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'
import { WhatsApp, ArrowLeft, CheckCircle2 } from '@/components/ui/Icons'

export const metadata = {
  title: `Inscription Directe | ${siteConfig.name}`,
}

export default function RegisterPage() {
  const whatsappUrl = getWhatsAppBookingUrl()

  return (
    <div className="py-16 sm:py-24 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-rose-100 rounded-3xl p-8 sm:p-10 shadow-md shadow-rose-950/5 space-y-6 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <WhatsApp className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-zinc-950">Inscription Directe</h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Pas de formulaire à rallonge : chez <strong className="text-zinc-900">{siteConfig.name}</strong>, tout se passe directement par WhatsApp. Envoyez-nous un simple message pour être prise en charge.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-left space-y-2 text-xs text-zinc-700">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Votre salon de coiffure à {siteConfig.district} :</span>
          </div>
          <p className="text-[11px] text-zinc-600">
            Coupes &amp; brushings, tresses d&apos;art (knotless braids), soins botox &amp; kératine, balayages et mise en beauté mariée.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all min-h-[48px]"
          >
            <WhatsApp className="w-4 h-4 text-white" />
            <span>Échanger sur WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full py-3 rounded-full text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center gap-2 transition-all min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Découvrir l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
