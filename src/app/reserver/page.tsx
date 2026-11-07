import React from 'react'
import { getServices } from '@/lib/actions/services'
import { getStaffMembers } from '@/lib/actions/staff'
import { BookingWizard } from '@/components/booking/BookingWizard'
import { siteConfig } from '@/config/site'
import { Sparkles } from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Réserver un Rendez-Vous',
  description: `Réservez votre séance maquillage ou coiffure chez ${siteConfig.brandName} à ${siteConfig.fullAddress}. Confirmation directe sur WhatsApp au ${siteConfig.whatsappDisplay}, 7j/7 de 9h à 21h.`,
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
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Réservation Directe • 7j/7 (9h – 21h)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f0e0c] tracking-tight font-serif italic">
            Réserver chez {siteConfig.brandName}
          </h1>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Choisissez votre prestation et confirmez votre créneau en un clic sur WhatsApp ({siteConfig.whatsappDisplay}) ou par appel direct à {siteConfig.district}.
          </p>
        </div>

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
