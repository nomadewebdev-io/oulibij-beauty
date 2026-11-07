import React from 'react'
import Link from 'next/link'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import { WhatsAppBrand, Phone, ArrowLeft, CheckCircle2 } from '@/components/ui/Icons'

export const metadata = {
  title: 'Réservation Directe Sans Compte',
  description: `Prenez rendez-vous directement par WhatsApp ou téléphone chez ${siteConfig.brandName} à ${siteConfig.district}, ${siteConfig.city}.`,
}

export default function LoginPage() {
  const whatsappUrl = getWhatsAppBookingUrl()
  const phoneUrl = getPhoneCallUrl()

  return (
    <div className="py-16 sm:py-24 px-4 flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-8 sm:p-10 shadow-lg space-y-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-sm">
          <WhatsAppBrand className="w-7 h-7 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#0f0e0c]">Réservation Directe</h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Chez <strong className="text-[#0f0e0c]">{siteConfig.brandName}</strong>, aucun mot de passe n&apos;est requis : réservez directement sur WhatsApp ou par téléphone au{' '}
            <strong className="text-[#0f0e0c]">{siteConfig.phone}</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-amber-900/15 text-left space-y-2 text-xs text-stone-700">
          <div className="flex items-center gap-2 font-bold text-[#0f0e0c]">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Accueil 7j/7 à {siteConfig.district} :</span>
          </div>
          <ul className="space-y-1.5 pl-6 list-disc text-stone-600 text-[11px]">
            <li>{siteConfig.fullAddress}</li>
            <li>Ouvert du lundi au dimanche, de 9h à 21h</li>
            <li>Maquillage, coiffure, pose lace, Stream Pod &amp; parfumerie</li>
          </ul>
        </div>

        <div className="pt-2 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px]"
          >
            <WhatsAppBrand className="w-4 h-4 text-white" />
            <span>Réserver sur WhatsApp</span>
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
            <span>Retourner à l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
