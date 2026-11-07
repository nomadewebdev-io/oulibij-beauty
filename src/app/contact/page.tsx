import React from 'react'
import { getSalon } from '@/lib/actions/salon'
import { ContactForm } from '@/components/contact/ContactForm'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Sparkles,
  WhatsAppBrand,
} from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Contact, Horaires & Plan d’Accès',
  description: `Retrouvez ${siteConfig.brandName} à ${siteConfig.fullAddress}. Ouvert du lundi au dimanche de 9h à 21h. Téléphone et WhatsApp : ${siteConfig.phone}.`,
}

export default async function ContactPage() {
  const salon = await getSalon()
  const whatsappUrl = getWhatsAppBookingUrl()
  const phoneUrl = getPhoneCallUrl()

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-white space-y-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Contact &amp; Plan d&apos;Accès</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f0e0c] tracking-tight font-serif italic">
            Nous Contacter &amp; Venir au Salon
          </h1>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Rendez-nous visite à <strong className="text-[#0f0e0c]">{siteConfig.fullAddress}</strong>, appelez le{' '}
            <strong className="text-[#0f0e0c]">{siteConfig.phone}</strong> ou écrivez-nous directement sur WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0f0e0c] font-serif italic">
                  Coordonnées Officielles
                </h2>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-[#0f0e0c] px-3.5 py-1 rounded-full border border-amber-500/40">
                  {siteConfig.brandName}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2 p-4.5 rounded-2xl bg-white border border-amber-900/15 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0f0e0c] text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Adresse du Salon
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-[#0f0e0c] mt-0.5 leading-snug">
                      {siteConfig.address}
                    </p>
                    <p className="text-xs font-semibold text-amber-800 mt-0.5">
                      {siteConfig.district}, {siteConfig.city} — {siteConfig.country}
                    </p>
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-white border border-amber-900/15 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0f0e0c] text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Appel Direct
                    </h3>
                    <a
                      href={phoneUrl}
                      className="text-base font-black text-[#0f0e0c] hover:text-amber-800 transition-colors block mt-0.5"
                    >
                      {siteConfig.phone}
                    </a>
                    <p className="text-[11px] text-stone-500">Lundi au dimanche, 9h – 21h</p>
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <WhatsAppBrand className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      WhatsApp Direct
                    </h3>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-black text-emerald-700 hover:text-emerald-800 transition-colors block mt-0.5"
                    >
                      {siteConfig.whatsappDisplay}
                    </a>
                    <p className="text-[11px] text-emerald-800/80">
                      Message prérempli &amp; réponse rapide
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-5 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 transition-all min-h-[48px]"
                >
                  <WhatsAppBrand className="w-4 h-4 text-white" />
                  <span>Écrire sur WhatsApp</span>
                </a>
                <a
                  href={phoneUrl}
                  className="flex-1 py-3.5 px-5 rounded-full text-xs sm:text-sm font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 shadow-md flex items-center justify-center gap-2 transition-all min-h-[48px]"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Appeler le {siteConfig.phone}</span>
                </a>
              </div>
            </div>

            <div className="bg-[#0f0e0c] text-white border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-serif italic">
                      Horaires d&apos;Ouverture
                    </h2>
                    <p className="text-xs text-amber-400 font-semibold">
                      Ouvert tous les jours de la semaine (7j/7)
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {siteConfig.openingHours.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between p-4 rounded-2xl bg-stone-900/90 border border-stone-800 text-xs space-y-1"
                  >
                    <span className="font-semibold text-stone-400">{item.day}</span>
                    <span className="text-sm font-extrabold text-amber-300">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0f0e0c] font-serif italic">
                      Carte Google Maps
                    </h2>
                    <p className="text-xs text-stone-600">{siteConfig.fullAddress}</p>
                  </div>
                </div>

                <a
                  href={siteConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 transition-all shadow-sm self-start sm:self-auto min-h-[42px]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Itinéraire Google Maps</span>
                </a>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-amber-900/15 h-[320px] sm:h-[380px] bg-stone-100 shadow-inner">
                <iframe
                  title={`Localisation Google Maps — ${siteConfig.brandName} (${siteConfig.fullAddress})`}
                  src={siteConfig.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-28">
            <ContactForm salonId={salon?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
