import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getStaffMembers } from '@/lib/actions/staff'
import { getSalon } from '@/lib/actions/salon'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import {
  Sparkles,
  Scissors,
  Eye,
  Gem,
  ArrowRight,
  Phone,
  WhatsAppBrand,
} from '@/components/ui/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `À Propos d'${siteConfig.brandName}`,
  description: `${siteConfig.tagline} — Découvrez l'univers d'${siteConfig.brandName} à ${siteConfig.fullAddress}. Maquillage, coiffure, pose lace, Stream Pod, cosmétiques et parfumerie ouverts 7j/7 de 9h à 21h.`,
}

export default async function AProposPage() {
  const [staff, salon] = await Promise.all([getStaffMembers(), getSalon()])

  const salonName = salon?.nom || siteConfig.brandName
  const salonDescription = salon?.description || siteConfig.description

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-white space-y-20">
      <section className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Maison de Beauté • {siteConfig.district}, {siteConfig.city}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f0e0c] tracking-tight font-serif italic">
            &laquo; {siteConfig.tagline} &raquo;
          </h1>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            {salonDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdf9f0] border border-amber-600/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
              Notre Identité
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f0e0c] tracking-tight">
              Maquillage, Coiffure &amp; Parfumerie réunis en un seul écrin
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Installé à <strong className="text-[#0f0e0c]">{siteConfig.fullAddress}</strong>, le salon{' '}
              <strong className="text-[#0f0e0c]">{salonName}</strong> vous accueille dans une atmosphère noir et or chaleureuse, pensée pour le confort et la mise en valeur de chaque cliente.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              Que vous veniez pour un maquillage de cérémonie ou un contouring précis, une pose lace fondue, un tissage, des tresses, un bouclage ou un lissage vapeur Stream Pod, notre équipe veille à la tenue impeccable du résultat et au soin de vos cheveux.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f0e0c] text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f0e0c]">Sublimation du Regard &amp; du Teint</h3>
                  <p className="text-xs text-stone-600">
                    Maquillage cérémonie, maquillage simple de jour et contouring adapté à votre carnation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f0e0c] text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f0e0c]">Coiffure Féminine Complète</h3>
                  <p className="text-xs text-stone-600">
                    Tissage, tresse, bouclage, pose lace, lissage Stream Pod, teinture et soins capillaires.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f0e0c] text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f0e0c]">Cosmétiques, Parfumerie &amp; Accessoires</h3>
                  <p className="text-xs text-stone-600">
                    Produits cosmétiques, parfums féminins et accessoires disponibles directement sur place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1b1710] via-[#0f0e0c] to-[#292111] border border-amber-500/40 p-8 flex flex-col justify-between shadow-xl">
              <div className="space-y-2 text-white">
                <span className="text-xs uppercase tracking-widest font-bold bg-amber-500/15 text-amber-300 px-3 py-1 rounded-full inline-block border border-amber-500/40">
                  L&apos;Esprit {salonName}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-amber-200">
                  {siteConfig.tagline}
                </h3>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-amber-500/30 text-[#0f0e0c] space-y-1 shadow-sm">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Amplitude Horaire Large
                </div>
                <p className="text-xs text-stone-600 leading-snug">
                  Nous vous recevons <strong>du lundi au dimanche de 9h à 21h</strong> à Cité Sonatel 2 (en face UNO des 2 Voies, Liberté 6), avec règlement Wave, Orange Money, Free Money ou espèces.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-amber-900/15 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-2xl font-black text-amber-700">7j / 7</div>
                <div className="text-xs text-stone-600 font-medium">Ouvert de 9h à 21h</div>
              </div>
              <div className="bg-[#0f0e0c] border border-amber-500/40 rounded-2xl p-4 text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-amber-400">{siteConfig.phone}</div>
                <div className="text-xs text-stone-300 font-medium">Appel &amp; WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf9f0] border border-amber-600/30 text-amber-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Nos Pôles d&apos;Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0e0c] tracking-tight font-serif italic">
            Une Équipe Dédiée à Chaque Besoin
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {staff.map((member) => (
            <div
              key={member.id}
              className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-7 flex flex-col items-center text-center hover:shadow-xl hover:border-amber-600/50 hover:bg-white transition-all duration-300 group"
            >
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-[3px] mb-5 group-hover:scale-105 transition-transform shadow-md">
                {member.avatar_url ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={member.avatar_url}
                      alt={`${member.prenom} ${member.nom} — ${siteConfig.brandName}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-[#0f0e0c] flex items-center justify-center text-xl font-bold text-amber-300">
                    OB
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#0f0e0c] mb-1">
                {member.prenom} {member.nom}
              </h3>

              {member.specialite && (
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-[#0f0e0c] px-3 py-1 rounded-full border border-amber-500/40 mb-4">
                  {member.specialite}
                </span>
              )}

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 flex-1">
                {member.bio}
              </p>

              <div className="mt-auto w-full pt-4 border-t border-amber-900/10">
                <a
                  href={getWhatsAppBookingUrl(`${member.prenom} ${member.nom}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all active:scale-95 shadow-sm min-h-[44px]"
                >
                  <WhatsAppBrand className="w-3.5 h-3.5 text-white" />
                  <span>Prendre RDV sur WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto rounded-3xl bg-[#0f0e0c] border border-amber-500/40 p-8 sm:p-12 text-center text-white shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif italic text-amber-300">
            Envie de prendre rendez-vous aujourd&apos;hui ?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Écrivez-nous sur WhatsApp ou appelez directement le {siteConfig.phone} — nous sommes ouverts tous les jours de 9h à 21h à {siteConfig.district}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg active:scale-95 transition-all min-h-[48px]"
            >
              <WhatsAppBrand className="w-4 h-4 text-white" />
              <span>Réserver sur WhatsApp</span>
            </a>
            <a
              href={getPhoneCallUrl()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-[#0f0e0c] bg-amber-400 hover:bg-amber-300 shadow-lg active:scale-95 transition-all min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-[#0f0e0c]" />
              <span>Appeler le {siteConfig.phone}</span>
            </a>
            <Link
              href="/prestations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-stone-200 border border-stone-700 hover:border-amber-400 hover:text-amber-300 transition-all min-h-[48px]"
            >
              <span>Voir la carte</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
