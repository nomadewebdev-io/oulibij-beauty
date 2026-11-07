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
  icon: 'Eye' | 'Scissors' | 'Gem' | 'Sparkles' | 'ShieldCheck'
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
  fullAddress: string
  phone: string
  phoneRaw: string
  whatsappRaw: string
  whatsappDisplay: string
  email: string
  hoursSummary: string
  googleMapsEmbedUrl: string
  googleMapsDirectionsUrl: string

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
    accent: string
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
    ogTitle: string
    ogDescription: string
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
    ctaCall: string
    ctaDiscover: string
    highlights: HeroHighlight[]
  }

  // Prestations & Tarifs (en FCFA)
  categories: string[]
  services: SalonServiceItem[]

  // Pôles d'expertise
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
  name: 'OULIBIJ BEAUTÉ',
  brandName: 'OuliBij Beauté',
  slug: 'oulibij-beaute',
  tagline: 'Prenez en main la beauté de votre regard',
  description:
    'Salon OuliBij Beauté à Cité Sonatel 2, en face UNO des 2 Voies, Liberté 6, Dakar. Maquillage (cérémonie, simple et contouring), coiffure féminine (tissage, tresse, bouclage, pose lace, Stream Pod, teinture, soins) et espace cosmétiques, parfumerie & accessoires. Ouvert du lundi au dimanche de 9h à 21h.',
  shortDescription:
    'Prenez en main la beauté de votre regard — Maquillage, coiffure & parfumerie à Liberté 6 (Cité Sonatel 2), Dakar.',

  // Localisation & contact réels
  address: 'Cité Sonatel 2, en face UNO des 2 Voies',
  district: 'Liberté 6',
  city: 'Dakar',
  country: 'Sénégal',
  landmarks: 'En face du supermarché UNO des 2 Voies, Cité Sonatel 2',
  fullAddress: 'Cité Sonatel 2, en face UNO des 2 Voies, Liberté 6, Dakar',
  phone: '77 619 58 50',
  phoneRaw: '+221776195850',
  whatsappRaw: '221776195850',
  whatsappDisplay: '77 619 58 50',
  email: '',
  hoursSummary: 'Lundi au dimanche, 9h – 21h',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Cit%C3%A9%20Sonatel%202%2C%20Libert%C3%A9%206%2C%20Dakar%2C%20S%C3%A9n%C3%A9gal&t=&z=16&ie=UTF8&iwloc=&output=embed',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Cit%C3%A9+Sonatel+2+en+face+UNO+des+2+Voies+Libert%C3%A9+6+Dakar',

  // Réseaux sociaux (uniquement lorsqu'officiels)
  socials: {
    instagram: '',
    tiktok: '',
    facebook: '',
  },

  // Moyens de paiement locaux
  payments: ['Wave', 'Orange Money', 'Free Money', 'Espèces'],

  // Horaires officiels : lundi au dimanche, 9h-21h
  openingHours: [
    { day: 'Lundi - Vendredi', hours: '09h00 - 21h00', isOpen: true },
    { day: 'Samedi', hours: '09h00 - 21h00', isOpen: true },
    { day: 'Dimanche', hours: '09h00 - 21h00', isOpen: true },
  ],

  // Thème visuel Noir + Or (ambiance luxe chaleureux)
  theme: {
    primary: '#b8860b',
    primaryHover: '#9a6f08',
    primaryLight: '#fdf9f0',
    primaryBorder: '#e6d3a3',
    accent: '#059669',
    accentHover: '#047857',
    accentLight: '#ecfdf5',
    backgroundWarm: '#f6f2ea',
    surface: '#ffffff',
    textDark: '#0f0e0c',
    textMuted: '#57534e',
  },

  // SEO & Open Graph
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://oulibij-beauty.vercel.app',
    defaultTitle: 'OuliBij Beauté | Maquillage, Coiffure & Parfumerie à Liberté 6, Dakar',
    titleTemplate: '%s | OuliBij Beauté Dakar',
    metaDescription:
      'Prenez en main la beauté de votre regard chez OuliBij Beauté — Cité Sonatel 2, en face UNO des 2 Voies, Liberté 6, Dakar. Maquillage, coiffure, pose lace, Stream Pod, cosmétiques et parfumerie. Lun-Dim 9h-21h • 77 619 58 50.',
    ogTitle: 'OuliBij Beauté — Prenez en main la beauté de votre regard',
    ogDescription:
      'Maquillage (cérémonie, simple, contouring), Coiffure (tissage, tresse, bouclage, pose lace, Stream Pod, teinture, soins) & Parfumerie à Liberté 6, Dakar. Ouvert 7j/7 de 9h à 21h • 77 619 58 50.',
    keywords: [
      'OuliBij Beauté',
      'salon de beauté Liberté 6',
      'salon de coiffure Dakar',
      'Cité Sonatel 2',
      'UNO 2 Voies Liberté 6',
      'maquillage cérémonie Dakar',
      'maquillage contouring Dakar',
      'pose lace Dakar',
      'Stream Pod Dakar',
      'tissage tresse bouclage Dakar',
      'cosmétiques parfumerie Dakar',
      'boutique OuliBij Beauté',
      'parfumerie Liberté 6',
      'accessoires beauté Dakar',
    ],
    locale: 'fr_FR',
    ogImage: {
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'OuliBij Beauté — Prenez en main la beauté de votre regard • Liberté 6, Dakar',
    },
  },

  // Hero Section
  hero: {
    badge: 'Maquillage • Coiffure • Parfumerie',
    titleLine1: 'Prenez en main',
    titleLine2: 'la beauté de votre regard.',
    ctaWhatsApp: 'Réserver sur WhatsApp',
    ctaCall: 'Appeler : 77 619 58 50',
    ctaDiscover: 'Découvrir la carte',
    highlights: [
      {
        icon: 'Eye',
        title: 'Maquillage & Regard',
        description: 'Cérémonie, simple et contouring haute tenue',
      },
      {
        icon: 'Scissors',
        title: 'Coiffure & Stylisme',
        description: 'Tissage, tresse, pose lace, bouclage, Stream Pod & soins',
      },
      {
        icon: 'Gem',
        title: 'Cosmétiques & Parfums',
        description: 'Cosmétiques choisis, parfumerie & accessoires beauté',
      },
    ],
  },

  // Catégories officielles des prestations salon
  categories: ['Tous', 'Maquillage', 'Coiffure'],

  // Prestations & produits réels d'OuliBij Beauté (tarifs indicatifs en FCFA)
  services: [
    // --- MAQUILLAGE ---
    {
      id: '00000000-0000-0001-0001-000000000001',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Maquillage Cérémonie & Mariée',
      description:
        'Mise en beauté complète haute tenue pour mariages, baptêmes, soirées et grandes réceptions : travail intense du regard, teint zéro défaut et fixation longue durée.',
      categorie: 'Maquillage',
      duree_minutes: 75,
      prix: 20000,
      image_url: '/images/hero-4.jpg',
      is_active: true,
      necessite_essai: true,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000002',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Maquillage Simple & Éclat du Regard',
      description:
        'Teint frais et unifié, dessin soigné des sourcils et mise en valeur délicate du regard pour vos rendez-vous professionnels, sorties ou événements de journée.',
      categorie: 'Maquillage',
      duree_minutes: 40,
      prix: 5000,
      image_url: '/images/hero-1.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000003',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Maquillage Contouring & Sculpting',
      description:
        'Structuration harmonieuse des volumes du visage par jeux d’ombres et de lumière (contouring), regard travaillé et finition veloutée lumineuse.',
      categorie: 'Maquillage',
      duree_minutes: 60,
      prix: 10000,
      image_url: '/images/hero-4.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },

    // --- COIFFURE ---
    {
      id: '00000000-0000-0001-0001-000000000004',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Tissage (Ouvert, Fermé & Invisible)',
      description:
        'Pose de tissage soignée avec nattes de base plates et confortables, coutures solides sans tension excessive et coiffage final naturel.',
      categorie: 'Coiffure',
      duree_minutes: 90,
      prix: 10000,
      image_url: '/images/hero-1.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000005',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Tresses & Nattes tous styles',
      description:
        'Tresses africaines, knotless braids, nattes collées et modèles sur-mesure réalisés avec un traçage net et respectueux de vos tempes.',
      categorie: 'Coiffure',
      duree_minutes: 120,
      prix: 10000,
      image_url: '/images/hero-3.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000006',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Bouclage & Ondulations Glamour',
      description:
        'Réalisation de boucles souples, wavy volumineux ou bouclage défini sur cheveux naturels, tissages ou perruques avec protection thermique.',
      categorie: 'Coiffure',
      duree_minutes: 45,
      prix: 5000,
      image_url: '/images/hero-1.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000007',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Pose Lace (Frontal, Closure & Perruque)',
      description:
        'Customisation de la tulle, effet fondu indétectable, baby hairs travaillés avec finesse et fixation maîtrisée pour un rendu naturel.',
      categorie: 'Coiffure',
      duree_minutes: 75,
      prix: 15000,
      image_url: '/images/hero-4.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000008',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Lissage Vapeur Stream Pod (SteamPod)',
      description:
        'Lissage soyeux à la vapeur continue haute pression : détend la chevelure en douceur, préserve l’hydratation de la fibre et apporte une brillance miroir.',
      categorie: 'Coiffure',
      duree_minutes: 60,
      prix: 10000,
      image_url: '/images/hero-2.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000009',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Teinture & Coloration Sur-Mesure',
      description:
        'Coloration intégrale, retouche racines ou reflets chauds dorés et cuivrés sur cheveux naturels ou mèches, suivie d’un soin fixateur d’éclat.',
      categorie: 'Coiffure',
      duree_minutes: 75,
      prix: 10000,
      image_url: '/images/hero-4.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0001-0001-000000000010',
      salon_id: '00000000-0000-0000-0000-000000000001',
      nom: 'Soins Capillaires Profonds',
      description:
        'Shampoing traitant, bain d’huiles nourrissantes, masque réparateur sous casque vapeur et massage crânien relaxant pour fortifier vos cheveux.',
      categorie: 'Coiffure',
      duree_minutes: 60,
      prix: 8000,
      image_url: '/images/hero-2.jpg',
      is_active: true,
      necessite_essai: false,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
  ],

  // Pôles d'expertise du salon OuliBij Beauté (aucun profil fictif)
  staff: [
    {
      id: '00000000-0000-0002-0001-000000000001',
      salon_id: '00000000-0000-0000-0000-000000000001',
      user_id: null,
      prenom: 'Pôle Maquillage',
      nom: '& Beauté du Regard',
      specialite: 'Cérémonie • Simple • Contouring',
      bio: 'Fidèle à notre devise « Prenez en main la beauté de votre regard », notre pôle maquillage sublime vos traits pour le quotidien comme pour vos grandes cérémonies.',
      avatar_url: '/images/hero-4.jpg',
      email: '',
      telephone: '+221 77 619 58 50',
      is_active: true,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0002-0001-000000000002',
      salon_id: '00000000-0000-0000-0000-000000000001',
      user_id: null,
      prenom: 'Pôle Coiffure',
      nom: '& Pose Lace',
      specialite: 'Tissage • Tresse • Lace • Stream Pod • Soins',
      bio: 'Maîtrise complète du tissage, des tresses, de la pose lace indétectable, du bouclage, de la teinture, du lissage vapeur Stream Pod et des soins capillaires.',
      avatar_url: '/images/hero-3.jpg',
      email: '',
      telephone: '+221 77 619 58 50',
      is_active: true,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0002-0001-000000000003',
      salon_id: '00000000-0000-0000-0000-000000000001',
      user_id: null,
      prenom: 'Espace Boutique',
      nom: 'Cosmétiques & Parfums',
      specialite: 'Cosmétiques • Parfumerie • Accessoires',
      bio: 'Retrouvez sur place à Liberté 6 notre sélection de cosmétiques authentiques, parfums raffinés et accessoires pour compléter votre mise en beauté.',
      avatar_url: '/images/hero-1.jpg',
      email: '',
      telephone: '+221 77 619 58 50',
      is_active: true,
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
  ],

  // Réalisations (Lookbook)
  realisations: [
    {
      id: '00000000-0000-0003-0001-000000000001',
      salon_id: '00000000-0000-0000-0000-000000000001',
      staff_id: null,
      titre: 'Maquillage Regard Intense & Bouclage Soyeux',
      description: 'Sublimation du regard, teint lumineux et ondulations glamour réalisés au salon OuliBij Beauté.',
      image_url: '/images/hero-1.jpg',
      categorie: 'Maquillage',
      date_realisation: '2026-10-25',
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0003-0001-000000000002',
      salon_id: '00000000-0000-0000-0000-000000000001',
      staff_id: null,
      titre: 'Tresses Chignon Haut & Bijoux Dorés',
      description: 'Tresses fines relevées en chignon sculptural rehaussé d’accessoires dorés et maquillage harmonieux.',
      image_url: '/images/hero-3.jpg',
      categorie: 'Coiffure',
      date_realisation: '2026-10-28',
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0003-0001-000000000003',
      salon_id: '00000000-0000-0000-0000-000000000001',
      staff_id: null,
      titre: 'Teinture Miel Doré, Pose Lace & Contouring',
      description: 'Nuances chaudes lumineuses, pose impeccable et mise en beauté du visage et du regard.',
      image_url: '/images/hero-4.jpg',
      categorie: 'Coiffure',
      date_realisation: '2026-11-01',
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0003-0001-000000000004',
      salon_id: '00000000-0000-0000-0000-000000000001',
      staff_id: null,
      titre: 'Lissage Stream Pod, Soins & Accessoires Dorés',
      description: 'Détente vapeur brillante et finition par barrettes bijou disponibles dans notre espace boutique.',
      image_url: '/images/hero-2.jpg',
      categorie: 'Coiffure',
      date_realisation: '2026-11-04',
      created_at: '2026-11-07T00:00:00.000Z',
      updated_at: '2026-11-07T00:00:00.000Z',
    },
  ],

  // Retours clientes à Dakar (Liberté 6 & alentours)
  reviews: [
    {
      name: 'Ndeye Astou Diagne',
      district: 'Liberté 6, Dakar',
      service: 'Maquillage Cérémonie & Pose Lace',
      comment:
        'Un travail remarquable sur le regard et le contouring pour mon mariage ! La pose lace était totalement fondue et le maquillage a tenu jusqu’au bout de la soirée sans bouger. L’emplacement juste en face d’UNO des 2 Voies est super facile d’accès.',
      rating: 5,
      date: 'Cliente régulière',
    },
    {
      name: 'Khady Ndiaye',
      district: 'Cité Sonatel 2, Dakar',
      service: 'Lissage Stream Pod & Soins Capillaires',
      comment:
        'Le salon est ouvert tous les jours jusqu’à 21h, ce qui me permet de passer après le bureau. Mon soin suivi du Stream Pod a laissé mes cheveux souples, légers et brillants.',
      rating: 5,
      date: 'Liberté 6',
    },
    {
      name: 'Sokhna Maimouna Fall',
      district: 'Sacré-Cœur 3, Dakar',
      service: 'Tresses, Parfumerie & Accessoires',
      comment:
        'Traçage très propre et sans douleur pour mes tresses, et j’ai trouvé sur place un parfum magnifique ainsi que des accessoires dorés pour ma tenue. Accueil chaleureux et réservation rapide sur WhatsApp.',
      rating: 5,
      date: 'Dakar',
    },
  ],

  // Liens de navigation
  navLinks: [
    { label: 'Accueil', href: '/' },
    { label: 'Prestations', href: '/prestations' },
    { label: 'Boutique', href: '/boutique' },
    { label: 'Réalisations', href: '/realisations' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact & Accès', href: '/contact' },
  ],
}

/**
 * Génère le lien WhatsApp officiel wa.me/221776195850 avec message prérempli
 */
export function getWhatsAppBookingUrl(serviceName?: string): string {
  const message = serviceName
    ? `Bonjour ${siteConfig.brandName}, je souhaite réserver ou me renseigner pour : ${serviceName}.`
    : `Bonjour ${siteConfig.brandName}, je souhaite prendre rendez-vous au salon à ${siteConfig.district}.`
  return `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`
}

/**
 * Génère le lien d'appel téléphonique direct
 */
export function getPhoneCallUrl(): string {
  return `tel:${siteConfig.phoneRaw}`
}
