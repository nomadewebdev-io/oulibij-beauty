import React from 'react'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import { MapPin, Clock, Phone, ExternalLink, WhatsAppBrand } from '@/components/ui/Icons'

export function HoursAndLocationSection() {
  const whatsappUrl = getWhatsAppBookingUrl()
  const phoneUrl = getPhoneCallUrl()

  return (
    <section id="localisation" className="py-20 px-4 sm:px-8 lg:px-12 border-t border-amber-900/10 bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf9f0] border border-amber-600/30 text-amber-800 text-xs font-bold tracking-wider uppercase">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>Accès Direct • {siteConfig.district}, {siteConfig.city}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0e0c] tracking-tight">
                Nous Trouver à {siteConfig.district}
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Le salon <strong className="text-[#0f0e0c]">{siteConfig.brandName}</strong> est idéalement situé à{' '}
                <strong className="text-[#0f0e0c]">{siteConfig.fullAddress}</strong>, ouvert sans interruption toute la semaine.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#faf8f4] border border-amber-900/15 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Adresse Exacte</span>
                </div>
                <p className="text-sm font-bold text-[#0f0e0c]">{siteConfig.address}</p>
                <p className="text-xs text-stone-600">
                  {siteConfig.district}, {siteConfig.city} — {siteConfig.country}
                </p>
                <a
                  href={siteConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline pt-1 min-h-[32px]"
                >
                  <span>Ouvrir l&apos;itinéraire Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f4] border border-amber-900/15 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Téléphone &amp; WhatsApp</span>
                </div>
                <p className="text-base font-black text-[#0f0e0c]">{siteConfig.phone}</p>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <a
                    href={phoneUrl}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 transition-colors min-h-[38px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Appeler</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors min-h-[38px]"
                  >
                    <WhatsAppBrand className="w-3.5 h-3.5 text-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-stone-600">
              <span className="font-bold text-[#0f0e0c]">Paiements acceptés :</span>
              {siteConfig.payments.map((paymentMethod, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#fdf9f0] text-stone-800 font-semibold border border-amber-600/25"
                >
                  {paymentMethod}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full bg-[#0f0e0c] text-white border border-amber-500/40 rounded-3xl p-7 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Horaires d&apos;Ouverture</h3>
                  <p className="text-xs text-amber-400 font-semibold">Ouvert 7j/7 — Avec ou sans RDV</p>
                </div>
              </div>

              <ul className="space-y-3">
                {siteConfig.openingHours.map((slot, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2.5 border-b border-stone-800/80 text-xs sm:text-sm"
                  >
                    <span className="font-medium text-stone-300">{slot.day}</span>
                    <span className="font-bold text-amber-300 bg-stone-900 px-3.5 py-1 rounded-full border border-amber-500/30">
                      {slot.hours}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all min-h-[48px]"
                  aria-label="Bloquer un créneau sur WhatsApp"
                >
                  <WhatsAppBrand className="w-4 h-4 text-white shrink-0" />
                  <span>Réserver sur WhatsApp</span>
                </a>
                <a
                  href={phoneUrl}
                  className="py-3.5 px-5 rounded-full text-xs sm:text-sm font-bold text-amber-300 bg-stone-900 hover:bg-stone-800 border border-amber-500/40 flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px]"
                  aria-label={`Appeler le ${siteConfig.phone}`}
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden border border-amber-900/15 shadow-md bg-[#faf8f4]">
          <div className="px-5 py-3.5 bg-[#faf8f4] border-b border-amber-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0f0e0c]">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{siteConfig.fullAddress}</span>
            </div>
            <a
              href={siteConfig.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-[#0f0e0c] transition-colors"
            >
              <span>Agrandir sur Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="relative w-full h-[300px] sm:h-[360px]">
            <iframe
              title={`Carte Google Maps — ${siteConfig.brandName} à ${siteConfig.district}, ${siteConfig.city}`}
              src={siteConfig.googleMapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
