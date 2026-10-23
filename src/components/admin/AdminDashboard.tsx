'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Service, Staff, Disponibilite, AppointmentStatus, AppointmentWithDetails } from '@/types'
import { formatCurrency, formatDuration, formatDateFrench, getStatusBadge } from '@/lib/utils'
import {
  Calendar,
  Clock,
  Scissors,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  Home,
  Plus,
  Edit2,
  Trash2,
  Search,
} from '@/components/ui/Icons'
import {
  updateAppointmentStatusAction,
  saveServiceAction,
  toggleServiceStatusAction,
  deleteServiceAction,
  saveStaffAction,
  toggleStaffStatusAction,
  deleteStaffAction,
  saveDisponibiliteAction,
} from '@/lib/actions/admin'

interface AdminDashboardProps {
  stats: {
    totalAppointments: number
    pendingAppointments: number
    confirmedAppointments: number
    totalServices: number
    totalStaff: number
  }
  initialAppointments: AppointmentWithDetails[]
  initialServices: Service[]
  initialStaff: Staff[]
  initialDisponibilites: Disponibilite[]
  adminUser: {
    email?: string
    full_name?: string | null
  }
}

export function AdminDashboard({
  stats,
  initialAppointments,
  initialServices,
  initialStaff,
  initialDisponibilites,
  adminUser,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'staff' | 'disponibilites'>('appointments')

  // Appointments state
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>(initialAppointments)
  const [appointmentFilter, setAppointmentFilter] = useState<string>('Tous')
  const [appointmentSearch, setAppointmentSearch] = useState<string>('')
  const [updatingRdvId, setUpdatingRdvId] = useState<string | null>(null)

  // Services state
  const [services, setServices] = useState<Service[]>(initialServices)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [serviceActionLoading, setServiceActionLoading] = useState(false)

  // Staff state
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false)
  const [staffActionLoading, setStaffActionLoading] = useState(false)

  // Disponibilités state
  const [disponibilites, setDisponibilites] = useState<Disponibilite[]>(initialDisponibilites)
  const [selectedStaffForDispo, setSelectedStaffForDispo] = useState<string>(
    initialStaff[0]?.id || ''
  )
  const [dispoSavingDay, setDispoSavingDay] = useState<number | null>(null)

  // Notification message
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const statusLabels: Record<string, string> = {
    Tous: 'Tous',
    en_attente: 'En attente',
    confirme: 'Confirmés',
    termine: 'Terminés',
    annule: 'Annulés',
  }

  const formatAppointmentStatusLabel = (status: string): string =>
    statusLabels[status] ?? status

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMessage({ text, type })
    setTimeout(() => {
      setFeedbackMessage(null)
    }, 4000)
  }

  // Handle status update
  const handleUpdateStatus = async (id: string, newStatus: AppointmentStatus) => {
    setUpdatingRdvId(id)
    const res = await updateAppointmentStatusAction(id, newStatus)
    if (res.success) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, statut: newStatus } : a))
      )
      showNotification(`Rendez-vous mis à jour (${newStatus}).`)
    } else {
      showNotification(res.message, 'error')
    }
    setUpdatingRdvId(null)
  }

  // Filtered appointments
  const filteredAppointments = appointments.filter((rdv) => {
    const matchesFilter =
      appointmentFilter === 'Tous' ? true : rdv.statut === appointmentFilter

    const q = appointmentSearch.toLowerCase()
    const matchesSearch =
      !q ||
      (rdv.client_nom || '').toLowerCase().includes(q) ||
      (rdv.client_email || '').toLowerCase().includes(q) ||
      (rdv.client_telephone || '').toLowerCase().includes(q) ||
      (rdv.service?.nom || '').toLowerCase().includes(q) ||
      (rdv.id || '').toLowerCase().includes(q)

    return matchesFilter && matchesSearch
  })

  // Handle service save
  const handleSaveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServiceActionLoading(true)
    const formData = new FormData(e.currentTarget)

    const res = await saveServiceAction(formData)
    if (res.success) {
      showNotification(res.message)
      setIsServiceModalOpen(false)
      setEditingService(null)
      // Optimistic refresh
      window.location.reload()
    } else {
      showNotification(res.message, 'error')
    }
    setServiceActionLoading(false)
  }

  // Handle service toggle
  const handleToggleService = async (service: Service) => {
    const nextState = !service.is_active
    const res = await toggleServiceStatusAction(service.id, nextState)
    if (res.success) {
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, is_active: nextState } : s))
      )
      showNotification(res.message)
    } else {
      showNotification(res.message, 'error')
    }
  }

  // Handle service delete
  const handleDeleteService = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce service ?')) return
    const res = await deleteServiceAction(id)
    if (res.success) {
      setServices((prev) => prev.filter((s) => s.id !== id))
      showNotification(res.message)
    } else {
      showNotification(res.message, 'error')
    }
  }

  // Handle staff save
  const handleSaveStaff = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStaffActionLoading(true)
    const formData = new FormData(e.currentTarget)

    const res = await saveStaffAction(formData)
    if (res.success) {
      showNotification(res.message)
      setIsStaffModalOpen(false)
      setEditingStaff(null)
      window.location.reload()
    } else {
      showNotification(res.message, 'error')
    }
    setStaffActionLoading(false)
  }

  // Handle staff toggle
  const handleToggleStaff = async (st: Staff) => {
    const nextState = !st.is_active
    const res = await toggleStaffStatusAction(st.id, nextState)
    if (res.success) {
      setStaffList((prev) =>
        prev.map((s) => (s.id === st.id ? { ...s, is_active: nextState } : s))
      )
      showNotification(res.message)
    } else {
      showNotification(res.message, 'error')
    }
  }

  // Handle staff delete
  const handleDeleteStaff = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce membre du staff ?')) return
    const res = await deleteStaffAction(id)
    if (res.success) {
      setStaffList((prev) => prev.filter((s) => s.id !== id))
      showNotification(res.message)
    } else {
      showNotification(res.message, 'error')
    }
  }

  // Days list for schedule
  const daysOfWeek = [
    { dayNumber: 1, name: 'Lundi' },
    { dayNumber: 2, name: 'Mardi' },
    { dayNumber: 3, name: 'Mercredi' },
    { dayNumber: 4, name: 'Jeudi' },
    { dayNumber: 5, name: 'Vendredi' },
    { dayNumber: 6, name: 'Samedi' },
    { dayNumber: 0, name: 'Dimanche' },
  ]

  // Handle save disponibilite
  const handleSaveDisponibilite = async (
    jourSemaine: number,
    heureDebut: string,
    heureFin: string,
    isActive: boolean
  ) => {
    if (!selectedStaffForDispo) return
    setDispoSavingDay(jourSemaine)

    const res = await saveDisponibiliteAction({
      staffId: selectedStaffForDispo,
      jourSemaine,
      heureDebut,
      heureFin,
      isActive,
    })

    if (res.success) {
      showNotification('Disponibilité enregistrée.')
      setDisponibilites((prev) => {
        const filtered = prev.filter(
          (d) => !(d.staff_id === selectedStaffForDispo && d.jour_semaine === jourSemaine)
        )
        return [
          ...filtered,
          {
            id: `dispo-${selectedStaffForDispo}-${jourSemaine}`,
            salon_id: 'default-salon',
            staff_id: selectedStaffForDispo,
            jour_semaine: jourSemaine,
            heure_debut: heureDebut,
            heure_fin: heureFin,
            is_active: isActive,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]
      })
    } else {
      showNotification(res.message, 'error')
    }
    setDispoSavingDay(null)
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification Banner */}
      {feedbackMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-fadeIn text-sm ${
            feedbackMessage.type === 'success'
              ? 'bg-zinc-950 text-white border border-pink-500'
              : 'bg-rose-600 text-white'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-white shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md border border-rose-100 rounded-3xl p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
              Espace Administrateur
            </span>
            <span className="text-xs text-zinc-400">Connecté en tant que {adminUser.email}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-serif italic mt-1">
            Tableau de Bord Salon
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Voir le site</span>
          </Link>
          <Link
            href="/compte/mes-rendez-vous"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 transition-colors"
          >
            <span>Mon compte client</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-rose-100 rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-zinc-500">Total RDV</span>
          <div className="text-2xl sm:text-3xl font-black text-zinc-950">
            {stats.totalAppointments}
          </div>
        </div>

        <div className="bg-white border border-amber-200 rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-amber-600">En attente</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {stats.pendingAppointments}
          </div>
        </div>

        <div className="bg-white border border-emerald-200 rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-emerald-600">Confirmés</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            {stats.confirmedAppointments}
          </div>
        </div>

        <div className="bg-white border border-rose-100 rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-zinc-500">Services</span>
          <div className="text-2xl sm:text-3xl font-black text-pink-600">
            {stats.totalServices}
          </div>
        </div>

        <div className="bg-white border border-rose-100 rounded-3xl p-5 shadow-sm space-y-1 col-span-2 lg:col-span-1">
          <span className="text-xs font-semibold text-zinc-500">Coiffeuses</span>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900">
            {stats.totalStaff}
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-rose-100 pb-3 no-scrollbar">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'appointments'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white text-zinc-600 border border-rose-100 hover:bg-rose-50'
          }`}
        >
          <Calendar className="w-4 h-4 text-pink-400" />
          <span>Rendez-vous Reçus</span>
          {stats.pendingAppointments > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
              {stats.pendingAppointments}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'services'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white text-zinc-600 border border-rose-100 hover:bg-rose-50'
          }`}
        >
          <Scissors className="w-4 h-4 text-pink-400" />
          <span>Gestion des Services ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'staff'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white text-zinc-600 border border-rose-100 hover:bg-rose-50'
          }`}
        >
          <User className="w-4 h-4 text-pink-400" />
          <span>Équipe & Coiffeuses ({staffList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('disponibilites')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'disponibilites'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white text-zinc-600 border border-rose-100 hover:bg-rose-50'
          }`}
        >
          <Clock className="w-4 h-4 text-pink-400" />
          <span>Disponibilités & Horaires</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: RENDEZ-VOUS REÇUS */}
      {/* ========================================================================= */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 border border-rose-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
              {['Tous', 'en_attente', 'confirme', 'termine', 'annule'].map((stat) => (
                <button
                  key={stat}
                  onClick={() => setAppointmentFilter(stat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    appointmentFilter === stat
                      ? 'bg-pink-600 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {formatAppointmentStatusLabel(stat)}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Rechercher client, email..."
                value={appointmentSearch}
                onChange={(e) => setAppointmentSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-rose-200 rounded-full text-xs text-zinc-900 focus:outline-none focus:border-pink-500"
              />
              <div className="absolute left-3 top-2.5 text-zinc-400">
                <Search className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Appointments Table / Cards */}
          {filteredAppointments.length === 0 ? (
            <div className="bg-white border border-rose-100 rounded-3xl p-10 text-center text-zinc-500 text-sm">
              Aucun rendez-vous trouvé selon vos critères.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((rdv) => {
                const badge = getStatusBadge(rdv.statut)
                const dateFmt = formatDateFrench(rdv.date_heure_debut)
                const startTime = new Date(rdv.date_heure_debut).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
                const isUpdating = updatingRdvId === rdv.id

                return (
                  <div
                    key={rdv.id}
                    className="bg-white border border-rose-100 rounded-3xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm hover:border-pink-300 transition-all"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          #{rdv.id.slice(0, 8)}
                        </span>
                        <span className="text-xs font-semibold text-zinc-500">
                          {dateFmt} à {startTime}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-zinc-400">Client :</span>{' '}
                          <strong className="text-zinc-900">{rdv.client_nom || 'Non renseigné'}</strong>
                          {rdv.client_telephone && (
                            <p className="text-zinc-500 mt-0.5">{rdv.client_telephone}</p>
                          )}
                          {rdv.client_email && (
                            <p className="text-zinc-400 truncate max-w-[200px]">{rdv.client_email}</p>
                          )}
                        </div>

                        <div>
                          <span className="text-zinc-400">Prestation :</span>{' '}
                          <strong className="text-zinc-900">{rdv.service?.nom || 'Prestation'}</strong>
                          <p className="text-zinc-500 mt-0.5">
                            Coiffeuse : {rdv.staff ? `${rdv.staff.prenom} ${rdv.staff.nom}` : 'Non assignée'}
                          </p>
                        </div>

                        <div>
                          <span className="text-zinc-400">Tarif :</span>{' '}
                          <strong className="text-zinc-950 text-sm">
                            {formatCurrency(Number(rdv.prix_total || 0))}
                          </strong>
                          {rdv.notes_client && (
                            <p className="text-zinc-500 italic mt-0.5 line-clamp-1">
                              Note : &laquo; {rdv.notes_client} &raquo;
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-rose-100 flex-wrap">
                      {rdv.statut === 'en_attente' && (
                        <>
                          <button
                            disabled={isUpdating}
                            onClick={() => handleUpdateStatus(rdv.id, 'confirme')}
                            className="px-4 py-2 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Confirmer
                          </button>
                          <button
                            disabled={isUpdating}
                            onClick={() => handleUpdateStatus(rdv.id, 'annule')}
                            className="px-3 py-2 rounded-full text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            Annuler
                          </button>
                        </>
                      )}

                      {rdv.statut === 'confirme' && (
                        <>
                          <button
                            disabled={isUpdating}
                            onClick={() => handleUpdateStatus(rdv.id, 'termine')}
                            className="px-4 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                          >
                            Marquer Terminé
                          </button>
                          <button
                            disabled={isUpdating}
                            onClick={() => handleUpdateStatus(rdv.id, 'annule')}
                            className="px-3 py-2 rounded-full text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            Annuler
                          </button>
                        </>
                      )}

                      {rdv.statut === 'termine' && (
                        <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                          ✓ Terminé
                        </span>
                      )}

                      {rdv.statut === 'annule' && (
                        <button
                          disabled={isUpdating}
                          onClick={() => handleUpdateStatus(rdv.id, 'en_attente')}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer"
                        >
                          Rétablir en attente
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GESTION DES SERVICES */}
      {/* ========================================================================= */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-950 font-serif italic">
              Carte des Prestations ({services.length})
            </h2>
            <button
              onClick={() => {
                setEditingService(null)
                setIsServiceModalOpen(true)
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une prestation</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white border rounded-3xl p-6 flex flex-col justify-between shadow-sm transition-all ${
                  service.is_active ? 'border-rose-100 hover:border-pink-300' : 'border-zinc-200 opacity-60 bg-zinc-50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                        {service.categorie}
                      </span>
                      {service.necessite_essai && (
                        <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          Essai requis
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-black text-zinc-950">
                      {formatCurrency(Number(service.prix))}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-950">{service.nom}</h3>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                      {service.description || 'Pas de description'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Clock className="w-3.5 h-3.5 text-pink-500" />
                    <span>{formatDuration(service.duree_minutes)}</span>
                    <span className="text-zinc-300">•</span>
                    <span className={service.is_active ? 'text-emerald-600 font-semibold' : 'text-rose-500 font-semibold'}>
                      {service.is_active ? 'Actif' : 'Désactivé'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-rose-100/70 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleService(service)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                      service.is_active
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {service.is_active ? 'Désactiver' : 'Activer'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingService(service)
                        setIsServiceModalOpen(true)
                      }}
                      className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                      title="Modifier"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Add/Edit Modal */}
          {isServiceModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setIsServiceModalOpen(false)}
            >
              <div
                className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-pink-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                  <h3 className="text-xl font-bold text-zinc-950 font-serif italic">
                    {editingService ? 'Modifier la prestation' : 'Ajouter une prestation'}
                  </h3>
                  <button
                    onClick={() => setIsServiceModalOpen(false)}
                    className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveService} className="space-y-4">
                  {editingService && <input type="hidden" name="id" value={editingService.id} />}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Nom du soin *</label>
                    <input
                      type="text"
                      name="nom"
                      required
                      defaultValue={editingService?.nom || ''}
                      placeholder="Ex: Soin Botox Capillaire"
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700">Catégorie *</label>
                      <input
                        type="text"
                        name="categorie"
                        required
                        defaultValue={editingService?.categorie || 'Coupe & Coiffage'}
                        placeholder="Ex: Tresses, Soins..."
                        className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700">Durée (minutes) *</label>
                      <input
                        type="number"
                        name="duree_minutes"
                        required
                        min={15}
                        step={5}
                        defaultValue={editingService?.duree_minutes || 45}
                        className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Tarif (FCFA) *</label>
                    <input
                      type="number"
                      name="prix"
                      required
                      min={0}
                      step={0.5}
                      defaultValue={editingService?.prix || 65}
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={editingService?.description || ''}
                      placeholder="Détails de la prestation, étapes et bienfaits..."
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-rose-50/60 border border-rose-100">
                    <input
                      type="checkbox"
                      id="necessite_essai"
                      name="necessite_essai"
                      defaultChecked={editingService?.necessite_essai || false}
                      className="w-4 h-4 text-pink-600 rounded border-rose-300 focus:ring-pink-500"
                    />
                    <label htmlFor="necessite_essai" className="text-xs font-bold text-zinc-800 cursor-pointer">
                      Nécessite un essai préalable avant le jour J (ex. Maquillage mariée)
                    </label>
                  </div>

                  <div className="pt-3 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsServiceModalOpen(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={serviceActionLoading}
                      className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md hover:scale-105 transition-all"
                    >
                      {serviceActionLoading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: GESTION DU STAFF */}
      {/* ========================================================================= */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-950 font-serif italic">
              Équipe de Coiffeuses ({staffList.length})
            </h2>
            <button
              onClick={() => {
                setEditingStaff(null)
                setIsStaffModalOpen(true)
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une coiffeuse</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {staffList.map((st) => (
              <div
                key={st.id}
                className={`bg-white border rounded-3xl p-6 flex flex-col justify-between shadow-sm transition-all ${
                  st.is_active ? 'border-rose-100 hover:border-pink-300' : 'border-zinc-200 opacity-60 bg-zinc-50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-300 text-white font-bold flex items-center justify-center shrink-0 shadow-sm overflow-hidden relative">
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
                    <div>
                      <h3 className="text-base font-bold text-zinc-950">
                        {st.prenom} {st.nom}
                      </h3>
                      <p className="text-xs font-semibold text-pink-600">
                        {st.specialite || 'Coiffeuse Styliste'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                    {st.bio || 'Pas de biographie renseignée.'}
                  </p>

                  <div className="space-y-1 text-xs text-zinc-500 pt-1">
                    {st.email && (
                      <p className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3 h-3 text-rose-400 shrink-0" />
                        {st.email}
                      </p>
                    )}
                    {st.telephone && (
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-rose-400 shrink-0" />
                        {st.telephone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-rose-100/70 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleStaff(st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                      st.is_active
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {st.is_active ? 'Désactiver' : 'Activer'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingStaff(st)
                        setIsStaffModalOpen(true)
                      }}
                      className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                      title="Modifier"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(st.id)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Staff Add/Edit Modal */}
          {isStaffModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setIsStaffModalOpen(false)}
            >
              <div
                className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-pink-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                  <h3 className="text-xl font-bold text-zinc-950 font-serif italic">
                    {editingStaff ? 'Modifier la coiffeuse' : 'Ajouter une coiffeuse'}
                  </h3>
                  <button
                    onClick={() => setIsStaffModalOpen(false)}
                    className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveStaff} className="space-y-4">
                  {editingStaff && <input type="hidden" name="id" value={editingStaff.id} />}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700">Prénom *</label>
                      <input
                        type="text"
                        name="prenom"
                        required
                        defaultValue={editingStaff?.prenom || ''}
                        placeholder="Ex: Aminata"
                        className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700">Nom *</label>
                      <input
                        type="text"
                        name="nom"
                        required
                        defaultValue={editingStaff?.nom || ''}
                        placeholder="Ex: Diallo"
                        className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Spécialité</label>
                    <input
                      type="text"
                      name="specialite"
                      defaultValue={editingStaff?.specialite || ''}
                      placeholder="Ex: Master Coloriste, Tresses Artistiques, Soins Botox..."
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700">Téléphone</label>
                      <input
                        type="tel"
                        name="telephone"
                        defaultValue={editingStaff?.telephone || ''}
                        placeholder="+221 77 000 00 00"
                        className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={editingStaff?.email || ''}
                        placeholder="aminata@oulibij-beauty.sn"
                        className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Biographie & Présentation</label>
                    <textarea
                      name="bio"
                      rows={3}
                      defaultValue={editingStaff?.bio || ''}
                      placeholder="Parcours, années d'expérience et passion..."
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-2xl text-zinc-950 text-sm focus:outline-none focus:border-pink-500 resize-none"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsStaffModalOpen(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={staffActionLoading}
                      className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md hover:scale-105 transition-all"
                    >
                      {staffActionLoading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: GESTION DES DISPONIBILITÉS */}
      {/* ========================================================================= */}
      {activeTab === 'disponibilites' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-950 font-serif italic">
                Horaires de Travail par Coiffeuse
              </h2>
              <p className="text-xs text-zinc-500">
                Configurez les jours et heures de travail de chaque membre de l&apos;équipe.
              </p>
            </div>

            {/* Staff Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-zinc-700">Coiffeuse :</label>
              <select
                value={selectedStaffForDispo}
                onChange={(e) => setSelectedStaffForDispo(e.target.value)}
                className="px-4 py-2 bg-white border border-rose-200 rounded-full text-xs font-semibold text-zinc-900 focus:outline-none focus:border-pink-500 shadow-sm"
              >
                {staffList.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.prenom} {st.nom} ({st.specialite || 'Styliste'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Schedule Configuration Card */}
          <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="divide-y divide-rose-100">
              {daysOfWeek.map((day) => {
                const currentDispo = disponibilites.find(
                  (d) => d.staff_id === selectedStaffForDispo && d.jour_semaine === day.dayNumber
                )
                const isWorking = currentDispo ? currentDispo.is_active : day.dayNumber !== 0
                const debut = currentDispo?.heure_debut ? currentDispo.heure_debut.slice(0, 5) : '09:00'
                const fin = currentDispo?.heure_fin ? currentDispo.heure_fin.slice(0, 5) : '19:00'
                const isSaving = dispoSavingDay === day.dayNumber

                return (
                  <form
                    key={day.dayNumber}
                    onSubmit={(e) => {
                      e.preventDefault()
                      const form = e.currentTarget
                      const active = (form.elements.namedItem('is_active') as HTMLInputElement).checked
                      const hDebut = (form.elements.namedItem('heure_debut') as HTMLInputElement).value
                      const hFin = (form.elements.namedItem('heure_fin') as HTMLInputElement).value
                      handleSaveDisponibilite(day.dayNumber, hDebut, hFin, active)
                    }}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 w-40">
                      <input
                        type="checkbox"
                        id={`active_${day.dayNumber}`}
                        name="is_active"
                        defaultChecked={isWorking}
                        className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                      />
                      <label htmlFor={`active_${day.dayNumber}`} className="text-sm font-bold text-zinc-900 cursor-pointer">
                        {day.name}
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                        <span>De</span>
                        <input
                          type="time"
                          name="heure_debut"
                          defaultValue={debut}
                          className="px-2.5 py-1.5 bg-zinc-50 border border-rose-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-pink-500"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                        <span>À</span>
                        <input
                          type="time"
                          name="heure_fin"
                          defaultValue={fin}
                          className="px-2.5 py-1.5 bg-zinc-50 border border-rose-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-pink-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        {isSaving ? '...' : 'Valider'}
                      </button>
                    </div>
                  </form>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
