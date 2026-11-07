import React from 'react'
import { Star, Quote, Sparkles } from '@/components/ui/Icons'
import { siteConfig } from '@/config/site'

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 bg-[#faf8f4] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf9f0] border border-amber-600/30 text-amber-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Avis &amp; Retours Clientes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0e0c] tracking-tight">
            Elles Nous Font Confiance à {siteConfig.district}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Retours de nos clientes pour leurs prestations maquillage, coiffure et achats beauté chez {siteConfig.brandName}.
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
                    ? 'lg:col-span-2 bg-[#0f0e0c] text-white border border-amber-500/40 shadow-xl'
                    : 'bg-white text-[#0f0e0c] border border-amber-900/15 shadow-sm hover:border-amber-600/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div
                      className="flex items-center gap-1 text-amber-400"
                      aria-label={`Note : ${review.rating} sur 5 étoiles`}
                    >
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    {isFeatured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40">
                        Avis Coup de Cœur
                      </span>
                    )}
                  </div>

                  <Quote
                    className={`w-8 h-8 mb-3 ${
                      isFeatured ? 'text-amber-500/35' : 'text-amber-600/25'
                    }`}
                  />

                  <p
                    className={`italic leading-relaxed mb-6 ${
                      isFeatured
                        ? 'text-stone-100 text-base sm:text-lg font-serif'
                        : 'text-stone-700 text-sm'
                    }`}
                  >
                    &laquo; {review.comment} &raquo;
                  </p>
                </div>

                <div
                  className={`pt-4 border-t flex items-center justify-between ${
                    isFeatured ? 'border-stone-800' : 'border-amber-900/10'
                  }`}
                >
                  <div>
                    <div
                      className={`text-sm font-bold ${
                        isFeatured ? 'text-white' : 'text-[#0f0e0c]'
                      }`}
                    >
                      {review.name}
                    </div>
                    <div
                      className={`text-xs font-semibold ${
                        isFeatured ? 'text-amber-400' : 'text-amber-800'
                      }`}
                    >
                      {review.service}
                    </div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        isFeatured ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      {review.district}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] self-end ${
                      isFeatured ? 'text-stone-400' : 'text-stone-400'
                    }`}
                  >
                    {review.date}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
