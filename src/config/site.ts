/**
 * ============================================================================
 * SITE CONFIGURATION - OULIBIJ BEAUTY (TEMPLATE MULTI-SALON)
 * ============================================================================
 * FICHIER UNIQUE : Tout ce qui change d'un salon à l'autre est centralisé ici.
 * Pour adapter ce site à un nouveau salon en 10 minutes :
 * 1. Mettez à jour les coordonnées, textes et numéro WhatsApp ci-dessous.
 * 2. Modifiez la palette de couleurs si vous souhaitez un autre thème visuel.
 * 3. Personnalisez la liste des prestations (avec tarifs en FCFA), l'équipe et les avis.
 * 4. Remplacez les images dans /public/images/
 * ============================================================================
 */

export interface SalonOpeningHour {
  day: string
  hours: string
  isOpen: boolean
}

export interface SalonServiceItem {
  id: string
  salon_id: string
  nom: string
  description: string
  categorie: string
  duree_minutes: number
  prix: number // en FCFA
  image_url: string
  is_active: boolean
  necessite_essai: boolean
  created_at: string
  updated_at: string
}

export interface SalonStaffMember {
  id: string
  salon_id: string
  user_id?: string | null
  nom: string
  prenom: string
  specialite: string
  bio: string
  avatar_url: string
  email: string
  telephone: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SalonRealisation {
  id: string
  salon_id: string
  staff_id: string | null
  titre: string
  description: string
  image_url: string
  categorie: string
  date_realisation: string
  created_at: string
  updated_at: string
}

export interface SalonReview {
  name: string
  district: string
  service: string
  comment: string
  rating: number
  date: string
}

export interface HeroHighlight {
  icon: 'Scissors' | 'Sparkles' | 'ShieldCheck'
  title: string
  description: string
}

export interface SiteConfig {
  id: string
  name: string
  brandName: string
  slug: string
  tagline: string
  description: string
  shortDescription: string

  // Localisation & contact
  address: string
  district: string
  city: string
  country: string
  landmarks: string
  phone: string
  whatsappRaw: string // format international sans +, ex: 221778451234
  whatsappDisplay: string // ex: +221 77 845 12 34
  email: string

  // Réseaux sociaux
  socials: {
    instagram: string
    tiktok: string
    facebook: string
  }

  // Moyens de paiement acceptés
  payments: string[]

  // Horaires
  openingHours: SalonOpeningHour[]

  // Thème visuel & Couleurs (variables CSS)
  theme: {
    primary: string
    primaryHover: string
    primaryLight: string
    primaryBorder: string
    accent: string // WhatsApp & CTA secondaire
    accentHover: string
    accentLight: string
    backgroundWarm: string
    surface: string
    textDark: string
    textMuted: string
  }

  // SEO & OpenGraph
  seo: {
    siteUrl: string
    defaultTitle: string
    titleTemplate: string
    metaDescription: string
    keywords: string[]
    locale: string
    ogImage: {
      url: string
      width: number
      height: number
      alt: string
    }
    twitterHandle?: string
  }

  // Contenus éditoriaux du Hero
  hero: {
    badge: string
    titleLine1: string
    titleLine2: string
    ctaWhatsApp: string
    ctaDiscover: string
    highlights: HeroHighlight[]
  }

  // Prestations & Tarifs (en FCFA)
  categories: string[]
  services: SalonServiceItem[]

  // Équipe
  staff: SalonStaffMember[]

  // Réalisations Lookbook
  realisations: SalonRealisation[]

  // Avis clientes
  reviews: SalonReview[]

  // Navigation
  navLinks: Array<{ label: string; href: string }>
}

export const siteConfig: SiteConfig = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'OULIBIJ BEAUTY',
  brandName: 'Oulibij Beauty',
  slug: 'oulibij-beauty',
  tagline: "L'art de la haute coiffure & des soins d'exception à Dakar",
  description:
    "Salon de coiffure & mise en beauté féminine haut de gamme aux Almadies, Dakar. Spécialiste des tresses d'art (knotless braids, nattes stylisées), soins botox & kératine, colorations lumineuses et coiffures d'apparat.",
  shortDescription:
    "Haute coiffure féminine aux Almadies, Dakar : tresses d'art, soins réparateurs botox & kératine, balayages lumineux.",

