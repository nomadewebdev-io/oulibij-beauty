import React from 'react'
import { SALON_INFO, getWhatsAppBookingUrl } from '@/lib/constants'
import { MapPin, Clock, Phone, WhatsApp, Sparkles, CheckCircle2 } from '@/components/ui/Icons'

export function HoursAndLocationSection() {
  const whatsappUrl = getWhatsAppBookingUrl()

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 border-t border-rose-100/70 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Address & Salon Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wider uppercase">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Nous Trouver aux Almadies</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Un Écrin de Beauté Dédié à Votre Chevelure
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Situé au cœur des Almadies à Dakar, le salon <strong className="text-zinc-900">{SALON_INFO.name}</strong> vous accueille dans un cadre intime, climatisé et élégant.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Adresse</span>
                </div>
                <p className="text-sm font-semibold text-zinc-900">{SALON_INFO.address}</p>
                <p className="text-xs text-zinc-500">{SALON_INFO.district}, {SALON_INFO.city} — {SALON_INFO.country}</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  <WhatsApp className="w-4 h-4" />
                  <span>Réservations WhatsApp</span>
                </div>
                <p className="text-sm font-semibold text-zinc-900">{SALON_INFO.whatsapp}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                >
                  Envoyer un message →
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-500">
              <span className="font-bold text-zinc-900">Paiements mobiles acceptés :</span>
              {SALON_INFO.payments.map((p, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-semibold border border-zinc-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Hours Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-rose-50 via-pink-50/40 to-rose-50/80 border border-rose-200 rounded-3xl p-7 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-rose-200/80">
                <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-950">Horaires d'Ouverture</h3>
                  <p className="text-xs text-zinc-500">Accueil avec ou sans rendez-vous</p>
                </div>
              </div>

              <ul className="space-y-3">
                {SALON_INFO.openingHours.map((slot, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-rose-100/80 text-xs sm:text-sm"
                  >
                    <span className="font-medium text-zinc-600">{slot.day}</span>
                    <span className="font-bold text-zinc-900 bg-white px-3 py-1 rounded-full border border-rose-100 shadow-2xs">
                      {slot.hours}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <WhatsApp className="w-4 h-4 text-white" />
                  <span>Bloquer un créneau sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
