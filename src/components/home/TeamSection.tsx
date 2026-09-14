import React from 'react'
import { Staff } from '@/types'
import { Sparkles, Calendar } from '@/components/ui/Icons'
import Link from 'next/link'

const DEFAULT_STAFF: Staff[] = [
  {
    id: 'st1',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Diallo',
    prenom: 'Aminata',
    specialite: 'Master Styliste & Coloriste',
    bio: '12 ans d’expérience en haute coiffure. Spécialiste des transformations éclat, balayages lumineux et visagisme féminin.',
    avatar_url: null,
    email: 'aminata@oulibij-beauty.fr',
    telephone: '+33 6 11 22 33 44',
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'st2',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Koffi',
    prenom: 'Yannick',
    specialite: 'Artiste Braider & Soins Texturés',
    bio: 'Virtuose des tresses géométriques, nattes artistiques, box braids et soins intenses pour cheveux texturés.',
    avatar_url: null,
    email: 'yannick@oulibij-beauty.fr',
    telephone: '+33 6 22 33 44 55',
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'st3',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Laurent',
    prenom: 'Chloé',
    specialite: 'Styliste Soins & Lissages',
    bio: 'Experte en soins botox réparateurs, lissages brésiliens et brushings soyeux longue durée.',
    avatar_url: null,
    email: 'chloe@oulibij-beauty.fr',
    telephone: '+33 6 33 44 55 66',
    is_active: true,
    created_at: '',
    updated_at: '',
  },
]

interface TeamSectionProps {
  initialStaff?: Staff[]
}

export function TeamSection({ initialStaff }: TeamSectionProps) {
  const staffMembers = (initialStaff && initialStaff.length > 0) ? initialStaff : DEFAULT_STAFF

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staffMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-rose-100 rounded-3xl p-7 flex flex-col items-center text-center hover:shadow-xl hover:border-pink-300 transition-all duration-300 group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-300 p-[2px] mb-5 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg font-bold text-pink-600">
                  {member.prenom[0]}{member.nom[0]}
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-950 mb-1">
                {member.prenom} {member.nom}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-pink-600 mb-3">
                {member.specialite}
              </p>
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
      </div>
    </section>
  )
}
