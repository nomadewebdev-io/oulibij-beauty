'use client'

import React, { useState } from 'react'
import { RendezVous } from '@/types'
import { formatCurrency, formatDateFrench, getStatusBadge } from '@/lib/utils'
import { Calendar, Clock, XCircle, AlertCircle } from '@/components/ui/Icons'
import { cancelAppointmentAction } from '@/lib/actions/booking'
import Link from 'next/link'

interface AppointmentsListProps {
  initialAppointments: RendezVous[]
}

export function AppointmentsList({ initialAppointments }: AppointmentsListProps) {
  const [appointments, setAppointments] = useState<RendezVous[]>(initialAppointments)
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const handleCancel = async (id: string) => {
    if (!confirm('Êtes-vous sûre de vouloir annuler ce rendez-vous ?')) return
    setCancellingId(id)
    const success = await cancelAppointmentAction(id)
    if (success) {
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, statut: 'annule' } : app))
      )
    }
    setCancellingId(null)
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-pink-50/40 border border-rose-100 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-white border border-rose-100 rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-sm">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-zinc-950">Aucun rendez-vous pour le moment</h3>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          Vous n'avez pas encore réservé de prestation chez OULIBIJ BEAUTY.
        </p>
        <div className="pt-2">
          <Link
            href="/reserver"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/20 hover:scale-105 transition-all"
          >
            <span>Prendre un premier rendez-vous</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
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
            className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:border-pink-300 transition-all shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.color}`}
                >
                  {badge.label}
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  Réf : {appointment.id.slice(0, 8)}
                </span>
              </div>

              <div className="text-base sm:text-lg font-bold text-zinc-950">
                {appointment.client_nom || 'Prestation Salon'}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pink-500" />
                  {dateFormatted}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-pink-500" />
                  {startTime}
                </span>
                {appointment.prix_total && (
                  <span className="text-zinc-900 font-extrabold">
                    {formatCurrency(Number(appointment.prix_total))}
                  </span>
                )}
              </div>

              {appointment.notes_client && (
                <p className="text-xs text-zinc-500 italic bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                  Note : {appointment.notes_client}
                </p>
              )}
            </div>

            {isCancellable && (
              <div className="shrink-0 flex items-center gap-3">
                <button
                  disabled={cancellingId === appointment.id}
                  onClick={() => handleCancel(appointment.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>{cancellingId === appointment.id ? 'Annulation...' : 'Annuler'}</span>
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
