'use client'

import React, { useState, useMemo } from 'react'
import { Service, Staff } from '@/types'
import { SALON_INFO, WHATSAPP_PHONE, WHATSAPP_DISPLAY, getWhatsAppBookingUrl } from '@/lib/constants'
import { formatCurrency, formatDuration } from '@/lib/utils'
import {
  Scissors,
  Sparkles,
  Clock,
  CheckCircle2,
  WhatsApp,
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

  // Construct WhatsApp pre-filled message
  const generatedWhatsAppUrl = useMemo(() => {
    let msg = `Bonjour, je souhaite réserver : ${selectedService?.nom || 'une prestation'}`
    if (selectedStaff) {
      msg += ` avec ${selectedStaff.prenom} ${selectedStaff.nom}`
    }
    if (notes.trim()) {
      msg += ` (Détails : ${notes.trim()})`
    }
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`
  }, [selectedService, selectedStaff, notes])

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* WhatsApp Fast Reassurance Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 border border-emerald-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25">
            <WhatsApp className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950">
              Réservation Directe & Sans Attente sur WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
              Échangez directement avec notre salon aux Almadies ({WHATSAPP_DISPLAY}). Confirmation rapide 7j/7.
            </p>
          </div>
        </div>

        <a
          href={generatedWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <WhatsApp className="w-4 h-4 text-white" />
          <span>Ouvrir WhatsApp</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step 1 & 2: Service and Staff Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Scissors className="w-4 h-4" />
                <span>1. Choisissez votre prestation</span>
              </div>
              <h2 className="text-xl font-bold text-zinc-950">
                Quelle prestation souhaitez-vous réserver ?
              </h2>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {initialServices.map((service) => {
                const isSelected = service.id === selectedServiceId
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/60 shadow-sm'
                        : 'border-zinc-200/80 hover:border-rose-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900">{service.nom}</span>
                        {service.necessite_essai && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            Essai
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 line-clamp-1">{service.description}</p>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <Clock className="w-3 h-3 text-rose-400" />
                        <span>{formatDuration(service.duree_minutes)}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-black text-zinc-950">
                        {formatCurrency(Number(service.prix))}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Optional Staff Choice */}
          <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>2. Styliste préférée (optionnel)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedStaffId('')}
                className={`p-3 rounded-2xl border text-center transition-all text-xs font-medium cursor-pointer ${
                  selectedStaffId === ''
                    ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold'
                    : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                Sans préférence
              </button>
              {initialStaff.map((st) => {
                const isSelected = st.id === selectedStaffId
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStaffId(st.id)}
                    className={`p-3 rounded-2xl border text-center transition-all text-xs cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="font-bold">{st.prenom}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{st.specialite?.split('&')[0]}</div>
                  </button>
                )
              })}
            </div>

            {/* Notes / Souhaits */}
            <div className="pt-2">
              <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                Précisions ou questions (optionnel) :
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: longueur des mèches, date souhaitée, type de cheveu..."
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-xs text-zinc-900 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Recap & Big CTA Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-rose-200 rounded-3xl p-6 sm:p-7 shadow-lg space-y-6 sticky top-24">
            <div className="flex items-center gap-2 pb-4 border-b border-rose-100">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <h3 className="text-base font-bold text-zinc-950">Récapitulatif de votre séance</h3>
            </div>

            {selectedService ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">{selectedService.nom}</h4>
                    <p className="text-xs text-rose-600">{selectedService.categorie}</p>
                  </div>
                  <span className="text-lg font-black text-zinc-950">
                    {formatCurrency(Number(selectedService.prix))}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 py-2 border-y border-rose-50">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    Durée estimée :
                  </span>
                  <span className="font-semibold text-zinc-800">
                    {formatDuration(selectedService.duree_minutes)}
                  </span>
                </div>

                {selectedStaff && (
                  <div className="flex items-center justify-between text-xs text-zinc-500 py-1">
                    <span>Praticienne :</span>
                    <span className="font-semibold text-zinc-800">
                      {selectedStaff.prenom} {selectedStaff.nom}
                    </span>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{SALON_INFO.name} aux Almadies</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">{SALON_INFO.address}, Dakar</p>
                  <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                    Paiements : {SALON_INFO.payments.join(' • ')}
                  </p>
                </div>

                {/* Primary Button: WhatsApp */}
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <WhatsApp className="w-5 h-5 text-white" />
                  <span>Réserver sur WhatsApp</span>
                </a>

                {/* Direct Phone Backup */}
                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="w-full py-2.5 rounded-full text-xs font-bold text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Préférer un appel ({SALON_INFO.phone})</span>
                </a>

                <div className="space-y-1.5 pt-2 text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aucun paiement demandé en ligne</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Confirmation immédiate par WhatsApp</span>
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
