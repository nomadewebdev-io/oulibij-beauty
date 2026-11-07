'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { RendezVous, Service, Staff } from '@/types'
import { formatCurrency, formatDateFrench, getStatusBadge } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Calendar, Clock, XCircle, AlertCircle, Scissors, User, Sparkles, CheckCircle2 } from '@/components/ui/Icons'
import { cancelAppointmentAction } from '@/lib/actions/booking'

interface AppointmentWithRelations extends RendezVous {
  service?: Service | null
  staff?: Staff | null
}

interface AppointmentsListProps {
  initialAppointments: AppointmentWithRelations[]
}

export function AppointmentsList({ initialAppointments }: AppointmentsListProps) {
  const [appointments, setAppointments] = useState<AppointmentWithRelations[]>(initialAppointments)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [cancelMessage, setCancelMessage] = useState<{ id: string; success: boolean; text: string } | null>(null)

  const now = new Date().getTime()

  const upcomingAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const isCancelled = app.statut === 'annule'
      const isCompleted = app.statut === 'termine'
      const appTime = new Date(app.date_heure_debut).getTime()
      return !isCancelled && !isCompleted && appTime >= now - 60 * 60 * 1000
    })
  }, [appointments, now])

  const pastAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const isCancelled = app.statut === 'annule'
      const isCompleted = app.statut === 'termine'
      const appTime = new Date(app.date_heure_debut).getTime()
      return isCancelled || isCompleted || appTime < now - 60 * 60 * 1000
    })
  }, [appointments, now])

  const displayedList = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments

  const handleCancel = async (id: string) => {
    if (!confirm('Êtes-vous sûre de vouloir annuler ce rendez-vous ?')) return
    setCancellingId(id)
    setCancelMessage(null)

    const success = await cancelAppointmentAction(id)
    if (success) {
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, statut: 'annule' } : app))
      )
      setCancelMessage({
        id,
        success: true,
        text: 'Votre rendez-vous a bien été annulé.',
      })
    } else {
      setCancelMessage({
        id,
        success: false,
        text: "Une erreur est survenue lors de l'annulation.",
      })
    }
    setCancellingId(null)
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-10 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-sm animate-fadeIn">
        <div className="w-16 h-16 bg-[#0f0e0c] border border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-xs">
          <Calendar className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0f0e0c] font-serif italic">
            Aucun rendez-vous enregistré
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-sm mx-auto leading-relaxed">
            Vous n&apos;avez pas encore réservé de prestation chez {siteConfig.brandName}.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/reserver"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 shadow-sm active:scale-95 transition-all min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Prendre un rendez-vous</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-2 border-b border-amber-900/10 pb-3">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'bg-[#0f0e0c] text-amber-300 shadow-md'
              : 'bg-white text-stone-600 border border-amber-900/15 hover:bg-amber-50'
          }`}
        >
          <span>Rendez-vous à venir</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'upcoming' ? 'bg-amber-500 text-[#0f0e0c]' : 'bg-amber-100 text-amber-900'
            }`}
          >
            {upcomingAppointments.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'past'
              ? 'bg-[#0f0e0c] text-amber-300 shadow-md'
              : 'bg-white text-stone-600 border border-amber-900/15 hover:bg-amber-50'
          }`}
        >
          <span>Historique &amp; Passés</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'past' ? 'bg-amber-500 text-[#0f0e0c]' : 'bg-amber-100 text-stone-700'
            }`}
          >
            {pastAppointments.length}
          </span>
        </button>
      </div>

      {displayedList.length === 0 && (
        <div className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-stone-700">
            {activeTab === 'upcoming'
              ? 'Aucun rendez-vous à venir pour le moment.'
              : 'Aucun rendez-vous passé ou annulé.'}
          </p>
          {activeTab === 'upcoming' && (
            <Link
              href="/reserver"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 transition-colors"
            >
              <span>Planifier une séance</span>
            </Link>
          )}
        </div>
      )}

      <div className="space-y-4">
        {displayedList.map((appointment) => {
          const badge = getStatusBadge(appointment.statut)
          const dateFormatted = formatDateFrench(appointment.date_heure_debut)
          const startTime = new Date(appointment.date_heure_debut).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })
          const isCancellable = appointment.statut === 'en_attente' || appointment.statut === 'confirme'

          return (
            <div
              key={appointment.id}
              className="bg-white border border-amber-900/15 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:border-amber-500/50 transition-all shadow-sm"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    Réf : #{appointment.id.slice(0, 8)}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0f0e0c] flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{appointment.service?.nom || appointment.client_nom || 'Prestation en salon'}</span>
                  </h3>
                  {appointment.service?.categorie && (
                    <p className="text-xs text-amber-800 font-semibold mt-0.5">
                      Catégorie : {appointment.service.categorie}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="capitalize">{dateFormatted}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-bold text-[#0f0e0c]">{startTime}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>
                      {appointment.staff
                        ? `${appointment.staff.prenom} ${appointment.staff.nom}`
                        : siteConfig.brandName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {appointment.prix_total !== null && (
                    <span className="text-sm font-black text-[#0f0e0c]">
                      Montant : {formatCurrency(Number(appointment.prix_total))}
                    </span>
                  )}
                </div>

                {appointment.notes_client && (
                  <p className="text-xs text-stone-600 italic bg-[#faf8f4] p-3 rounded-2xl border border-amber-900/10">
                    Note : {appointment.notes_client}
                  </p>
                )}

                {cancelMessage && cancelMessage.id === appointment.id && (
                  <div
                    className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
                      cancelMessage.success
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {cancelMessage.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{cancelMessage.text}</span>
                  </div>
                )}
              </div>

              {isCancellable && (
                <div className="shrink-0 flex items-center md:self-center">
                  <button
                    disabled={cancellingId === appointment.id}
                    onClick={() => handleCancel(appointment.id)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{cancellingId === appointment.id ? 'Annulation...' : 'Annuler ce rendez-vous'}</span>
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
