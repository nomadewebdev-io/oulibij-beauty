import React from 'react'
import { Badge } from '@/components/ui/Badge'
import { Star, Quote } from '@/components/ui/Icons'

const REVIEWS = [
  {
    name: 'Sarah M.',
    service: 'Balayage & Soin Kératine',
    comment: 'Une expérience haut de gamme ! Aminata a parfaitement compris ce que je souhaitais pour mon balayage. Mes cheveux sont ultra brillants et soyeux.',
    rating: 5,
    date: 'Il y a 2 semaines',
  },
  {
    name: 'Mamadou T.',
    service: 'Braids & Traçage Net',
    comment: 'Yannick est un véritable artiste. Les tresses sont régulières, sans aucune douleur au cuir chevelu. Le salon est propre, moderne et très accueillant.',
    rating: 5,
    date: 'Il y a 1 mois',
  },
  {
    name: 'Élodie D.',
    service: 'Coupe & Brushing VIP',
    comment: 'Le meilleur salon de coiffure ! L\'ambiance est relaxante, la ponctualité exemplaire et le résultat dépasse toujours mes attentes. Je recommande les yeux fermés.',
    rating: 5,
    date: 'Il y a 3 semaines',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" className="mb-4">
            Témoignages & Avis
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            La Satisfaction de Nos Clients
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Plus de 98% de nos clients nous recommandent pour notre professionnalisme et la qualité irréprochable de nos soins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <div
              key={index}
              className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 relative flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-500/20 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-zinc-100">{review.name}</div>
                  <div className="text-xs text-amber-400">{review.service}</div>
                </div>
                <span className="text-[11px] text-zinc-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
