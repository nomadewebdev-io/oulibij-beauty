import React from 'react'
import { getServices } from '@/lib/actions/services'
import { getStaffMembers } from '@/lib/actions/staff'
import { BookingWizard } from '@/components/booking/BookingWizard'
import { SALON_INFO } from '@/lib/constants'
import { Sparkles } from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `Réserver un Soin en Ligne | ${SALON_INFO.name}`,
  description: `Prenez rendez-vous en ligne en 4 étapes simples au salon ${SALON_INFO.name}. Choisissez votre service, votre coiffeuse et votre créneau en temps réel.`,
}

interface ReserverPageProps {
  searchParams: Promise<{ service?: string; staff?: string }>
}

export default async function ReserverPage({ searchParams }: ReserverPageProps) {
  const params = await searchParams
  const [services, staff] = await Promise.all([
    getServices(),
    getStaffMembers(),
  ])

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Réservation Instantanée</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight font-serif italic">
            Réserver Votre Séance
          </h1>
          <p className="mt-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
            Sélectionnez votre prestation ci-dessous et échangez directement sur WhatsApp avec notre équipe aux Almadies pour bloquer votre créneau.
          </p>
        </div>

        {/* 4-Step Booking Funnel */}
        <BookingWizard
          initialServices={services}
          initialStaff={staff}
          preselectedServiceId={params?.service}
          preselectedStaffId={params?.staff}
        />
      </div>
    </div>
  )
}
