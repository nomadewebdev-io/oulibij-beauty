import React from 'react'
import { Star, Quote, Sparkles } from '@/components/ui/Icons'
import { CLIENT_REVIEWS } from '@/lib/constants'

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 bg-rose-50/40 border-t border-rose-100/70">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Avis & Témoignages Clientes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            La Confiance de Nos Clientes
          </h2>
          <p className="mt-3 text-zinc-600 text-sm sm:text-base">
            Découvrez les retours de nos clientes dakaroises après leur passage dans notre salon des Almadies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_REVIEWS.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-rose-100 rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-rose-300 transition-all duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-rose-200 mb-4" />
                <div className="flex items-center gap-1 mb-4 text-rose-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-rose-500 fill-rose-500" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700 italic leading-relaxed mb-6">
                  &laquo; {review.comment} &raquo;
                </p>
              </div>

              <div className="pt-4 border-t border-rose-50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-zinc-950">{review.name}</div>
                  <div className="text-xs text-rose-600 font-semibold">{review.service}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{review.district}</div>
                </div>
                <span className="text-[11px] text-zinc-400 self-end">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
