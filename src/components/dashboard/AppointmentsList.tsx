'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { RendezVous, Service, Staff } from '@/types'
import { formatCurrency, formatDateFrench, getStatusBadge } from '@/lib/utils'
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

  // Partition into upcoming and past
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
      <div className="bg-white/80 backdrop-blur-md border border-rose-100 rounded-3xl p-10 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-lg shadow-pink-900/5 animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-tr from-pink-100 to-rose-50 border border-pink-200 rounded-2xl flex items-center justify-center mx-auto text-pink-500 shadow-sm">
          <Calendar className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-zinc-950 font-serif italic">
            Aucun rendez-vous enregistré
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Vous n&apos;avez pas encore réservé de soin au salon OULIBIJ BEAUTY.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/reserver"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Prendre un rendez-vous</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-rose-100 pb-3">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white text-zinc-600 border border-rose-100 hover:bg-rose-50'
          }`}
        >
          <span>Rendez-vous à venir</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'upcoming' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700'
            }`}
          >
            {upcomingAppointments.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'past'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white text-zinc-600 border border-rose-100 hover:bg-rose-50'
          }`}
        >
          <span>Historique & Passés</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'past' ? 'bg-pink-500 text-white' : 'bg-rose-100 text-zinc-700'
            }`}
          >
            {pastAppointments.length}
          </span>
        </button>
      </div>

      {/* Empty State for Selected Tab */}
      {displayedList.length === 0 && (
        <div className="bg-white/70 border border-rose-100 rounded-3xl p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-700">
            {activeTab === 'upcoming'
              ? 'Aucun rendez-vous à venir pour le moment.'
              : 'Aucun rendez-vous passé ou annulé.'}
          </p>
          {activeTab === 'upcoming' && (
            <Link
              href="/reserver"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold text-pink-600 bg-pink-50 hover:bg-pink-100 transition-colors"
            >
              <span>Planifier une séance</span>
            </Link>
          )}
        </div>
      )}

      {/* Appointment Cards */}
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
              className="bg-white/90 border border-rose-100 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:border-pink-300 transition-all shadow-sm"
            >
              <div className="space-y-3 flex-1">
                {/* Status & Reference */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Réf : #{appointment.id.slice(0, 8)}
                  </span>
                </div>

                {/* Service Name */}
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-pink-500 shrink-0" />
                    <span>{appointment.service?.nom || appointment.client_nom || 'Soin en salon'}</span>
                  </h3>
                  {appointment.service?.categorie && (
                    <p className="text-xs text-pink-600 font-semibold mt-0.5">
                      Catégorie : {appointment.service.categorie}
                    </p>
                  )}
                </div>

                {/* Date, Time, Stylist, Price */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <span className="capitalize">{dateFormatted}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <span className="font-bold text-zinc-900">{startTime}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <span>
                      {appointment.staff
                        ? `${appointment.staff.prenom} ${appointment.staff.nom}`
                        : 'Coiffeuse du salon'}
                    </span>
                  </div>
                </div>

                {/* Price & Client notes */}
                <div className="flex items-center justify-between pt-1">
                  {appointment.prix_total !== null && (
                    <span className="text-sm font-black text-zinc-950">
                      Montant : {formatCurrency(Number(appointment.prix_total))}
                    </span>
                  )}
                </div>

                {appointment.notes_client && (
                  <p className="text-xs text-zinc-500 italic bg-rose-50/60 p-3 rounded-2xl border border-rose-100">
                    Note : {appointment.notes_client}
                  </p>
                )}

                {/* Feedback message for this card */}
                {cancelMessage && cancelMessage.id === appointment.id && (
                  <div
                    className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
                      cancelMessage.success
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {cancelMessage.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{cancelMessage.text}</span>
                  </div>
                )}
              </div>

              {/* Action Button: Cancel */}
              {isCancellable && (
                <div className="shrink-0 flex items-center md:self-center">
                  <button
                    disabled={cancellingId === appointment.id}
                    onClick={() => handleCancel(appointment.id)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 hover:border-rose-300 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
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
