import React from 'react'
import { Star, Quote, Sparkles } from '@/components/ui/Icons'
import { siteConfig } from '@/config/site'

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
            Découvrez les retours de nos clientes après leur passage dans notre salon à {siteConfig.district}, {siteConfig.city}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {siteConfig.reviews.map((review, index) => {
            const isFeatured = index === 0
            return (
              <div
                key={index}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'lg:col-span-2 bg-white border-2 border-rose-200/90 shadow-md shadow-rose-900/5'
                    : 'bg-white border border-rose-100 shadow-sm hover:border-rose-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-1 text-rose-500" aria-label={`Note : ${review.rating} sur 5 étoiles`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-rose-500 fill-rose-500" />
                      ))}
                    </div>
                    {isFeatured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        Expérience Recommandée
                      </span>
                    )}
                  </div>

                  <Quote className="w-8 h-8 text-rose-200 mb-3" />

                  <p className={`text-zinc-800 italic leading-relaxed mb-6 ${isFeatured ? 'text-base sm:text-lg font-serif' : 'text-sm'}`}>
                    &laquo; {review.comment} &raquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-rose-50 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-zinc-950">{review.name}</div>
                    <div className="text-xs text-rose-700 font-semibold">{review.service}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{review.district}</div>
                  </div>
                  <span className="text-[11px] text-zinc-400 self-end">{review.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