  // Localisation
  address: 'Route des Almadies, en face du Club Olympique',
  district: 'Almadies',
  city: 'Dakar',
  country: 'Sénégal',
  landmarks: 'En face du Club Olympique, parking facile et surveillé',
  phone: '+221 33 820 00 00',
  whatsappRaw: '221778451234',
  whatsappDisplay: '+221 77 845 12 34',
  email: 'contact@oulibij-beauty.sn',

  // Réseaux sociaux
  socials: {
    instagram: 'https://instagram.com/oulibij_beauty',
    tiktok: 'https://tiktok.com/@oulibij_dakar',
    facebook: 'https://facebook.com/oulibij.beauty',
  },

  // Moyens de paiement
  payments: ['Wave', 'Orange Money', 'Free Money', 'Espèces'],

  // Horaires
  openingHours: [
    { day: 'Lundi - Jeudi', hours: '09:00 - 20:00', isOpen: true },
    { day: 'Vendredi - Samedi', hours: '08:30 - 20:30', isOpen: true },
    { day: 'Dimanche', hours: 'Sur privatisation exclusive', isOpen: false },
  ],

  // Thème visuel (palette sobre, élégante & anti-clichés IA)
  theme: {
    primary: '#be123c', // Rose profond / carmin haute couture (évite les roses fluo/violet néon)
    primaryHover: '#9f1239',
    primaryLight: '#fff1f2',
    primaryBorder: '#fecdd3',
    accent: '#059669', // Vert émeraude WhatsApp
    accentHover: '#047857',
    accentLight: '#ecfdf5',
    backgroundWarm: '#f7f2ee', // Nude chaud élégant
    surface: '#ffffff',
    textDark: '#18181b',
    textMuted: '#52525b',
  },

