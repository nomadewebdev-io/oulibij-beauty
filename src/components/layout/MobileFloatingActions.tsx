'use client'

import React from 'react'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import { Phone, WhatsAppBrand } from '@/components/ui/Icons'

export function MobileFloatingActions() {
  const whatsappUrl = getWhatsAppBookingUrl()
  const phoneUrl = getPhoneCallUrl()

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 lg:hidden"
      role="region"
      aria-label="Actions rapides appel et WhatsApp"
    >
      <a
        href={phoneUrl}
        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] border border-amber-400/70 shadow-xl shadow-black/30 active:scale-95 transition-transform min-h-[48px] min-w-[48px]"
        aria-label={`Appeler ${siteConfig.brandName} au ${siteConfig.phone}`}
      >
        <Phone className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Appeler</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-4.5 py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 shadow-xl shadow-emerald-950/30 active:scale-95 transition-transform min-h-[48px]"
        aria-label={`Contacter ${siteConfig.brandName} sur WhatsApp (${siteConfig.whatsappDisplay})`}
      >
        <WhatsAppBrand className="w-4.5 h-4.5 text-white shrink-0" />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}

