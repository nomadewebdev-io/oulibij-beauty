import React from 'react'
import Image from 'next/image'
import { Staff } from '@/types'
import { Sparkles, WhatsAppBrand } from '@/components/ui/Icons'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'

interface TeamSectionProps {
  initialStaff?: Staff[]
}

export function TeamSection({ initialStaff = [] }: TeamSectionProps) {
  const staffMembers =
    initialStaff.length > 0 ? initialStaff : (siteConfig.staff as unknown as Staff[])

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 bg-[#faf8f4] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Savoir-Faire • {siteConfig.district}, {siteConfig.city}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0e0c] tracking-tight">
            Trois Univers au Service de Votre Beauté
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Du maquillage de cérémonie à la pose lace jusqu&apos;à la parfumerie, l&apos;équipe{' '}
            <strong className="text-[#0f0e0c]">{siteConfig.brandName}</strong> vous accompagne tous les jours de 9h à 21h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {staffMembers.map((member, index) => {
            const isPrimaryPole = index === 0
            return (
              <div
                key={member.id}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 group ${
                  isPrimaryPole
                    ? 'lg:col-span-6 bg-[#0f0e0c] text-white border border-amber-500/40 shadow-xl'
                    : 'lg:col-span-3 bg-white text-[#0f0e0c] border border-amber-900/15 hover:border-amber-600/50 shadow-sm'
                }`}
              >
                <div className="flex flex-col items-start text-left">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 p-[2px] mb-5 group-hover:scale-105 transition-transform">
                    {member.avatar_url ? (
                      <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                        <Image
                          src={member.avatar_url}
                          alt={`${member.prenom} ${member.nom} — ${siteConfig.brandName}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-[14px] bg-[#0f0e0c] flex items-center justify-center text-lg font-bold text-amber-300">
                        OB
                      </div>
                    )}
                  </div>

                  <h3
                    className={`text-lg font-bold mb-1 ${
                      isPrimaryPole ? 'text-white' : 'text-[#0f0e0c]'
                    }`}
                  >
                    {member.prenom} {member.nom}
                  </h3>

                  {member.specialite && (
                    <p
                      className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                        isPrimaryPole ? 'text-amber-400' : 'text-amber-800'
                      }`}
                    >
                      {member.specialite}
                    </p>
                  )}

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isPrimaryPole ? 'text-stone-300' : 'text-stone-600'
                    }`}
                  >
                    {member.bio}
                  </p>
                </div>

                <div
                  className={`mt-auto w-full pt-4 border-t ${
                    isPrimaryPole ? 'border-stone-800' : 'border-amber-900/10'
                  }`}
                >
                  <a
                    href={getWhatsAppBookingUrl(`${member.prenom} ${member.nom}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all active:scale-95 min-h-[44px]"
                    aria-label={`Contacter le ${member.prenom} sur WhatsApp`}
                  >
                    <WhatsAppBrand className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>Échanger sur WhatsApp</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
