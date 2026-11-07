'use client'

import React, { useState, useMemo } from 'react'
import { Service, Staff } from '@/types'
import { siteConfig, getPhoneCallUrl } from '@/config/site'
import { formatCurrency, formatDuration } from '@/lib/utils'
import {
  Scissors,
  Sparkles,
  Clock,
  CheckCircle2,
  WhatsAppBrand,
  Phone,
  User,
  MapPin,
} from '@/components/ui/Icons'

interface BookingWizardProps {
  initialServices: Service[]
  initialStaff: Staff[]
  preselectedServiceId?: string
  preselectedStaffId?: string
}

export function BookingWizard({
  initialServices,
  initialStaff,
  preselectedServiceId,
  preselectedStaffId,
}: BookingWizardProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || (initialServices[0]?.id ?? '')
  )
  const [selectedStaffId, setSelectedStaffId] = useState<string>(preselectedStaffId || '')
  const [notes, setNotes] = useState<string>('')

  const selectedService = useMemo(
    () => initialServices.find((s) => s.id === selectedServiceId) || initialServices[0],
    [initialServices, selectedServiceId]
  )

  const selectedStaff = useMemo(
    () => initialStaff.find((st) => st.id === selectedStaffId),
    [initialStaff, selectedStaffId]
  )

  const generatedWhatsAppUrl = useMemo(() => {
    let msg = `Bonjour ${siteConfig.brandName}, je souhaite réserver : ${selectedService?.nom || 'une prestation'}`
    if (selectedStaff) {
      msg += ` (${selectedStaff.prenom} ${selectedStaff.nom})`
    }
    if (notes.trim()) {
      msg += ` — Détails : ${notes.trim()}`
    }
    return `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(msg)}`
  }, [selectedService, selectedStaff, notes])

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0e0c] text-white border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <WhatsAppBrand className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Réservation Sans Attente sur WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
              Salon {siteConfig.brandName} à {siteConfig.district} ({siteConfig.whatsappDisplay}) — ouvert du lundi au dimanche de 9h à 21h.
            </p>
          </div>
        </div>

        <a
          href={generatedWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md active:scale-95 transition-all shrink-0 min-h-[44px]"
          aria-label={`Ouvrir WhatsApp pour réserver (${siteConfig.whatsappDisplay})`}
        >
          <WhatsAppBrand className="w-4 h-4 text-white" />
          <span>Ouvrir WhatsApp</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Scissors className="w-4 h-4 text-amber-700" />
                <span>1. Choisissez votre prestation</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f0e0c]">
                Quel service souhaitez-vous réserver ?
              </h3>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {initialServices.map((service) => {
                const isSelected = service.id === selectedServiceId
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-amber-600 bg-white shadow-md'
                        : 'border-amber-900/15 bg-white/70 hover:border-amber-500/50 hover:bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#0f0e0c]">{service.nom}</span>
                        <span className="text-[10px] font-bold text-amber-300 bg-[#0f0e0c] px-2 py-0.5 rounded-full">
                          {service.categorie}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-1">{service.description}</p>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <Clock className="w-3 h-3 text-amber-700" />
                        <span>{formatDuration(service.duree_minutes)}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-black text-[#0f0e0c]">
                        {formatCurrency(Number(service.prix), true)}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <User className="w-4 h-4 text-amber-700" />
              <span>2. Pôle concerné &amp; précisions (optionnel)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedStaffId('')}
                className={`p-3 rounded-2xl border text-center transition-all text-xs cursor-pointer min-h-[44px] ${
                  selectedStaffId === ''
                    ? 'border-amber-500 bg-[#0f0e0c] text-amber-300 font-bold'
                    : 'border-amber-900/15 bg-white text-stone-700 hover:bg-amber-50/40'
                }`}
              >
                Conseil général au salon
              </button>
              {initialStaff.map((st) => {
                const isSelected = st.id === selectedStaffId
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStaffId(st.id)}
                    className={`p-3 rounded-2xl border text-center transition-all text-xs cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'border-amber-500 bg-[#0f0e0c] text-amber-300 font-bold'
                        : 'border-amber-900/15 bg-white text-stone-700 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="font-bold">{st.prenom}</div>
                    <div className="text-[10px] opacity-80 truncate">{st.nom}</div>
                  </button>
                )
              })}
            </div>

            <div className="pt-2">
              <label htmlFor="booking-notes" className="text-xs font-bold text-[#0f0e0c] block mb-1.5">
                Date, heure souhaitée ou précisions :
              </label>
              <input
                id="booking-notes"
                name="bookingNotes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex : Samedi à 15h, maquillage cérémonie + pose lace..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-amber-900/15 text-xs text-[#0f0e0c] focus:outline-none focus:border-amber-600 min-h-[44px]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-amber-600/35 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 sticky top-24">
            <div className="flex items-center gap-2 pb-4 border-b border-amber-900/10">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-bold text-[#0f0e0c]">Récapitulatif</h3>
            </div>

            {selectedService ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#0f0e0c]">{selectedService.nom}</h4>
                    <p className="text-xs font-semibold text-amber-800">{selectedService.categorie}</p>
                  </div>
                  <span className="text-base font-black text-[#0f0e0c] shrink-0">
                    {formatCurrency(Number(selectedService.prix), true)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 py-2.5 border-y border-amber-900/10">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    Durée / Disponibilité :
                  </span>
                  <span className="font-bold text-[#0f0e0c]">
                    {formatDuration(selectedService.duree_minutes)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf8f4] border border-amber-900/15 text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#0f0e0c]">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{siteConfig.brandName} — {siteConfig.district}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">{siteConfig.fullAddress}</p>
                  <p className="text-[11px] text-amber-900 font-bold pt-1">
                    Paiements : {siteConfig.payments.join(' • ')}
                  </p>
                </div>

                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer min-h-[48px]"
                  aria-label={`Réserver sur WhatsApp avec ${siteConfig.brandName}`}
                >
                  <WhatsAppBrand className="w-5 h-5 text-white" />
                  <span>Confirmer sur WhatsApp</span>
                </a>

                <a
                  href={getPhoneCallUrl()}
                  className="w-full py-3 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 flex items-center justify-center gap-2 transition-all min-h-[44px]"
                  aria-label={`Appeler le salon au ${siteConfig.phone}`}
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Appeler le {siteConfig.phone}</span>
                </a>

                <div className="space-y-1.5 pt-1 text-[11px] text-stone-600">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aucun prépaiement exigé sur le site</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Ouvert du lundi au dimanche, 9h – 21h</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
