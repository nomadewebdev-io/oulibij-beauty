'use client'

import React, { useState } from 'react'
import { Service, Staff } from '@/types'
import { SALON_INFO, TIME_SLOTS } from '@/lib/constants'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { createAppointmentAction } from '@/lib/actions/booking'
import {
  Scissors,
  User,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Mail,
  FileText,
} from '@/components/ui/Icons'

const DEFAULT_SERVICES: Service[] = [
  {
    id: 's1',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Coupe & Brushing Signature',
    description: 'Shampoing traitant, coupe sur-mesure et brushing haute tenue.',
    categorie: 'Coupe & Coiffage',
    duree_minutes: 50,
    prix: 65,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's2',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Tresses & Braids Artistiques',
    description: 'Box braids knotless, nattes collées ou vanilles soignées.',
    categorie: 'Tresses & Braids',
    duree_minutes: 120,
    prix: 110,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's3',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Balayage & Nuance Lumineuse',
    description: 'Éclaircissement fondu sur-mesure, patine gloss et soin réparateur.',
    categorie: 'Coloration & Balayage',
    duree_minutes: 90,
    prix: 135,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's4',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Soin Botox Capillaire & Kératine',
    description: 'Traitement réparateur profond et brillance miroir intense.',
    categorie: 'Soins & Traitements',
    duree_minutes: 75,
    prix: 95,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 's5',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Lissage Brésilien Organique',
    description: 'Lissage soyeux enrichi en acides aminés sans formol.',
    categorie: 'Lissages & Détente',
    duree_minutes: 150,
    prix: 180,
    image_url: null,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
]

const DEFAULT_STAFF: Staff[] = [
  {
    id: 'st1',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Diallo',
    prenom: 'Aminata',
    specialite: 'Master Styliste & Coloriste',
    bio: 'Experte coloration & coupe sur-mesure.',
    avatar_url: null,
    email: '',
    telephone: '',
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'st2',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Koffi',
    prenom: 'Yannick',
    specialite: 'Expert Tresses & Cheveux Texturés',
    bio: 'Spécialiste tresses créatives et textures afros.',
    avatar_url: null,
    email: '',
    telephone: '',
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'st3',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Laurent',
    prenom: 'Chloé',
    specialite: 'Styliste Soins & Lissages',
    bio: 'Précision coupe, lissages et soins profonds.',
    avatar_url: null,
    email: '',
    telephone: '',
    is_active: true,
    created_at: '',
    updated_at: '',
  },
]

interface BookingWizardProps {
  initialServices?: Service[]
  initialStaff?: Staff[]
  preselectedServiceId?: string
  preselectedStaffId?: string
}

export function BookingWizard({
  initialServices,
  initialStaff,
  preselectedServiceId,
  preselectedStaffId,
}: BookingWizardProps) {
  const services = (initialServices && initialServices.length > 0) ? initialServices : DEFAULT_SERVICES
  const staffList = (initialStaff && initialStaff.length > 0) ? initialStaff : DEFAULT_STAFF

  const [step, setStep] = useState<number>(1)
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceId || '')
  const [selectedStaffId, setSelectedStaffId] = useState<string>(preselectedStaffId || '')

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr)
  const [selectedTime, setSelectedTime] = useState<string>('')

  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [notes, setNotes] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [confirmationData, setConfirmationData] = useState<{
    appointmentId?: string
    service?: Service
    staffName?: string
    date: string
    time: string
  } | null>(null)

  const selectedService = services.find((s) => s.id === selectedServiceId)
  const selectedStaff = staffList.find((st) => st.id === selectedStaffId)

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedServiceId || !selectedDate || !selectedTime || !clientName || !clientEmail || !clientPhone) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await createAppointmentAction({
        salonId: SALON_INFO.id,
        serviceId: selectedServiceId,
        staffId: selectedStaffId || undefined,
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientEmail,
        clientPhone,
        notes,
      })

      if (res.success) {
        setConfirmationData({
          appointmentId: res.appointmentId,
          service: selectedService,
          staffName: selectedStaff ? `${selectedStaff.prenom} ${selectedStaff.nom}` : 'Premier disponible',
          date: selectedDate,
          time: selectedTime,
        })
        setStep(5)
      } else {
        setErrorMessage(res.message || 'Erreur lors de la réservation.')
      }
    } catch {
      setErrorMessage('Une erreur est survenue lors de la communication avec le serveur.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-rose-100 rounded-3xl p-6 sm:p-10 shadow-xl relative">
      {/* Step Indicator */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 text-xs font-semibold text-zinc-400">
            <span className={step >= 1 ? 'text-pink-600 font-bold' : ''}>1. Prestation</span>
            <ChevronRight className="w-4 h-4 text-rose-200" />
            <span className={step >= 2 ? 'text-pink-600 font-bold' : ''}>2. Coiffeuse</span>
            <ChevronRight className="w-4 h-4 text-rose-200" />
            <span className={step >= 3 ? 'text-pink-600 font-bold' : ''}>3. Date & Heure</span>
            <ChevronRight className="w-4 h-4 text-rose-200" />
            <span className={step >= 4 ? 'text-pink-600 font-bold' : ''}>4. Vos Coordonnées</span>
          </div>
          <div className="w-full bg-rose-50 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: SERVICE */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950 mb-2 flex items-center gap-2">
              <Scissors className="w-6 h-6 text-pink-500" />
              Choisissez votre prestation
            </h2>
            <p className="text-sm text-zinc-500">
              Sélectionnez le soin ou la coiffure souhaitée.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => {
              const isSelected = selectedServiceId === service.id
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-pink-50/70 border-pink-500 shadow-md shadow-pink-500/10'
                      : 'bg-white border-rose-100 hover:border-pink-300 hover:bg-rose-50/30'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
                      {service.categorie}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-950">{service.nom}</h3>
                    <p className="text-xs text-zinc-500">{service.description}</p>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                      <Clock className="w-3.5 h-3.5 text-pink-500" />
                      <span>{formatDuration(service.duree_minutes)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0">
                    <span className="text-xl font-black text-zinc-950">
                      {formatCurrency(Number(service.prix))}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-pink-500 bg-pink-500 text-white'
                          : 'border-zinc-300 bg-zinc-50'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-6 flex justify-end">
            <button
              disabled={!selectedServiceId}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 disabled:opacity-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Continuer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: STYLIST */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950 mb-2 flex items-center gap-2">
              <User className="w-6 h-6 text-pink-500" />
              Choisissez votre coiffeuse
            </h2>
            <p className="text-sm text-zinc-500">
              Optez pour une spécialiste ou le premier créneau disponible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedStaffId('')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                selectedStaffId === ''
                  ? 'bg-pink-50/70 border-pink-500 shadow-md'
                  : 'bg-white border-rose-100 hover:border-pink-300'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950">Premier disponible</h3>
                <p className="text-xs text-zinc-500">Maximise les horaires possibles</p>
              </div>
            </div>

            {staffList.map((st) => {
              const isSelected = selectedStaffId === st.id
              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStaffId(st.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'bg-pink-50/70 border-pink-500 shadow-md'
                      : 'bg-white border-rose-100 hover:border-pink-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-300 text-white font-bold flex items-center justify-center shrink-0">
                    {st.prenom[0]}{st.nom[0]}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-950">{st.prenom} {st.nom}</h3>
                    <p className="text-xs text-pink-600 font-medium">{st.specialite}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Continuer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DATE & TIME */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950 mb-2 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-pink-500" />
              Date & Horaire
            </h2>
            <p className="text-sm text-zinc-500">
              Choisissez le moment idéal pour votre rendez-vous.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">Date souhaitée</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-80 px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 focus:outline-none focus:border-pink-500 text-sm shadow-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">Créneaux horaires disponibles</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md scale-105'
                        : 'bg-white border border-rose-100 text-zinc-700 hover:border-pink-300 hover:bg-rose-50'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-6 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>
            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md disabled:opacity-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Continuer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CLIENT DETAILS */}
      {step === 4 && (
        <form onSubmit={handleSubmitBooking} className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950 mb-2 flex items-center gap-2">
              <FileText className="w-6 h-6 text-pink-500" />
              Vos Coordonnées
            </h2>
            <p className="text-sm text-zinc-500">
              Renseignez vos informations pour recevoir la confirmation de votre rendez-vous.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="bg-pink-50/60 border border-rose-100 p-5 rounded-2xl space-y-1.5 text-xs text-zinc-700">
            <p className="font-bold text-pink-600 uppercase tracking-wider">Récapitulatif de votre séance</p>
            <p><strong>Prestation :</strong> {selectedService?.nom} ({formatDuration(selectedService?.duree_minutes || 0)})</p>
            <p><strong>Tarif :</strong> {formatCurrency(Number(selectedService?.prix || 0))}</p>
            <p><strong>Coiffeuse :</strong> {selectedStaff ? `${selectedStaff.prenom} ${selectedStaff.nom}` : 'Premier disponible'}</p>
            <p><strong>Date & Heure :</strong> {selectedDate} à {selectedTime}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-pink-500" />
                Nom complet *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Amina Touré"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-pink-500" />
                Téléphone portable *
              </label>
              <input
                type="tel"
                required
                placeholder="Ex: 06 12 34 56 78"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-pink-500" />
              Adresse e-mail *
            </label>
            <input
              type="email"
              required
              placeholder="Ex: amina@exemple.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-pink-500 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">
              Remarques éventuelles (optionnel)
            </label>
            <textarea
              rows={3}
              placeholder="Ex: Longueur de cheveux, sensibilité particulière, modèle de tresses..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-pink-500 text-sm resize-none"
            />
          </div>

          <div className="pt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Enregistrement...' : 'Confirmer le rendez-vous'}</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: CONFIRMATION */}
      {step === 5 && confirmationData && (
        <div className="text-center py-8 space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto border border-pink-200 shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-zinc-950">
              Réservation Confirmée !
            </h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Merci pour votre confiance. Votre séance a bien été réservée au salon {SALON_INFO.name}.
            </p>
          </div>

          <div className="bg-pink-50/50 border border-rose-100 p-6 rounded-3xl max-w-md mx-auto text-left space-y-2 text-sm text-zinc-800">
            {confirmationData.appointmentId && (
              <div className="text-xs text-zinc-400 font-mono">
                Réf : {confirmationData.appointmentId}
              </div>
            )}
            <p><strong>Prestation :</strong> {confirmationData.service?.nom}</p>
            <p><strong>Coiffeuse :</strong> {confirmationData.staffName}</p>
            <p><strong>Date :</strong> {confirmationData.date} à {confirmationData.time}</p>
            <p><strong>Montant :</strong> {formatCurrency(Number(confirmationData.service?.prix || 0))}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setStep(1)
                setSelectedTime('')
              }}
              className="px-6 py-3 rounded-full text-xs font-bold text-zinc-900 border border-zinc-900 hover:bg-zinc-950 hover:text-white transition-all"
            >
              Faire une autre réservation
            </button>
            <a
              href="/"
              className="px-8 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md hover:scale-105 transition-all"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
