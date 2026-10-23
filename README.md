# OULIBIJ BEAUTY — Template Multi-Salon Haut de Gamme

Site vitrine et système de réservation instantanée sur WhatsApp pour salons de coiffure et instituts de beauté féminine, développé avec **Next.js (App Router)**, **TypeScript** et **Tailwind CSS**, optimisé pour un déploiement continu sur **Vercel**.

---

## ⚡ Comment cloner ce site pour un nouveau salon en 10 minutes

Toute la personnalisation du site est centralisée dans un fichier unique : `src/config/site.ts`. Aucune information de salon n'est codée en dur dans les composants.

### Étape 1 : Cloner le dépôt et installer les dépendances

```bash
git clone <url-du-repo> nouveau-salon
cd nouveau-salon
npm install
```

### Étape 2 : Modifier `src/config/site.ts`

Ouvrez `src/config/site.ts` et adaptez les valeurs selon le nouveau salon :
- **Identité** : `name`, `brandName`, `tagline`, `description`.
- **Contact & Localisation** : numéro `whatsappRaw` (ex: `221770000000`), `whatsappDisplay`, `phone`, `address`, `district` (quartier), `city` (ville).
- **Thème visuel** : modifiez `theme.primary` (ex: `#be123c` pour rose haute couture, `#b45309` pour ambre terracotta, `#0f766e` pour émeraude).
- **Horaires & Paiements** : `openingHours`, `payments` (Wave, Orange Money, Free Money, Espèces).
- **Prestations & Tarifs (FCFA)** : mettez à jour la liste `services` avec les durées et prix.
- **Équipe & Avis** : personnalisez `staff` et `reviews`.

### Étape 3 : Remplacer les images du salon

Placez les photos du nouveau salon dans `public/images/` :
- `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, `hero-4.jpg` : portraits et gestes de coiffure.
- Lancez `node scripts/optimize-assets.js` pour générer automatiquement l'image Open Graph 1200x630 (`og-image.jpg`), les favicons et compresser les visuels en haute performance.

### Étape 4 : Tester et Déployer sur Vercel

```bash
# Vérification locale
npm run build

# Déploiement Vercel
# 1. Connectez votre dépôt sur https://vercel.com/new
# 2. Ajoutez la variable d'environnement :
#    NEXT_PUBLIC_SITE_URL = https://votre-domaine.com
# 3. Cliquez sur "Deploy"
```

Le site est en ligne en quelques minutes avec un score Lighthouse > 90, un aperçu Open Graph 1200x630 parfait sur WhatsApp, un sitemap dynamique et un tunnel WhatsApp sans friction.

---

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling** : Tailwind CSS v4 + Variables CSS thématiques.
- **SEO & Réseaux Sociaux** : Métadonnées Open Graph (1200x630), Twitter Cards, Sitemap dynamique (`/sitemap.xml`), Robots (`/robots.txt`), Favicons vectoriels et PNG.
- **Paiements & Réservations** : Intégration mobile money Sénégal (Wave, Orange Money, Free Money) et réservation directe via liens wa.me pré-remplis.
- **Performance** : Images optimisées avec `next/image` (WebP/MozJPEG, tailles responsives et lazy loading).

---

## 📁 Architecture des Fichiers

```text
salon/
├── src/
│   ├── config/
│   │   └── site.ts           # MASTER CONFIGURATION : Unique source de vérité du salon
│   ├── app/
│   │   ├── layout.tsx        # Métadonnées SEO globales, OpenGraph WhatsApp, Favicon
│   │   ├── page.tsx          # Page d'accueil vitrine
│   │   ├── sitemap.ts        # Sitemap XML dynamique
│   │   ├── robots.ts         # Directives robots.txt
│   │   ├── opengraph-image.tsx # Générateur dynamique d'image OpenGraph 1200x630
│   │   ├── twitter-image.tsx # Twitter Card image
│   │   ├── prestations/      # Carte complète des soins et tarifs FCFA
│   │   ├── realisations/     # Galerie lookbook & réalisations
│   │   ├── a-propos/         # Histoire & présentation de l'équipe
│   │   ├── contact/          # Coordonnées, horaires & Google Maps
│   │   └── reserver/         # Tunnel de réservation WhatsApp
│   ├── components/
│   │   ├── home/             # Sections modulaires de la page d'accueil
│   │   ├── layout/           # Navbar & Footer dynamiques
│   │   ├── booking/          # Wizard de réservation avec récapitulatif
│   │   └── ui/               # Icônes SVG vectorielles sans emojis
│   └── lib/
│       ├── constants.ts      # Re-exports compatibles depuis site.ts
│       └── utils.ts          # Utilitaires FCFA, durées et dates
├── public/
│   ├── images/
│   │   ├── hero-1.jpg à 4    # Photos optimisées
│   │   └── og-image.jpg      # Bannière de partage WhatsApp 1200x630
│   └── favicon.ico           # Favicon officiel
└── scripts/
    └── optimize-assets.js    # Script d'optimisation d'images et génération d'assets
```

---

## 🧪 Commandes Utiles

```bash
# Lancer le serveur de développement
npm run dev

# Générer les assets optimisés et la bannière Open Graph
node scripts/optimize-assets.js

# Valider la compilation de production
npm run build

# Linter le code
npm run lint
```
