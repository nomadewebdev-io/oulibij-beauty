'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  BOUTIQUE_CATEGORIES,
  type BoutiqueFilterCategory,
  type Product,
  type ProductCategory,
  getWhatsAppBoutiqueInquiryUrl,
  getWhatsAppProductOrderUrl,
} from '@/data/products'
import { siteConfig, getPhoneCallUrl } from '@/config/site'
import { formatCurrency } from '@/lib/utils'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import {
  Gem,
  Phone,
  ShoppingBag,
  Sparkles,
  WhatsAppBrand,
  ArrowRight,
} from '@/components/ui/Icons'

interface BoutiqueCatalogProps {
  products: Product[]
}

function getCategoryIcon(category: ProductCategory) {
  if (category === 'Parfums') return Gem
  if (category === 'Accessoires') return ShoppingBag
  return Sparkles
}

export function BoutiqueCatalog({ products }: BoutiqueCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<BoutiqueFilterCategory>('Tous')

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Tous') {
      return products
    }
    return products.filter((item) => item.category === selectedCategory)
  }, [products, selectedCategory])

  if (products.length === 0) {
    return (
      <div className="space-y-12">
        <RevealOnScroll>
          <div className="relative rounded-3xl bg-[#0f0e0c] border border-amber-500/40 p-7 sm:p-12 text-white shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Espace Boutique • {siteConfig.district}, {siteConfig.city}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif italic text-amber-200 leading-snug">
                  Notre sélection arrive bientôt, contactez-nous sur WhatsApp
                </h2>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
                  Nos cosmétiques, parfums et accessoires beauté sont disponibles directement au salon à{' '}
                  <strong className="text-white">{siteConfig.fullAddress}</strong>, tous les jours de 9h à 21h. Écrivez-nous sur WhatsApp pour recevoir les photos et tarifs des articles actuellement en rayon.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <a
                    href={getWhatsAppBoutiqueInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all min-h-[48px]"
                  >
                    <WhatsAppBrand className="w-4 h-4 text-white shrink-0" />
                    <span>Nous contacter sur WhatsApp</span>
                  </a>

                  <a
                    href={getPhoneCallUrl()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-amber-300 bg-stone-900 hover:bg-stone-800 border border-amber-500/40 hover:border-amber-400 transition-all min-h-[48px]"
                  >
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Appeler : {siteConfig.phone}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/35 shadow-xl group">
                  <Image
                    src="/images/hero-2.jpg"
                    alt={`Sélection Boutique ${siteConfig.brandName} à ${siteConfig.district}, ${siteConfig.city}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c] via-[#0f0e0c]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                        Sur place 7j/7 • 9h – 21h
                      </p>
                      <p className="text-xs text-stone-200 font-medium">
                        {siteConfig.payments.join(' • ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <RevealOnScroll className="lg:col-span-6" delayMs={60}>
            <a
              href={getWhatsAppBoutiqueInquiryUrl('Cosmétiques')}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-7 flex flex-col justify-between hover:-translate-y-1 hover:bg-white hover:border-amber-600/50 hover:shadow-xl hover:shadow-stone-950/5 transition-all duration-300 group"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Rayon Cosmétiques
                </span>
                <h3 className="text-xl font-extrabold text-[#0f0e0c] mt-1 mb-2 group-hover:text-amber-800 transition-colors">
                  Cosmétiques &amp; Soins Beauté
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Soins visage et corps, maquillage du teint et du regard, ainsi que soins capillaires sélectionnés par nos praticiennes.
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-amber-900/10 inline-flex items-center gap-2 text-xs font-bold text-[#0f0e0c] group-hover:text-amber-800">
                <span>Demander les disponibilités sur WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </RevealOnScroll>

          <RevealOnScroll className="lg:col-span-3" delayMs={120}>
            <a
              href={getWhatsAppBoutiqueInquiryUrl('Parfums')}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full bg-white border border-amber-900/15 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-600/50 hover:shadow-xl hover:shadow-stone-950/5 transition-all duration-300 group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Gem className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Rayon Parfumerie
                </span>
                <h3 className="text-lg font-extrabold text-[#0f0e0c] mt-1 mb-2 group-hover:text-amber-800 transition-colors">
                  Parfums &amp; Brumes
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Eaux de parfum, essences orientales et brumes parfumées au sillage élégant à tester au salon.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-amber-900/10 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <span>Voir sur WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </RevealOnScroll>

          <RevealOnScroll className="lg:col-span-3" delayMs={180}>
            <a
              href={getWhatsAppBoutiqueInquiryUrl('Accessoires')}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full bg-white border border-amber-900/15 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-600/50 hover:shadow-xl hover:shadow-stone-950/5 transition-all duration-300 group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0f0e0c] border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Rayon Finitions
                </span>
                <h3 className="text-lg font-extrabold text-[#0f0e0c] mt-1 mb-2 group-hover:text-amber-800 transition-colors">
                  Accessoires Beauté
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Cils, barrettes dorées, bijoux de cheveux, bonnets en satin et accessoires de coiffage.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-amber-900/10 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <span>Voir sur WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </RevealOnScroll>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div
        className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2 no-scrollbar"
        role="tablist"
        aria-label="Filtrer les produits par catégorie"
      >
        {BOUTIQUE_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category
          const count =
            category === 'Tous'
              ? products.length
              : products.filter((item) => item.category === category).length

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 min-h-[44px] ${
                isSelected
                  ? 'bg-[#0f0e0c] text-amber-300 border border-amber-500/50 shadow-lg shadow-stone-950/15'
                  : 'bg-[#faf8f4] text-stone-700 hover:bg-amber-50 hover:text-[#0f0e0c] border border-amber-900/15'
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isSelected ? 'bg-amber-400 text-[#0f0e0c]' : 'bg-amber-100 text-amber-900'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl bg-[#faf8f4] border border-amber-900/15 p-10 text-center space-y-4">
          <p className="text-base font-bold text-[#0f0e0c]">
            Aucun produit répertorié dans la catégorie « {selectedCategory} » pour le moment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedCategory('Tous')}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] border border-amber-500/40 cursor-pointer min-h-[44px]"
            >
              Afficher tous les produits
            </button>
            <a
              href={getWhatsAppBoutiqueInquiryUrl(
                selectedCategory === 'Tous' ? undefined : selectedCategory
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 min-h-[44px]"
            >
              <WhatsAppBrand className="w-3.5 h-3.5 text-white" />
              <span>Demander sur WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product, index) => {
            const CategoryIcon = getCategoryIcon(product.category)
            const hasPrice = typeof product.price === 'number' && product.price > 0
            const whatsappOrderUrl = getWhatsAppProductOrderUrl(product.name, product.price)

            return (
              <RevealOnScroll key={product.id} delayMs={(index % 3) * 70}>
                <article className="h-full bg-[#faf8f4] border border-amber-900/15 rounded-3xl overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 hover:bg-white hover:border-amber-500/60 hover:shadow-2xl hover:shadow-stone-950/10 transition-all duration-300 group">
                  <div>
                    <div className="relative aspect-[4/5] w-full bg-[#0f0e0c] overflow-hidden border-b border-amber-900/10">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={`${product.name} — ${product.category} ${siteConfig.brandName}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-400">
                          <CategoryIcon className="w-12 h-12 opacity-60" />
                        </div>
                      )}

                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-[#0f0e0c] px-3 py-1 rounded-full border border-amber-500/40 shadow-sm">
                          <CategoryIcon className="w-3 h-3 text-amber-400" />
                          <span>{product.category}</span>
                        </span>

                        {!product.available && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-200 bg-stone-900 px-2.5 py-1 rounded-full border border-stone-700">
                            Sur demande
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pb-4">
                      <h3 className="text-lg font-bold text-[#0f0e0c] group-hover:text-amber-800 transition-colors leading-snug mb-2">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline justify-between gap-2">
                        {hasPrice ? (
                          <span className="text-xl font-black text-[#0f0e0c]">
                            {formatCurrency(product.price!)}
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-amber-800 bg-[#fdf9f0] px-3 py-1 rounded-full border border-amber-500/30">
                            Prix sur WhatsApp
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 mt-auto">
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 shadow-sm hover:shadow-md active:scale-95 transition-all min-h-[46px]"
                    >
                      <WhatsAppBrand className="w-4 h-4 text-white shrink-0" />
                      <span>Commander sur WhatsApp</span>
                    </a>
                  </div>
                </article>
              </RevealOnScroll>
            )
          })}
        </div>
      )}
    </div>
  )
}
