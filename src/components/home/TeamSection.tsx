import React from 'react'
import { Staff } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Sparkles, Calendar } from '@/components/ui/Icons'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const DEFAULT_STAFF: Staff[] = [
  {
    id: 'st1',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Diallo',
    prenom: 'Aminata',
    specialite: 'Master Styliste & Coloriste',
    bio: '12 ans d’expérience en salons prestigieux parisiens. Passionnée de transformations, balayages lumineux et visagisme.',
    avatar_url: null,
    email: 'aminata@oulibij-salon.fr',
    telephone: '+33 6 11 22 33 44',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'st2',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Koffi',
    prenom: 'Yannick',
    specialite: 'Artiste Braider & Soins Texturés',
    bio: 'Virtuose des tresses géométriques, nattes artistiques, box braids et soins profonds pour cheveux frisés et crépus.',
    avatar_url: null,
    email: 'yannick@oulibij-salon.fr',
    telephone: '+33 6 22 33 44 55',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'st3',
    salon_id: '00000000-0000-0000-0000-000000000001',
    user_id: null,
    nom: 'Laurent',
    prenom: 'Chloé',
    specialite: 'Barber & Coiffeuse Visagiste',
    bio: 'Spécialiste des coupes précises hommes & femmes, soins botox restructurants et lissages brésiliens soyeux.',
    avatar_url: null,
    email: 'chloe@oulibij-salon.fr',
    telephone: '+33 6 33 44 55 66',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

interface TeamSectionProps {
  initialStaff?: Staff[]
}

export function TeamSection({ initialStaff }: TeamSectionProps) {
  const staffMembers = (initialStaff && initialStaff.length > 0) ? initialStaff : DEFAULT_STAFF

  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" className="mb-4">
            Notre Équipe d'Experts
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Des Passionnés au Service de Votre Image
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Chaque membre de l'équipe OULIBIJ apporte son savoir-faire unique, sa sensibilité artistique et son écoute attentive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {staffMembers.map((member) => (
            <div
              key={member.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center hover:border-amber-500/40 hover:bg-zinc-900/90 transition-all duration-300 group"
            >
              {/* Avatar placeholder with luxury monogram */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-[2px] mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-xl font-bold text-amber-400">
                  {member.prenom[0]}{member.nom[0]}
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-100 mb-1">
                {member.prenom} {member.nom}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {member.specialite}
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {member.bio}
              </p>

              <div className="mt-auto w-full pt-4 border-t border-zinc-800/80">
                <Link href={`/rendez-vous?staff=${member.id}`} className="w-full block">
                  <Button variant="outline" size="sm" className="w-full justify-center gap-2 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Choisir {member.prenom}</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
