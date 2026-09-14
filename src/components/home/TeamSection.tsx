import React from 'react'
import Image from 'next/image'
import { Staff } from '@/types'
import { Sparkles, Calendar, User } from '@/components/ui/Icons'
import { EmptyState } from '@/components/ui/EmptyState'
import Link from 'next/link'

interface TeamSectionProps {
  initialStaff?: Staff[]
}

export function TeamSection({ initialStaff = [] }: TeamSectionProps) {
  const staffMembers = initialStaff || []

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 bg-pink-50/40 border-t border-rose-100/70">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Notre Équipe d'Expertes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Des Passionnées à Votre Écoute
          </h2>
          <p className="mt-3 text-zinc-600 text-sm sm:text-base">
            Chaque membre de l'équipe OULIBIJ apporte sa sensibilité artistique pour sublimer vos envies.
          </p>
        </div>

        {staffMembers.length === 0 ? (
          <EmptyState
            title="Notre équipe sera bientôt présentée en ligne"
            description="Nos coiffeuses et stylistes vous accueillent chaleureusement au salon."
            actionLabel="Nous contacter"
            actionHref="/contact"
            icon={<User className="w-8 h-8 text-pink-500" />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staffMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-rose-100 rounded-3xl p-7 flex flex-col items-center text-center hover:shadow-xl hover:border-pink-300 transition-all duration-300 group"
              >
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-300 p-[2px] mb-5 group-hover:scale-105 transition-transform">
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
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg font-bold text-pink-600">
                      {member.prenom ? member.prenom[0] : ''}
                      {member.nom ? member.nom[0] : ''}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-zinc-950 mb-1">
                  {member.prenom} {member.nom}
                </h3>
                {member.specialite && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-pink-600 mb-3">
                    {member.specialite}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-6">
                  {member.bio}
                </p>

                <div className="mt-auto w-full pt-4 border-t border-rose-100/60">
                  <Link
                    href={`/reserver?staff=${member.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-bold text-zinc-900 border border-zinc-900 hover:bg-zinc-950 hover:text-white transition-all active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5 text-pink-500" />
                    <span>Prendre RDV avec {member.prenom}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
