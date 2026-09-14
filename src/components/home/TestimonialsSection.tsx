import React from 'react'
import { Star, Quote, Sparkles } from '@/components/ui/Icons'

const REVIEWS = [
  {
    name: 'Sarah M.',
    service: 'Balayage & Soin Kératine',
    comment: 'Une expérience haut de gamme ! Aminata a parfaitement compris ce que je souhaitais pour mon balayage. Mes cheveux sont ultra brillants et soyeux.',
    rating: 5,
    date: 'Il y a 2 semaines',
  },
  {
    name: 'Aïcha D.',
    service: 'Braids & Traçage Parfait',
    comment: 'Yannick est un véritable artiste. Les tresses sont régulières, légères et sans aucune douleur. Le salon est chaleureux, propre et apaisant.',
    rating: 5,
    date: 'Il y a 1 mois',
  },
  {
    name: 'Élodie L.',
    service: 'Coupe & Brushing VIP',
    comment: 'Le meilleur salon de coiffure ! L\'ambiance est relaxante, la ponctualité exemplaire et le résultat dépasse toujours mes attentes. Je recommande !',
    rating: 5,
    date: 'Il y a 3 semaines',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 bg-pink-50/30 border-t border-rose-100/70">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Avis & Témoignages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            La Satisfaction de Nos Clientes
          </h2>
          <p className="mt-3 text-zinc-600 text-sm sm:text-base">
            Plus de 98% de clientes fidèles satisfaites par notre écoute et la qualité de nos prestations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-rose-100 rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-pink-300 transition-all duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-pink-200 mb-4" />
                <div className="flex items-center gap-1 mb-4 text-pink-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-pink-500" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700 italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-rose-50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-zinc-950">{review.name}</div>
                  <div className="text-xs text-pink-600 font-semibold">{review.service}</div>
                </div>
                <span className="text-[11px] text-zinc-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
