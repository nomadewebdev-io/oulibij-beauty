import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getStaffMembers } from '@/lib/actions/staff'
import { getSalon } from '@/lib/actions/salon'
import { SALON_INFO } from '@/lib/constants'
import { Sparkles, Scissors, Heart, ShieldCheck, Calendar, ArrowRight, User } from '@/components/ui/Icons'
import { EmptyState } from '@/components/ui/EmptyState'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `À Propos & Notre Équipe | ${SALON_INFO.name}`,
  description: `Découvrez l'histoire, la philosophie et l'équipe d'expertes du salon ${SALON_INFO.name}. Haute coiffure, soins botox, balayages et tresses d'art.`,
}

export default async function AProposPage() {
  const [staff, salon] = await Promise.all([
    getStaffMembers(),
    getSalon(),
  ])

  const salonName = salon?.nom || SALON_INFO.brandName
  const salonDescription =
    salon?.description || SALON_INFO.description

  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-transparent space-y-20">
      {/* 1. HERO / STORY SECTION */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Maison de Beauté Féminine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight font-serif italic">
            L'Excellence au Service de Vos Cheveux
          </h1>
          <p className="mt-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
            {salonDescription}
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white/70 backdrop-blur-md border border-rose-100 rounded-3xl p-6 sm:p-10 shadow-lg shadow-pink-900/5">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider">
              Notre Philosophie
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Une vision sur-mesure de la beauté capillaire
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Fondé avec la volonté de célébrer la singularité de chaque femme,{' '}
              <strong className="text-zinc-900">{salonName}</strong> allie expertise technique, sens artistique et soins réparateurs de pointe.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Que vous souhaitiez sublimer des boucles naturelles, réaliser un lissage soyeux sans formol, oser une métamorphose par balayage ou arborer des tresses d'art impeccables, notre équipe met un point d'honneur à préserver la santé et la brillance de votre fibre capillaire.
            </p>

            {/* Commitments */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Maîtrise de toutes les textures</h3>
                  <p className="text-xs text-zinc-500">Du cheveu raide et fin au cheveu texturé, bouclé, frisé ou crépus.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Rituels & Soins Rénovateurs</h3>
                  <p className="text-xs text-zinc-500">Traitements botox, kératine et huiles végétales pour régénérer en profondeur.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Écoute & Convivialité</h3>
                  <p className="text-xs text-zinc-500">Un espace cocon où chaque cliente bénéficie d'une attention exclusive.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Highlights Card */}
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 p-8 flex flex-col justify-between shadow-xl">
              <div className="space-y-2 text-white">
                <span className="text-xs uppercase tracking-widest font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block border border-white/30">
                  L'Atmosphère {salonName}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif italic font-bold">
                  Détente, Élégance & Confiance
                </h3>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/50 text-zinc-900 space-y-1">
                <div className="text-xs font-bold text-pink-600 uppercase tracking-wide">
                  Notre Engagement
                </div>
                <p className="text-xs text-zinc-600 leading-snug">
                  Chaque rendez-vous débute par un échange approfondi afin de comprendre votre historique capillaire, votre mode de vie et vos attentes esthétiques.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/90 border border-rose-100 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl font-black text-pink-600">100%</div>
                <div className="text-xs text-zinc-600 font-medium">Diagnostic personnalisé</div>
              </div>
              <div className="bg-white/90 border border-rose-100 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl font-black text-zinc-900">24/7</div>
                <div className="text-xs text-zinc-600 font-medium">Prise de RDV en ligne</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEAM SECTION */}
      <section className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3">
            <User className="w-3.5 h-3.5 text-pink-500" />
            <span>L'Équipe d'Expertes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-serif italic">
            Rencontrez Nos Coiffeuses & Stylistes
          </h2>
          <p className="mt-3 text-zinc-600 text-sm sm:text-base">
            Des professionnelles passionnées, spécialisées dans les techniques de coloration, l'art des tresses et les soins sur-mesure.
          </p>
        </div>

        {staff.length === 0 ? (
          <EmptyState
            title="Notre équipe sera bientôt présentée en ligne"
            description="Nos coiffeuses et stylistes d'exception vous accueillent avec passion au salon. N'hésitez pas à nous contacter ou à réserver votre créneau directement."
            actionLabel="Prendre rendez-vous"
            actionHref="/reserver"
            icon={<User className="w-8 h-8 text-pink-500" />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-rose-100/90 rounded-3xl p-7 flex flex-col items-center text-center hover:shadow-xl hover:border-pink-300 transition-all duration-300 group"
              >
                {/* Avatar / Photo */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-rose-300 p-[3px] mb-5 group-hover:scale-105 transition-transform shadow-md">
                  {member.avatar_url ? (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={member.avatar_url}
                        alt={`${member.prenom} ${member.nom}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl font-bold text-pink-600">
                      {member.prenom ? member.prenom[0] : ''}
                      {member.nom ? member.nom[0] : ''}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-zinc-950 mb-1 group-hover:text-pink-600 transition-colors">
                  {member.prenom} {member.nom}
                </h3>

                {/* Speciality */}
                {member.specialite && (
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100 mb-4">
                    {member.specialite}
                  </span>
                )}

                {/* Bio */}
                {member.bio ? (
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 flex-1">
                    {member.bio}
                  </p>
                ) : (
                  <p className="text-xs text-zinc-400 italic mb-6 flex-1">
                    Styliste professionnelle passionnée par l'art du cheveu et les rituels bien-être.
                  </p>
                )}

                {/* Direct Booking CTA */}
                <div className="mt-auto w-full pt-4 border-t border-rose-100/60">
                  <Link
                    href={`/reserver?staff=${member.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-bold text-zinc-900 border border-zinc-900 hover:bg-zinc-950 hover:text-white transition-all active:scale-95 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-pink-500" />
                    <span>Prendre RDV avec {member.prenom}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-8 sm:p-12 text-center text-white shadow-xl shadow-pink-500/20">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif italic">
            Prête à sublimer votre chevelure ?
          </h2>
          <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
            Consultez notre carte de prestations ou réservez dès maintenant votre créneau en ligne en quelques clics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/reserver"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-pink-600 bg-white shadow-lg hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre rendez-vous</span>
            </Link>
            <Link
              href="/prestations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white border-2 border-white/60 hover:bg-white/10 hover:border-white transition-all"
            >
              <span>Voir les prestations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
