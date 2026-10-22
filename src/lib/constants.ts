import { Service, Staff, Realisation } from '@/types'

/**
 * ============================================================================
 * CONFIGURATION WHATSAPP DU SALON (CONSTANTE UNIQUE ET FACILE À CHANGER)
 * ============================================================================
 * Pour modifier le numéro de réservation, changez simplement la valeur ci-dessous.
 * Format international sans le signe '+' (ex: 221778451234 pour le Sénégal)
 */
export const WHATSAPP_PHONE = '221778451234'
export const WHATSAPP_DISPLAY = '+221 77 845 12 34'

/**
 * Génère le lien wa.me officiel avec message pré-rempli
 * Règle demandée : "Bonjour, je souhaite réserver : [service]"
 */
export function getWhatsAppBookingUrl(serviceName?: string): string {
  const message = serviceName
    ? `Bonjour, je souhaite réserver : ${serviceName}`
    : 'Bonjour, je souhaite réserver une prestation chez Oulibij Beauty'
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}

export const SALON_INFO = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'OULIBIJ BEAUTY',
  brandName: 'Oulibij Beauty',
  tagline: "L'art de la haute coiffure & des soins d'exception à Dakar",
  description:
    "Salon de coiffure & mise en beauté féminine haut de gamme aux Almadies, Dakar. Spécialiste des tresses d'art (knotless braids, nattes stylisées), soins botox & kératine, colorations lumineuses et coiffures d'apparat.",
  address: "Route des Almadies, en face du Club Olympique",
  district: 'Almadies',
  postalCode: '',
  city: 'Dakar',
  country: 'Sénégal',
  phone: '+221 33 820 00 00',
  whatsapp: WHATSAPP_DISPLAY,
  whatsappRaw: WHATSAPP_PHONE,
  email: 'contact@oulibij-beauty.sn',
  payments: ['Wave', 'Orange Money', 'Free Money', 'Espèces'],
  openingHours: [
    { day: 'Lundi - Jeudi', hours: '09:00 - 20:00' },
    { day: 'Vendredi - Samedi', hours: '08:30 - 20:30' },
    { day: 'Dimanche', hours: 'Sur privatisation exclusive' },
  ],
  socials: {
    instagram: 'https://instagram.com/oulibij_beauty',
    tiktok: 'https://tiktok.com/@oulibij_dakar',
    facebook: 'https://facebook.com/oulibij.beauty',
  },
}

export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Prestations & Tarifs', href: '/prestations' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
]

export const HERO_HIGHLIGHTS = [
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
]

export const SERVICE_CATEGORIES = [
  'Tous',
  'Coupe & Coiffage',
  'Tresses & Braids',
  'Soins & Traitements',
  'Lissages & Détente',
  'Coloration & Balayage',
  'Maquillage & Mariée',
]

export const DEFAULT_SERVICES: Service[] = [
  {
    id: '00000000-0000-0001-0001-000000000001',
    salon_id: SALON_INFO.id,
    nom: 'Coupe & Brushing Signature',
    description: 'Diagnostic personnalisé de la fibre, shampoing massant relaxant, coupe sur-mesure et brushing éclat soyeux.',
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
    salon_id: SALON_INFO.id,
    nom: 'Nattes Collées & Traçage d’Art',
    description: 'Nattes collées graphiques, design sur-mesure avec finitions soignées et protection du cuir chevelu sans traction.',
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
    salon_id: SALON_INFO.id,
    nom: 'Box Braids & Knotless Goddess',
    description: 'Tresses knotless ultra légères, racines souples et naturelles, longue tenue avec embouts plongeants soyeux.',
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
    salon_id: SALON_INFO.id,
    nom: 'Soin Botox Capillaire Réparateur',
    description: 'Cure de rajeunissement thermo-active à l’acide hyaluronique et collagène : répare la fibre, stoppe la casse et apporte un miroir d’éclat.',
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
    salon_id: SALON_INFO.id,
    nom: 'Lissage Brésilien Organique',
    description: 'Formule professionnelle sans formol enrichie en kératine végétale et huiles d’argan : chevelure détendue, souple et disciplinée pendant 4 mois.',
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
    salon_id: SALON_INFO.id,
    nom: 'Balayage Soleil & Patine Gloss',
    description: 'Éclaircissement délicat et fondu naturel, patine sur-mesure pour reflets caramel ou miel doré, accompagné d’un masque nutri-protecteur.',
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
    salon_id: SALON_INFO.id,
    nom: 'Soin Profond aux Huiles Précieuses',
    description: 'Bain d’huiles précieuses tiédies (baobab, ricin et karité pur), vapeur ozonée pour ouvrir les écailles et massage crânien apaisant.',
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
    salon_id: SALON_INFO.id,
    nom: 'Chignon d’Apparat & Coiffure Cérémonie',
    description: 'Attaches sophistiquées, chignon bas haute couture ou volume sculpté pour vos réceptions, galas et événements d’exception.',
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
    salon_id: SALON_INFO.id,
    nom: 'Maquillage Jour Éclat Naturel',
    description: 'Teint velouté lumineux, travail des sourcils et mise en valeur délicate du regard adapté à la lumière du jour.',
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
    salon_id: SALON_INFO.id,
    nom: 'Maquillage Soirée & Grand Événement',
    description: 'Teint zéro défaut haute tenue, regard charbonneux ou liner graphique, contouring subtil et pose de faux cils offerte.',
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
    salon_id: SALON_INFO.id,
    nom: 'Pack Mariée Royale (Coiffure + Maquillage + Essai)',
    description: 'Accompagnement complet pour le jour J : séance d’essai préalable, préparation de la chevelure, coiffure couture et maquillage waterproof longue tenue.',
    categorie: 'Maquillage & Mariée',
    duree_minutes: 150,
    prix: 60000,
    image_url: '/images/hero-1.jpg',
    is_active: true,
    necessite_essai: true,
    created_at: '2026-09-14T00:00:00.000Z',
    updated_at: '2026-09-14T00:00:00.000Z',
  },
]

export const DEFAULT_STAFF: Staff[] = [
  {
    id: '00000000-0000-0002-0001-000000000001',
    salon_id: SALON_INFO.id,
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
    salon_id: SALON_INFO.id,
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
    salon_id: SALON_INFO.id,
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
]

export const DEFAULT_REALISATIONS: Realisation[] = [
  {
    id: '00000000-0000-0003-0001-000000000001',
    salon_id: SALON_INFO.id,
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
    salon_id: SALON_INFO.id,
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
    salon_id: SALON_INFO.id,
    staff_id: null,
    titre: 'Balayage Soleil & Nuances Caramel Fondues',
    description: 'Éclaircissement naturel sans démarcation et reflets miroir étincelants.',
    image_url: '/images/hero-4.jpg',
    categorie: 'Coloration',
    date_realisation: '2026-10-15',
    created_at: '2026-09-14T00:00:00.000Z',
    updated_at: '2026-09-14T00:00:00.000Z',
  },
  {
    id: '00000000-0000-0003-0001-000000000004',
    salon_id: SALON_INFO.id,
    staff_id: null,
    titre: 'Soin Botox Capillaire Réparateur Intense',
    description: 'Régénération complète de la fibre capillaire et souplesse éclatante.',
    image_url: '/images/hero-2.jpg',
    categorie: 'Soins Profonds',
    date_realisation: '2026-10-18',
    created_at: '2026-09-14T00:00:00.000Z',
    updated_at: '2026-09-14T00:00:00.000Z',
  },
]

export const CLIENT_REVIEWS = [
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
]
