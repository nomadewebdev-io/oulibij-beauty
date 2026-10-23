import React from 'react'
import { getSalon } from '@/lib/actions/salon'
import { ContactForm } from '@/components/contact/ContactForm'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'
import { MapPin, Phone, Mail, Clock, ExternalLink, Sparkles, WhatsApp } from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Contact & Accès | ${siteConfig.name}`,
  description: `Coordonnées, horaires d'ouverture et adresse du salon ${siteConfig.name} à ${siteConfig.district}, ${siteConfig.city}. Contactez notre équipe ou réservez sur WhatsApp.`,
}

export default async function ContactPage() {
  const salon = await getSalon()

  const salonNom = salon?.nom || siteConfig.brandName
  const adresse = salon?.adresse || siteConfig.address
  const ville = salon?.ville || siteConfig.city
  const telephone = salon?.telephone || siteConfig.phone
  const email = salon?.email || siteConfig.email
  const fullAddress = `${adresse}, ${siteConfig.district}, ${ville}`
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${salonNom} ${fullAddress}`)}`

  // Opening hours processing
  const rawHours = salon?.horaires_ouverture as Record<string, { ouvert: boolean; debut: string | null; fin: string | null }> | null

  const daysMapping: Record<string, string> = {
    lundi: 'Lundi',
    mardi: 'Mardi',
    mercredi: 'Mercredi',
    jeudi: 'Jeudi',
    vendredi: 'Vendredi',
    samedi: 'Samedi',
    dimanche: 'Dimanche',
  }

  const hoursList = rawHours
    ? Object.entries(rawHours).map(([key, val]) => ({
        day: daysMapping[key.toLowerCase()] || key,
        hours: val.ouvert && val.debut && val.fin ? `${val.debut} - ${val.fin}` : 'Fermé',
        isOpen: val.ouvert,
      }))
    : siteConfig.openingHours.map((h) => ({
        day: h.day,
        hours: h.hours,
        isOpen: h.isOpen,
      }))

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-transparent space-y-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Contact & Accès</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight font-serif italic">
            Nous Contacter & Nous Trouver
          </h1>
          <p className="mt-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
            Une question sur un soin, une envie de changement capillaire ou une demande de devis sur-mesure ? Écrivez-nous ou rendez-nous visite au salon à {siteConfig.district}.
          </p>
        </div>

        {/* 2-Column Layout: Salon Details / Map & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates & Hours & Maps (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Coordinates Card */}
            <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 font-serif italic">
                  Coordonnées du Salon
                </h2>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  {salonNom}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Address */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100/80 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Adresse</h3>
                    <p className="text-sm font-semibold text-zinc-900 mt-0.5 leading-snug">
                      {adresse}
                    </p>
                    <p className="text-xs text-zinc-600">
                      {siteConfig.district}, {ville}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100/80 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Téléphone</h3>
                    <a
                      href={`tel:${telephone.replace(/\s+/g, '')}`}
                      className="text-sm font-bold text-rose-700 hover:text-rose-800 transition-colors block mt-0.5"
                    >
                      {telephone}
                    </a>
                    <p className="text-[11px] text-zinc-500">Appel direct salon</p>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100/80 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">E-mail</h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-zinc-900 hover:text-rose-700 transition-colors block mt-0.5 truncate max-w-[200px]"
                    >
                      {email}
                    </a>
                    <p className="text-[11px] text-zinc-500">Réponse sous 24h</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                    <WhatsApp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">WhatsApp</h3>
                    <a
                      href={getWhatsAppBookingUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors block mt-0.5"
                    >
                      {siteConfig.whatsappDisplay}
                    </a>
                    <p className="text-[11px] text-zinc-500">Discussion &amp; Réservation instantanée</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 font-serif italic">
                  Horaires d&apos;Ouverture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {hoursList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-rose-50/40 border border-rose-100/60 text-xs"
                  >
                    <span className="font-semibold text-zinc-700">{item.day}</span>
                    <span
                      className={`font-medium ${
                        item.isOpen ? 'text-zinc-900 font-bold' : 'text-zinc-400 italic'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps Card */}
            <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-950 font-serif italic">
                      Plan & Accès au Salon
                    </h2>
                    <p className="text-xs text-zinc-500">{fullAddress}</p>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 transition-all shadow-sm self-start sm:self-auto min-h-[40px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ouvrir Google Maps</span>
                </a>
              </div>

              {/* Map visual card */}
              <div className="relative rounded-2xl overflow-hidden border border-rose-100 aspect-[16/9] bg-gradient-to-br from-rose-100 via-rose-50 to-pink-100 flex flex-col items-center justify-center p-6 text-center shadow-inner">
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 mb-3 animate-float">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900">{salonNom}</h3>
                <p className="text-xs text-zinc-600 max-w-sm mt-1 mb-4">
                  {fullAddress} • {siteConfig.landmarks}
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-rose-700 bg-white border border-rose-200 shadow-sm hover:bg-rose-50 hover:scale-105 transition-all min-h-[36px]"
                >
                  <span>Calculer mon itinéraire</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <ContactForm salonId={salon?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
