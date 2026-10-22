'use client'

import React, { useState, useEffect, useMemo, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Service, Staff } from '@/types'
import { SALON_INFO } from '@/lib/constants'
import { formatCurrency, formatDuration, formatDateFrench } from '@/lib/utils'
import {
  createAppointmentAction,
  getAvailableTimeSlotsAction,
  TimeSlotAvailability,
} from '@/lib/actions/booking'
import { createClient } from '@/lib/supabase/client'
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
  Lock,
  Loader2,
  AlertCircle,
  FileText,
} from '@/components/ui/Icons'
import { EmptyState } from '@/components/ui/EmptyState'

interface BookingWizardProps {
  initialServices: Service[]
  initialStaff: Staff[]
  preselectedServiceId?: string
  preselectedStaffId?: string
}

/**
 * Détermine si la praticienne / coiffeuse a une spécialité compatible avec le service choisi
 */
function isStaffSpecialistForService(staff: Staff, service?: Service): boolean {
  if (!service) return true
  const spec = (staff.specialite || '').toLowerCase()
  const bio = (staff.bio || '').toLowerCase()
  const sName = (service.nom || '').toLowerCase()
  const sCat = (service.categorie || '').toLowerCase()

  const combinedStaff = `${spec} ${bio}`

  if (sCat.includes('maquillage') || sName.includes('maquillage') || sCat.includes('make-up') || sCat.includes('makeup')) {
    return (
      combinedStaff.includes('maquillage') ||
      combinedStaff.includes('make-up') ||
      combinedStaff.includes('makeup') ||
      combinedStaff.includes('beauté') ||
      combinedStaff.includes('beaute') ||
      combinedStaff.includes('visagisme') ||
      combinedStaff.includes('esthétique') ||
      combinedStaff.includes('esthetique')
    )
  }
  if (sCat.includes('tresse') || sCat.includes('braid') || sName.includes('tresse') || sName.includes('braid')) {
    return combinedStaff.includes('tresse') || combinedStaff.includes('braid') || combinedStaff.includes('texturé') || combinedStaff.includes('afro')
  }
  if (sCat.includes('color') || sCat.includes('balayage') || sName.includes('balayage') || sName.includes('color')) {
    return combinedStaff.includes('color') || combinedStaff.includes('balayage') || combinedStaff.includes('nuance') || combinedStaff.includes('patine')
  }
  if (sCat.includes('soin') || sCat.includes('traitement') || sName.includes('botox') || sName.includes('kératine')) {
    return combinedStaff.includes('soin') || combinedStaff.includes('botox') || combinedStaff.includes('kératine') || combinedStaff.includes('keratine') || combinedStaff.includes('lissage')
  }
  if (sCat.includes('lissage') || sName.includes('lissage')) {
    return combinedStaff.includes('lissage') || combinedStaff.includes('botox') || combinedStaff.includes('soyeux') || combinedStaff.includes('soin')
  }
  if (sCat.includes('coupe') || sCat.includes('coiffage') || sName.includes('coupe') || sName.includes('brushing')) {
    return combinedStaff.includes('coupe') || combinedStaff.includes('brushing') || combinedStaff.includes('styliste') || combinedStaff.includes('visagisme') || combinedStaff.includes('coiffure')
  }

  return true
}

