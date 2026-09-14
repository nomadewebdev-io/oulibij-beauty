'use client'

import React, { useState } from 'react'
import { Service, Staff } from '@/types'
import { SALON_INFO, TIME_SLOTS } from '@/lib/constants'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
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

// Default fallback lists if DB is not populated yet
const DEFAULT_SERVICES: Service[] = [
  {
    id: 's1',
    salon_id: '00000000-0000-0000-0000-000000000001',
    nom: 'Coupe & Coiffage Signature',
    description: 'Shampoing traitant, coupe personnalisée et brushing haute tenue.',
    categorie: 'Coiffure & Coupe',
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
    description: 'Box braids, knotless ou vanilles géométriques soignées.',
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
    description: 'Éclaircissement sur-mesure, patine gloss et soin régénérant.',
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
    description: 'Traitement réparateur profond et brillance miroir.',
    categorie: 'Soins Profonds',
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
    nom: 'Coupe Homme & Barbe Prestige',
    description: 'Dégradé américain, rasage traditionnel et serviette chaude.',
    categorie: 'Homme & Barbe',
    duree_minutes: 45,
    prix: 45,
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
    specialite: 'Styliste Visagiste & Barbière',
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
  
  // Date selection: default to tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr)
  const [selectedTime, setSelectedTime] = useState<string>('')

  // Client Details
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [notes, setNotes] = useState('')

  // Submission State
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

  // Handle Form Submission
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
    <div className="max-w-4xl mx-auto bg-zinc-950/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
      {/* Step Indicator */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 text-xs font-semibold text-zinc-400">
            <span className={step >= 1 ? 'text-amber-400' : ''}>1. Prestation</span>
            <ChevronRight className="w-4 h-4 text-zinc-700" />
            <span className={step >= 2 ? 'text-amber-400' : ''}>2. Coiffeur</span>
            <ChevronRight className="w-4 h-4 text-zinc-700" />
            <span className={step >= 3 ? 'text-amber-400' : ''}>3. Date & Heure</span>
            <ChevronRight className="w-4 h-4 text-zinc-700" />
            <span className={step >= 4 ? 'text-amber-400' : ''}>4. Vos Coordonnées</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: SERVICE SELECTION */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <Scissors className="w-6 h-6 text-amber-400" />
              Choisissez votre prestation
            </h2>
            <p className="text-sm text-zinc-400">
              Sélectionnez le soin ou la coupe adaptée à vos envies du moment.
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
                      ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {service.categorie}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{service.nom}</h3>
                    <p className="text-xs text-zinc-400">{service.description}</p>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{formatDuration(service.duree_minutes)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0">
                    <span className="text-xl font-black text-zinc-100">
                      {formatCurrency(Number(service.prix))}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400 text-zinc-950'
                          : 'border-zinc-700 bg-zinc-800'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4 fill-amber-400 text-zinc-950" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-6 flex justify-end">
            <Button
              variant="gold"
              size="md"
              disabled={!selectedServiceId}
              onClick={() => setStep(2)}
              className="gap-2"
            >
              <span>Continuer</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: STYLIST SELECTION */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <User className="w-6 h-6 text-amber-400" />
              Choisissez votre coiffeur / styliste
            </h2>
            <p className="text-sm text-zinc-400">
              Optez pour votre expert habituel ou laissez-nous vous attribuer le premier professionnel disponible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Any Available Option */}
            <div
              onClick={() => setSelectedStaffId('')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                selectedStaffId === ''
                  ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/10'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-100">Premier disponible</h3>
                <p className="text-xs text-zinc-400">Optimise les créneaux horaires disponibles</p>
              </div>
            </div>

            {/* Individual Staff */}
            {staffList.map((st) => {
              const isSelected = selectedStaffId === st.id
              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStaffId(st.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-zinc-950 font-bold flex items-center justify-center shrink-0">
                    {st.prenom[0]}{st.nom[0]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-100">{st.prenom} {st.nom}</h3>
                    <p className="text-xs text-amber-400">{st.specialite}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-6 flex justify-between">
            <Button variant="ghost" size="md" onClick={() => setStep(1)} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span>Retour</span>
            </Button>
            <Button variant="gold" size="md" onClick={() => setStep(3)} className="gap-2">
              <span>Continuer</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: DATE & TIME SLOT SELECTION */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-amber-400" />
              Choisissez la date et l'horaire
            </h2>
            <p className="text-sm text-zinc-400">
              Sélectionnez le jour souhaité puis l'horaire qui vous convient le mieux.
            </p>
          </div>

          {/* Date Picker Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-300">Date du rendez-vous</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-80 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Time Slots Grid */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-300">Créneaux horaires disponibles</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20 scale-105'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/50 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-6 flex justify-between">
            <Button variant="ghost" size="md" onClick={() => setStep(2)} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span>Retour</span>
            </Button>
            <Button
              variant="gold"
              size="md"
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(4)}
              className="gap-2"
            >
              <span>Continuer</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: CLIENT CONTACT INFORMATION */}
      {step === 4 && (
        <form onSubmit={handleSubmitBooking} className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <FileText className="w-6 h-6 text-amber-400" />
              Informations & Confirmation
            </h2>
            <p className="text-sm text-zinc-400">
              Renseignez vos coordonnées afin de recevoir votre confirmation et rappel de rendez-vous.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Booking Summary Box */}
          <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-amber-400 font-bold">Récapitulatif</h3>
            <div className="text-sm text-zinc-200">
              <p><strong>Prestation :</strong> {selectedService?.nom} ({formatDuration(selectedService?.duree_minutes || 0)})</p>
              <p><strong>Tarif :</strong> {formatCurrency(Number(selectedService?.prix || 0))}</p>
              <p><strong>Coiffeur :</strong> {selectedStaff ? `${selectedStaff.prenom} ${selectedStaff.nom}` : 'Premier disponible'}</p>
              <p><strong>Date & Heure :</strong> {selectedDate} à {selectedTime}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Nom complet *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Amina Touré"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                Téléphone portable *
              </label>
              <input
                type="tel"
                required
                placeholder="Ex: 06 12 34 56 78"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              Adresse e-mail *
            </label>
            <input
              type="email"
              required
              placeholder="Ex: amina@exemple.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">
              Remarques ou besoins particuliers (optionnel)
            </label>
            <textarea
              rows={3}
              placeholder="Ex: Longueur des cheveux, cuir chevelu sensible, modèle de tresse souhaité..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm resize-none"
            />
          </div>

          <div className="pt-6 flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setStep(3)}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Retour</span>
            </Button>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isSubmitting}
              className="gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirmer la réservation</span>
            </Button>
          </div>
        </form>
      )}

      {/* STEP 5: SUCCESS CONFIRMATION */}
      {step === 5 && confirmationData && (
        <div className="text-center py-8 space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-zinc-100">
              Réservation Confirmée !
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              Merci pour votre confiance. Votre rendez-vous a été enregistré dans notre système. Un e-mail de récapitulatif vous a été envoyé.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md mx-auto text-left space-y-3">
            {confirmationData.appointmentId && (
              <div className="text-xs text-zinc-500 font-mono">
                Réf: {confirmationData.appointmentId}
              </div>
            )}
            <div className="text-sm text-zinc-200 space-y-1">
              <p><strong>Salon :</strong> {SALON_INFO.name} ({SALON_INFO.address}, {SALON_INFO.city})</p>
              <p><strong>Prestation :</strong> {confirmationData.service?.nom}</p>
              <p><strong>Coiffeur :</strong> {confirmationData.staffName}</p>
              <p><strong>Date :</strong> {confirmationData.date} à {confirmationData.time}</p>
              <p><strong>Montant :</strong> {formatCurrency(Number(confirmationData.service?.prix || 0))}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setStep(1)
                setSelectedTime('')
              }}
            >
              Faire une autre réservation
            </Button>
            <a href="/">
              <Button variant="gold" size="md">
                Retour à l'accueil
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
