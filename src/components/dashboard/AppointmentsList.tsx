'use client'

import React, { useState } from 'react'
import { RendezVous } from '@/types'
import { formatCurrency, formatDateFrench, getStatusBadge } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, XCircle, AlertCircle } from '@/components/ui/Icons'
import { cancelAppointmentAction } from '@/lib/actions/booking'

interface AppointmentsListProps {
  initialAppointments: RendezVous[]
}

export function AppointmentsList({ initialAppointments }: AppointmentsListProps) {
  const [appointments, setAppointments] = useState<RendezVous[]>(initialAppointments)
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const handleCancel = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) return
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
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-500">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-zinc-200">Aucun rendez-vous trouvé</h3>
        <p className="text-sm text-zinc-400">
          Vous n'avez pas encore réservé de prestation chez OULIBIJ.
        </p>
        <div className="pt-2">
          <a href="/rendez-vous">
            <Button variant="gold" size="md">
              Prendre un premier rendez-vous
            </Button>
          </a>
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
            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-zinc-700 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.color}`}
                >
                  {badge.label}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  Réf: {appointment.id.slice(0, 8)}
                </span>
              </div>

              <div className="text-lg font-bold text-zinc-100">
                {appointment.client_nom || 'Client Privilège'}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {dateFormatted}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {startTime}
                </span>
                {appointment.prix_total && (
                  <span className="text-amber-400 font-bold">
                    {formatCurrency(Number(appointment.prix_total))}
                  </span>
                )}
              </div>

              {appointment.notes_client && (
                <p className="text-xs text-zinc-400 italic">
                  Note : {appointment.notes_client}
                </p>
              )}
            </div>

            {isCancellable && (
              <div className="shrink-0 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  isLoading={cancellingId === appointment.id}
                  onClick={() => handleCancel(appointment.id)}
                  className="border-rose-500/40 text-rose-400 hover:bg-rose-500/10 hover:border-rose-400 text-xs"
                >
                  <XCircle className="w-4 h-4 mr-1.5" />
                  Annuler
                </Button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