  // SEO & Open Graph
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://oulibij-beauty.sn',
    defaultTitle: "OULIBIJ BEAUTY | Salon de Coiffure & Soins Féminins d'Exception aux Almadies, Dakar",
    titleTemplate: '%s | OULIBIJ BEAUTY Dakar',
    metaDescription:
      "OULIBIJ BEAUTY aux Almadies (Dakar) : tresses d'art (knotless braids), soins botox & kératine, balayages lumineux, coupes sur-mesure. Réservation directe sans attente sur WhatsApp.",
    keywords: [
      'salon de coiffure Dakar',
      'OULIBIJ BEAUTY',
      'coiffure femme Dakar',
      'Almadies',
      'tresses knotless Dakar',
      'braids Dakar',
      'soin botox capillaire',
      'lissage brésilien Dakar',
      'balayage Dakar',
      'salon de beauté Sénégal',
    ],
    locale: 'fr_SN',
    ogImage: {
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: "OULIBIJ BEAUTY Dakar - Salon de Haute Coiffure Féminine aux Almadies",
    },
    twitterHandle: '@oulibij_beauty',
  },

  // Hero Section
  hero: {
    badge: 'Salon de Coiffure & Esthétique Féminine',
    titleLine1: 'Révélez Votre Éclat,',
    titleLine2: 'Sublimez Votre Chevelure.',
    ctaWhatsApp: 'Réserver sur WhatsApp',
    ctaDiscover: 'Découvrir nos soins',
    highlights: [
      {
        icon: 'Scissors',
        title: 'Coupe & Brushing Signature',
        description: 'Stylisme haute précision & brillance soyeuse',
      },
      {
        icon: 'Sparkles',
        title: 'Tresses & Braids d’Art',
        description: 'Knotless, vanilles & nattes sans traction',
      },
      {
        icon: 'ShieldCheck',
        title: 'Soins Botox & Kératine',
        description: 'Nutrition intense pour sublimer chaque chevelure',
      },
    ],
  },

  // Catégories de services
  categories: [
    'Tous',
    'Coupe & Coiffage',
    'Tresses & Braids',
    'Soins & Traitements',
    'Lissages & Détente',
    'Coloration & Balayage',
    'Maquillage & Mariée',
  ],

  // Liste complète des prestations en Franc CFA
  services: [
    {
      id: '00000000-0000-0001-0001-000000000001',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Coupe & Brushing Signature',
      description:
        'Diagnostic personnalisé de la fibre, shampoing massant relaxant, coupe sur-mesure et brushing éclat soyeux.',
      categorie: 'Coupe & Coiffage',
      duree_minutes: 50,
      prix: 15000,
      image_url: '/images/hero-1.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000002',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Nattes Collées & Traçage d’Art',
      description:
        'Nattes collées graphiques, design sur-mesure avec finitions soignées et protection du cuir chevelu sans traction.',
      categorie: 'Tresses & Braids',
      duree_minutes: 90,
      prix: 20000,
      image_url: '/images/hero-3.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000003',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Box Braids & Knotless Goddess',
      description:
        'Tresses knotless ultra légères, racines souples et naturelles, longue tenue avec embouts plongeants soyeux.',
      categorie: 'Tresses & Braids',
      duree_minutes: 150,
      prix: 30000,
      image_url: '/images/hero-3.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000004',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Soin Botox Capillaire Réparateur',
      description:
        'Cure de rajeunissement thermo-active à l’acide hyaluronique et collagène : répare la fibre, stoppe la casse et apporte un miroir d’éclat.',
      categorie: 'Soins & Traitements',
      duree_minutes: 75,
      prix: 25000,
      image_url: '/images/hero-2.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000005',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Lissage Brésilien Organique',
      description:
        'Formule professionnelle sans formol enrichie en kératine végétale et huiles d’argan : chevelure détendue, souple et disciplinée pendant 4 mois.',
      categorie: 'Lissages & Détente',
      duree_minutes: 150,
      prix: 45000,
      image_url: '/images/hero-1.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000006',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Balayage Soleil & Patine Gloss',
      description:
        'Éclaircissement délicat et fondu naturel, patine sur-mesure pour reflets caramel ou miel doré, accompagné d’un masque nutri-protecteur.',
      categorie: 'Coloration & Balayage',
      duree_minutes: 110,
      prix: 35000,
      image_url: '/images/hero-4.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000007',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Soin Profond aux Huiles Précieuses',
      description:
        'Bain d’huiles précieuses tiédies (baobab, ricin et karité pur), vapeur ozonée pour ouvrir les écailles et massage crânien apaisant.',
      categorie: 'Soins & Traitements',
      duree_minutes: 60,
      prix: 18000,
      image_url: '/images/hero-2.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000008',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Chignon d’Apparat & Coiffure Cérémonie',
      description:
        'Attaches sophistiquées, chignon bas haute couture ou volume sculpté pour vos réceptions, galas et événements d’exception.',
      categorie: 'Coupe & Coiffage',
      duree_minutes: 70,
      prix: 25000,
      image_url: '/images/hero-1.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000009',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Maquillage Jour Éclat Naturel',
      description:
        'Teint velouté lumineux, travail des sourcils et mise en valeur délicate du regard adapté à la lumière du jour.',
      categorie: 'Maquillage & Mariée',
      duree_minutes: 45,
      prix: 15000,
      image_url: '/images/hero-4.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000010',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Maquillage Soirée & Grand Événement',
      description:
        'Teint zéro défaut haute tenue, regard charbonneux ou liner graphique, contouring subtil et pose de faux cils offerte.',
      categorie: 'Maquillage & Mariée',
      duree_minutes: 60,
      prix: 25000,
      image_url: '/images/hero-4.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000011',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Pack Mariée Royale (Coiffure + Maquillage + Essai)',
      description:
        'Accompagnement complet pour le jour J : séance d’essai préalable, préparation de la chevelure, coiffure couture et maquillage waterproof longue tenue.',
      categorie: 'Maquillage & Mariée',
      duree_minutes: 150,
      prix: 60000,
      image_url: '/images/hero-1.jpg',
      is_active: true,
      necessite_essai: true,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
  ],

  // Équipe d'expertes
  staff: [
    {
      id: '00000000-0000-0002-0001-000000000001',
      salon_id: '00000000-0000-0000-0000-000000000001',
      user_id: null,
      nom: 'Ndiaye',
      prenom: 'Aminata',
      specialite: 'Master Styliste & Coloriste',
      bio: '12 ans d’expérience en visagisme et stylisme haute coiffure. Spécialiste des balayages fondus, coupes personnalisées et métamorphoses éclat.',
      avatar_url: '/images/hero-1.jpg',
      email: 'aminata@oulibij-beauty.sn',
      telephone: '+221 77 845 12 34',
      is_active: true,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0002-0001-000000000002',
      salon_id: '00000000-0000-0000-0000-000000000001',
      user_id: null,
      nom: 'Sow',
      prenom: 'Fatou Kiné',
      specialite: 'Artiste Braider & Tresses Africaines',
      bio: 'Virtuose du traçage géométrique, des box braids knotless et des nattes artistiques d’une légèreté incomparable, sans aucune douleur.',
      avatar_url: '/images/hero-3.jpg',
      email: 'fatoukine@oulibij-beauty.sn',
      telephone: '+221 77 845 12 34',
      is_active: true,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0002-0001-000000000003',
      salon_id: '00000000-0000-0000-0000-000000000001',
      user_id: null,
      nom: 'Ba',
      prenom: 'Aïssatou',
      specialite: 'Praticienne Soins Botox, Kératine & Lissages',
      bio: 'Experte du diagnostic capillaire approfondi et des protocoles de réparation intense pour cheveux afro, frisés et sensibilisés.',
      avatar_url: '/images/hero-2.jpg',
      email: 'aissatou@oulibij-beauty.sn',
      telephone: '+221 77 845 12 34',
      is_active: true,
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
  ],

  // Réalisations (Lookbook)
  realisations: [
    {
      id: '00000000-0000-0003-0001-000000000001',
      salon_id: '00000000-0000-0000-0000-000000000001',
      staff_id: null,
      titre: 'Brushing Wavy Éclat & Volume Soyeux',
      description: 'Ondulations souples et soyeuses créées sur mesure avec thermo-protection.',
      image_url: '/images/hero-1.jpg',
      categorie: 'Coupe & Coiffage',
      date_realisation: '2026-10-10',
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0003-0001-000000000002',
      salon_id: '00000000-0000-0000-0000-000000000001',
      staff_id: null,
      titre: 'Box Braids Knotless & Finitions Nettes',
      description: 'Tresses géométriques régulières et ultra légères, racines douces.',
      image_url: '/images/hero-3.jpg',
      categorie: 'Tresses & Braids',
      date_realisation: '2026-10-12',
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0003-0001-000000000003',
      salon_id: '00000000-0000-0000-0000-000000000001',
      staff_id: null,
      titre: 'Balayage Soleil & Nuances Caramel Fondues',
      description: 'Éclaircissement naturel sans démarcation et reflets miroir étincelants.',
      image_url: '/images/hero-4.jpg',
      categorie: 'Coloration & Balayage',
      date_realisation: '2026-10-15',
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0003-0001-000000000004',
      salon_id: '00000000-0000-0000-0000-000000000001',
      staff_id: null,
      titre: 'Soin Botox Capillaire Réparateur Intense',
      description: 'Régénération complète de la fibre capillaire et souplesse éclatante.',
      image_url: '/images/hero-2.jpg',
      categorie: 'Soins & Traitements',
      date_realisation: '2026-10-18',
      created_at: '2026-09-14T00:00:00.000Z',
      updated_at: '2026-09-14T00:00:00.000Z',
    },
  ],

  // Avis clientes dakaroises
  reviews: [
    {
      name: 'Marième Diop',
      district: 'Almadies, Dakar',
      service: 'Soin Botox & Brushing Signature',
      comment:
        'Une expérience d’exception aux Almadies ! Aminata a diagnostiqué exactement les besoins de mes cheveux. Le soin botox combiné au brushing leur a redonné une souplesse et une brillance incroyables pendant plusieurs semaines.',
      rating: 5,
      date: 'Il y a 1 semaine',
    },
    {
      name: 'Fatoumata Binetou Sy',
      district: 'Plateau, Dakar',
      service: 'Knotless Braids d’Art',
      comment:
        'Fatou Kiné est une virtuose des tresses. Le traçage est millimétré, les mèches sont légères et surtout : aucune traction douloureuse sur les tempes. Prise de rendez-vous directe sur WhatsApp ultra pratique !',
      rating: 5,
      date: 'Il y a 2 semaines',
    },
    {
      name: 'Awa Coulibaly',
      district: 'Mermoz, Dakar',
      service: 'Balayage Miel & Soin Réparateur',
      comment:
        'Le meilleur salon de Dakar pour les colorations soignées. Les nuances fondues sont sublimes et mes cheveux sont restés parfaitement hydratés. Accueil chaleureux, salon d’une propreté exemplaire.',
      rating: 5,
      date: 'Il y a 3 semaines',
    },
  ],

  // Liens de navigation
  navLinks: [
    { label: 'Accueil', href: '/' },
    { label: 'Prestations & Tarifs', href: '/prestations' },
    { label: 'Réalisations', href: '/realisations' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
  ],
}

/**
 * Helper WhatsApp URL generator
 */
export function getWhatsAppBookingUrl(serviceName?: string): string {
  const message = serviceName
    ? `Bonjour, je souhaite réserver : ${serviceName}`
    : `Bonjour, je souhaite réserver une prestation chez ${siteConfig.brandName}`
  return `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`
}