export function BookingWizard({
  initialServices,
  initialStaff,
  preselectedServiceId,
  preselectedStaffId,
}: BookingWizardProps) {
  const services = initialServices || []
  const staffList = initialStaff || []

  // Wizard state (1: Service, 2: Coiffeuse, 3: Date & Créneau, 4: Récapitulatif & Auth)
  const [step, setStep] = useState<number>(1)
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceId || '')
  const [selectedStaffId, setSelectedStaffId] = useState<string>(preselectedStaffId || '')

  // Default date: tomorrow
  const getTomorrowString = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  }

  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowString())
  const [selectedTime, setSelectedTime] = useState<string>('')

  // Slots calculation state
  const [availableSlots, setAvailableSlots] = useState<TimeSlotAvailability[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)

  // Client info & Notes
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [notes, setNotes] = useState('')

  // Auth state
  const [currentUser, setCurrentUser] = useState<{ id: string; email?: string; name?: string; phone?: string } | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authFullName, setAuthFullName] = useState('')
  const [authPhone, setAuthPhone] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  // Booking submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [confirmationData, setConfirmationData] = useState<{
    appointmentId?: string
    service?: Service
    staffName?: string
    date: string
    time: string
    price: number
  } | null>(null)

  // Category filter for service selection
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('Tous')

  const serviceCategories = useMemo(() => {
    const set = new Set<string>()
    services.forEach((s) => {
      if (s.categorie?.trim()) set.add(s.categorie.trim())
    })
    return ['Tous', ...Array.from(set)]
  }, [services])

  const filteredServices = useMemo(() => {
    if (serviceCategoryFilter === 'Tous') return services
    return services.filter((s) => s.categorie === serviceCategoryFilter)
  }, [services, serviceCategoryFilter])

  const selectedService = services.find((s) => s.id === selectedServiceId)
  const selectedStaff = staffList.find((st) => st.id === selectedStaffId)

  // Compatible staff list
  const compatibleStaffList = useMemo(() => {
    if (!selectedService) return staffList
    return [...staffList].sort((a, b) => {
      const aCompat = isStaffSpecialistForService(a, selectedService) ? 1 : 0
      const bCompat = isStaffSpecialistForService(b, selectedService) ? 1 : 0
      return bCompat - aCompat
    })
  }, [staffList, selectedService])

  // Check auth on mount and listen to changes
  useEffect(() => {
    try {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          const u = data.user
          const name = u.user_metadata?.full_name || u.user_metadata?.name || ''
          const phone = u.user_metadata?.telephone || u.user_metadata?.phone || ''
          setCurrentUser({ id: u.id, email: u.email, name, phone })
          setClientEmail(u.email || '')
          if (name) setClientName(name)
          if (phone) setClientPhone(phone)
        }
      })

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u = session.user
          const name = u.user_metadata?.full_name || u.user_metadata?.name || ''
          const phone = u.user_metadata?.telephone || u.user_metadata?.phone || ''
          setCurrentUser({ id: u.id, email: u.email, name, phone })
          setClientEmail(u.email || '')
          if (name) setClientName(name)
          if (phone) setClientPhone(phone)
        } else {
          setCurrentUser(null)
        }
      })

      return () => {
        authListener.subscription.unsubscribe()
      }
    } catch {
      // client error fallback
    }
  }, [])

  // Fetch available slots whenever date, staff or service changes
  useEffect(() => {
    if (!selectedServiceId || !selectedDate) return

    let isMounted = true
    setIsLoadingSlots(true)
    setSlotsError(null)

    getAvailableTimeSlotsAction({
      salonId: SALON_INFO.id,
      serviceId: selectedServiceId,
      staffId: selectedStaffId || undefined,
      date: selectedDate,
    })
      .then((slots) => {
        if (!isMounted) return
        setAvailableSlots(slots)
        // Reset selected time if not available
        if (selectedTime && !slots.some((s) => s.time === selectedTime && s.available)) {
          setSelectedTime('')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Error fetching available slots:', err)
        setSlotsError('Impossible de charger les créneaux disponibles pour cette date.')
      })
      .finally(() => {
        if (isMounted) setIsLoadingSlots(false)
      })

    return () => {
      isMounted = false
    }
  }, [selectedServiceId, selectedStaffId, selectedDate])

  // Handle inline login
  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authEmail || !authPassword) {
      setAuthError('Veuillez saisir votre e-mail et votre mot de passe.')
      return
    }

    setIsAuthenticating(true)
    setAuthError(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      })

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setAuthError('Identifiants incorrects. Vérifiez votre e-mail et mot de passe.')
        } else {
          setAuthError(error.message)
        }
        return
      }

      if (data.user) {
        const u = data.user
        const name = u.user_metadata?.full_name || ''
        const phone = u.user_metadata?.telephone || ''
        setCurrentUser({ id: u.id, email: u.email, name, phone })
        setClientEmail(u.email || '')
        if (name) setClientName(name)
        if (phone) setClientPhone(phone)
      }
    } catch {
      setAuthError('Erreur lors de la connexion.')
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Handle inline register
  const handleInlineRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authEmail || !authPassword || !authFullName) {
      setAuthError('Veuillez remplir votre nom, e-mail et mot de passe.')
      return
    }

    setIsAuthenticating(true)
    setAuthError(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email: authEmail,
        password: authPassword,
        options: {
          data: {
            full_name: authFullName,
            telephone: authPhone,
          },
        },
      })

      if (error) {
        setAuthError(error.message)
        return
      }

      if (data.user) {
        const u = data.user
        setCurrentUser({ id: u.id, email: u.email, name: authFullName, phone: authPhone })
        setClientEmail(u.email || '')
        setClientName(authFullName)
        if (authPhone) setClientPhone(authPhone)
      }
    } catch {
      setAuthError("Erreur lors de l'inscription.")
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Final booking submission
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) {
      setErrorMessage('Veuillez vous connecter ou créer un compte pour confirmer votre réservation.')
      return
    }

    if (!selectedServiceId || !selectedDate || !selectedTime) {
      setErrorMessage('Veuillez sélectionner votre soin, la date et un horaire.')
      return
    }

    if (!clientName || !clientEmail) {
      setErrorMessage('Veuillez vérifier vos coordonnées (nom et e-mail).')
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
          price: Number(selectedService?.prix || 0),
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

  if (services.length === 0) {
    return (
      <EmptyState
        title="Aucune prestation disponible à la réservation"
        description="Notre catalogue de prestations est en cours de mise à jour. N'hésitez pas à nous contacter directement pour prendre rendez-vous."
        actionLabel="Nous contacter"
        actionHref="/contact"
        icon={<Scissors className="w-8 h-8 text-pink-500" />}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md border border-rose-100 rounded-3xl p-5 sm:p-10 shadow-xl shadow-pink-900/5 relative">
      {/* 4-STEP PROGRESS BAR */}
      {step < 5 && (
        <div className="mb-10">
          <div className="grid grid-cols-4 gap-2 mb-3 text-center">
            <button
              onClick={() => setStep(1)}
              className={`text-xs font-bold transition-colors ${
                step >= 1 ? 'text-pink-600' : 'text-zinc-400'
              }`}
            >
              1. Prestation
            </button>
            <button
              onClick={() => selectedServiceId && setStep(2)}
              disabled={!selectedServiceId}
              className={`text-xs font-bold transition-colors ${
                step >= 2 ? 'text-pink-600' : 'text-zinc-400'
              } disabled:cursor-not-allowed`}
            >
              2. Experte
            </button>
            <button
              onClick={() => selectedServiceId && setStep(3)}
              disabled={!selectedServiceId}
              className={`text-xs font-bold transition-colors ${
                step >= 3 ? 'text-pink-600' : 'text-zinc-400'
              } disabled:cursor-not-allowed`}
            >
              3. Date & Heure
            </button>
            <button
              onClick={() => selectedServiceId && selectedDate && selectedTime && setStep(4)}
              disabled={!selectedServiceId || !selectedDate || !selectedTime}
              className={`text-xs font-bold transition-colors ${
                step >= 4 ? 'text-pink-600' : 'text-zinc-400'
              } disabled:cursor-not-allowed`}
            >
              4. Confirmation
            </button>
          </div>

          <div className="w-full bg-rose-100/60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 1 : CHOIX DU SERVICE */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2">
              Étape 1 sur 4
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-serif italic flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <span>Choisissez votre prestation</span>
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Sélectionnez le soin, la coiffure ou la mise en beauté que vous souhaitez réaliser.
            </p>
          </div>

          {/* Category Filter Pills */}
          {serviceCategories.length > 2 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {serviceCategories.map((cat) => {
                const isSelected = serviceCategoryFilter === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setServiceCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-950 text-white shadow-md'
                        : 'bg-white text-zinc-600 border border-rose-100 hover:bg-rose-50'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          )}

          {/* Services Cards List */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredServices.map((service) => {
              const isSelected = selectedServiceId === service.id
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-pink-50/80 border-pink-500 shadow-md shadow-pink-500/10 ring-2 ring-pink-500/20'
                      : 'bg-white border-rose-100 hover:border-pink-300 hover:bg-rose-50/40 shadow-sm'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase text-pink-600 bg-pink-100/90 px-2.5 py-0.5 rounded-full border border-pink-200">
                        {service.categorie}
                      </span>
                      {service.necessite_essai && (
                        <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                          Essai préalable recommandé
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-950">
                      {service.nom}
                    </h3>
                    {service.description && (
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {service.description}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 pt-1">
                      <Clock className="w-3.5 h-3.5 text-pink-500" />
                      <span>{formatDuration(service.duree_minutes)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-rose-100">
                    <span className="text-xl font-black text-zinc-950">
                      {formatCurrency(Number(service.prix))}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-pink-500 bg-pink-500 text-white shadow-sm'
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

          {/* Recommandation informative si necessite_essai = true */}
          {selectedService?.necessite_essai && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-sm space-y-2 animate-fadeIn">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-950">
                    Conseil pour votre grand jour : Réservez également votre essai
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                    Pour la prestation <strong>{selectedService.nom}</strong>, nous vous invitons à réserver également la prestation <strong>« Essai maquillage mariée »</strong> quelques semaines avant le jour J afin de tester les teintes, valider les harmonies et assurer un résultat sur-mesure en toute sérénité.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 flex justify-end">
            <button
              disabled={!selectedServiceId}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 disabled:opacity-40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Continuer vers le choix de l&apos;experte</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 2 : CHOIX DE L'EXPERTE (filtrée par spécialité compatible) */}
      {/* ========================================================================= */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2">
              Étape 2 sur 4
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-serif italic flex items-center gap-2">
              <User className="w-6 h-6 text-pink-500" />
              <span>Choisissez votre experte</span>
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Sélection pour : <strong className="text-zinc-900">{selectedService?.nom}</strong> ({selectedService?.categorie})
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option : N'importe quelle experte disponible */}
            <div
              onClick={() => setSelectedStaffId('')}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-center gap-4 ${
                selectedStaffId === ''
                  ? 'bg-pink-50/80 border-pink-500 shadow-md ring-2 ring-pink-500/20'
                  : 'bg-white border-rose-100 hover:border-pink-300 hover:bg-rose-50/30 shadow-sm'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-200">
                <Sparkles className="w-7 h-7 text-pink-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-950">Première disponible</h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Plus de créneaux
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  Idéal pour obtenir le créneau horaire le plus rapide.
                </p>
              </div>
            </div>

            {/* Staff list with compatibility indicators */}
            {compatibleStaffList.map((st) => {
              const isSelected = selectedStaffId === st.id
              const isRecommended = isStaffSpecialistForService(st, selectedService)

              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStaffId(st.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-pink-50/80 border-pink-500 shadow-md ring-2 ring-pink-500/20'
                      : 'bg-white border-rose-100 hover:border-pink-300 hover:bg-rose-50/30 shadow-sm'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-300 text-white font-bold flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                    {st.avatar_url ? (
                      <Image
                        src={st.avatar_url}
                        alt={`${st.prenom} ${st.nom}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-lg">
                        {st.prenom ? st.prenom[0] : ''}{st.nom ? st.nom[0] : ''}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-zinc-950">
                        {st.prenom} {st.nom}
                      </h3>
                      {isRecommended && (
                        <span className="text-[10px] font-bold text-pink-600 bg-pink-100/90 px-2 py-0.5 rounded-full border border-pink-200">
                          ★ Spécialiste
                        </span>
                      )}
                    </div>
                    {st.specialite && (
                      <p className="text-xs text-pink-600 font-semibold leading-tight">
                        {st.specialite}
                      </p>
                    )}
                    {st.bio && (
                      <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed pt-0.5">
                        {st.bio}
                      </p>
                    )}
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
              <span>Continuer vers date & heure</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 3 : DATE & CRÉNEAU HORAIRE (calcul dynamique anti double-réservation) */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2">
              Étape 3 sur 4
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-serif italic flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-pink-500" />
              <span>Choisissez votre date & créneau</span>
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Soin : <strong className="text-zinc-900">{selectedService?.nom}</strong> ({formatDuration(selectedService?.duree_minutes || 45)})
              {selectedStaff && ` avec ${selectedStaff.prenom} ${selectedStaff.nom}`}
            </p>
          </div>

          {/* Date Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              Date du rendez-vous
            </label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-80 px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 focus:outline-none focus:border-pink-500 text-sm shadow-sm"
            />
          </div>

          {/* Slots Loading or Error */}
          {isLoadingSlots && (
            <div className="py-8 text-center flex flex-col items-center justify-center text-pink-500 gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-xs font-semibold text-zinc-500">
                Calcul des créneaux disponibles en direct...
              </p>
            </div>
          )}

          {slotsError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {slotsError}
            </div>
          )}

          {/* Rappel informatif d'essai en étape 3 */}
          {selectedService?.necessite_essai && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Rappel Jour J :</strong> N&apos;oubliez pas de prévoir et réserver également votre séance <strong>« Essai maquillage mariée »</strong> avant la date de la cérémonie.
              </p>
            </div>
          )}

          {/* Slots Grid */}
          {!isLoadingSlots && !slotsError && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Créneaux disponibles pour le {selectedDate ? formatDateFrench(selectedDate) : ''}
                </label>
                <span className="text-[11px] text-zinc-500">
                  {availableSlots.filter((s) => s.available).length} créneau(x) libre(s)
                </span>
              </div>

              {availableSlots.length === 0 || !availableSlots.some((s) => s.available) ? (
                <div className="p-8 rounded-2xl bg-rose-50/50 border border-rose-100 text-center space-y-2">
                  <Clock className="w-8 h-8 text-pink-400 mx-auto" />
                  <p className="text-sm font-bold text-zinc-800">
                    Aucun créneau libre pour cette date
                  </p>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Le salon est peut-être complet ou fermé ce jour-là. Veuillez sélectionner une autre date.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTime === slot.time
                    const isAvailable = slot.available

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all ${
                          !isAvailable
                            ? 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed line-through opacity-50'
                            : isSelected
                            ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/30 scale-105 cursor-pointer ring-2 ring-pink-500'
                            : 'bg-white border border-rose-200 text-zinc-800 hover:border-pink-400 hover:bg-rose-50 cursor-pointer shadow-sm'
                        }`}
                      >
                        {slot.time}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}

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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 disabled:opacity-40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Continuer vers le récapitulatif</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 4 : RÉCAPITULATIF, AUTHENTIFICATION & CONFIRMATION */}
      {/* ========================================================================= */}
      {step === 4 && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2">
              Étape 4 sur 4
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-serif italic flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-pink-500" />
              <span>Récapitulatif & Confirmation</span>
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Vérifiez les détails de votre rendez-vous avant de confirmer.
            </p>
          </div>

          {/* Detailed Summary Card */}
          <div className="bg-gradient-to-br from-pink-50/90 via-rose-50/70 to-pink-50/90 border border-pink-200/80 p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-pink-200/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                Votre séance {SALON_INFO.name}
              </span>
              <span className="text-2xl font-black text-zinc-950">
                {formatCurrency(Number(selectedService?.prix || 0))}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-700">
              <div className="space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Prestation</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-sm text-zinc-900">{selectedService?.nom}</p>
                  {selectedService?.necessite_essai && (
                    <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      Essai requis
                    </span>
                  )}
                </div>
                <p className="text-zinc-500">{selectedService?.categorie} • {formatDuration(selectedService?.duree_minutes || 45)}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Experte</span>
                <p className="font-bold text-sm text-zinc-900">
                  {selectedStaff ? `${selectedStaff.prenom} ${selectedStaff.nom}` : 'Première disponible'}
                </p>
                <p className="text-zinc-500">{selectedStaff?.specialite || 'Équipe experte du salon'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Date & Heure</span>
                <p className="font-bold text-sm text-zinc-900">
                  {selectedDate ? formatDateFrench(selectedDate) : ''}
                </p>
                <p className="text-pink-600 font-bold">À {selectedTime}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Lieu</span>
                <p className="font-bold text-zinc-900">{SALON_INFO.address}</p>
                <p className="text-zinc-500">{SALON_INFO.postalCode} {SALON_INFO.city}</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* AUTHENTICATION SECTION */}
          {/* ========================================================================= */}
          {currentUser ? (
            /* User is Logged In */
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Connecté(e) en tant que</p>
                    <p className="text-sm font-bold text-emerald-950">
                      {currentUser.name || clientName || currentUser.email} ({currentUser.email})
                    </p>
                  </div>
                </div>
              </div>

              {/* Editable client info for appointment */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-900">Informations de contact pour le rendez-vous</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Téléphone portable *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700">Remarques ou souhaits particuliers (optionnel)</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Longueur des cheveux, antécédents de coloration, etc."
                    className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500 resize-none"
                  />
                </div>
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
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enregistrement en cours...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmer ma réservation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* User is NOT Logged In : Inline Fast Login / Register */
            <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="text-center max-w-md mx-auto space-y-1">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 font-serif italic">
                  Connectez-vous pour valider votre réservation
                </h3>
                <p className="text-xs text-zinc-500">
                  Votre sélection de créneau est conservée pendant la connexion.
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex rounded-full bg-zinc-100 p-1 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login')
                    setAuthError(null)
                  }}
                  className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                    authMode === 'login'
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  Connexion
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register')
                    setAuthError(null)
                  }}
                  className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                    authMode === 'register'
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  Créer un compte
                </button>
              </div>

              {authError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Login Form */}
              {authMode === 'login' ? (
                <form onSubmit={handleInlineLogin} className="space-y-4 max-w-md mx-auto">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Adresse e-mail</label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Mot de passe</label>
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connexion en cours...</span>
                      </>
                    ) : (
                      <span>Se connecter & continuer</span>
                    )}
                  </button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleInlineRegister} className="space-y-3.5 max-w-md mx-auto">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={authFullName}
                      onChange={(e) => setAuthFullName(e.target.value)}
                      placeholder="Ex: Aminata Touré"
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Téléphone portable</label>
                    <input
                      type="tel"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Adresse e-mail *</label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Mot de passe (min. 6 caractères) *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Création du compte...</span>
                      </>
                    ) : (
                      <span>Créer mon compte & valider</span>
                    )}
                  </button>
                </form>
              )}

              <div className="pt-4 flex justify-start">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Modifier la date ou le créneau</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 5 : CONFIRMATION RÉUSSIE */}
      {/* ========================================================================= */}
      {step === 5 && confirmationData && (
        <div className="text-center py-8 space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-pink-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200 inline-block">
              En attente de confirmation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-serif italic">
              Réservation Enregistrée !
            </h2>
            <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
              Votre demande a bien été créée avec le statut <strong>&laquo; en attente &raquo;</strong>. Notre équipe va valider votre créneau dans les plus brefs délais.
            </p>
          </div>

          <div className="bg-pink-50/70 border border-rose-100 p-6 rounded-3xl max-w-md mx-auto text-left space-y-2.5 text-sm text-zinc-800 shadow-sm">
            {confirmationData.appointmentId && (
              <div className="text-xs text-zinc-400 font-mono pb-1 border-b border-rose-100">
                Numéro de réservation : #{confirmationData.appointmentId.slice(0, 8)}
              </div>
            )}
            <p><strong>Prestation :</strong> {confirmationData.service?.nom}</p>
            <p><strong>Coiffeuse :</strong> {confirmationData.staffName}</p>
            <p><strong>Date & Heure :</strong> {formatDateFrench(confirmationData.date)} à {confirmationData.time}</p>
            <p><strong>Montant estimé :</strong> {formatCurrency(confirmationData.price)}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/compte/mes-rendez-vous"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 shadow-sm transition-all"
            >
              <CalendarIcon className="w-4 h-4 text-pink-400" />
              <span>Voir mes rendez-vous</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-zinc-700 border border-zinc-300 hover:bg-zinc-50 transition-all"
            >
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
