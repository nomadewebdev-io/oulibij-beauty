# 💈 OULIBIJ - Salon de Coiffure & Beauté Haute Couture

Application web moderne et performante pour le salon de coiffure **OULIBIJ**, développée avec **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase** (Auth, PostgreSQL, Storage, RLS) et optimisée pour un déploiement continu sur **Netlify**.

---

## 🚀 Fonctionnalités Principales

- **Architecture Next.js App Router (v16)** & React Server Components.
- **Base de données Supabase PostgreSQL** avec **Row Level Security (RLS)** activée dès la création.
- **Réservation en ligne multi-étapes** (`/rendez-vous`) : choix de prestation, coiffeur, sélection dynamique du créneau horaire, coordonnées et confirmation.
- **Catalogue & Tarification dynamique** (`/services`) avec filtres par catégorie.
- **Présentation de l'équipe & Spécialités** (`/equipe`).
- **Galerie & Book de créations** (`/galerie`).
- **Espace Client / Dashboard** (`/dashboard`) pour le suivi et l'annulation des rendez-vous.
- **Authentification Supabase** (Email/Password, profils automatiques via Trigger PostgreSQL).
- **Prêt pour le déploiement Netlify** (`netlify.toml` inclus).

---

## 📂 Structure du Projet

```text
salon/
├── netlify.toml                # Configuration de build et déploiement Netlify
├── supabase/
│   ├── migrations/
│   │   └── 20260914000000_init_oulibij_schema.sql  # Schéma complet + RLS + Triggers + Buckets
│   └── seed.sql                # Données initiales pour le salon OULIBIJ
├── src/
│   ├── app/                    # Routes Next.js App Router
│   │   ├── auth/callback/      # Route d'échange OAuth/Magic link Supabase
│   │   ├── contact/            # Page contact, horaires & accès
│   │   ├── dashboard/          # Espace client & historique RDV
│   │   ├── equipe/             # Présentation des stylistes
│   │   ├── galerie/            # Lookbook & réalisations
│   │   ├── login/ & register/  # Connexion & Inscription
│   │   ├── rendez-vous/        # Tunnel de réservation
│   │   ├── services/           # Menu des soins & tarifs
│   │   ├── layout.tsx          # Layout racine avec Navbar & Footer
│   │   └── page.tsx            # Page d'accueil du salon OULIBIJ
│   ├── components/
│   │   ├── auth/               # Composants d'authentification
│   │   ├── booking/            # Wizard de réservation interactif
│   │   ├── dashboard/          # Liste et actions sur les RDV
│   │   ├── home/               # Sections de la page d'accueil (Hero, Services, Team, Gallery, Reviews, CTA)
│   │   ├── layout/             # Navbar & Footer
│   │   └── ui/                 # Composants UI (Button, Badge, etc.)
│   ├── lib/
│   │   ├── actions/            # Server Actions (booking, services, staff, auth)
│   │   ├── supabase/           # Clients Supabase (client, server, middleware, storage)
│   │   ├── constants.ts        # Métadonnées du salon OULIBIJ, horaires, catégories
│   │   └── utils.ts            # Utilitaires de formatage (devises, dates, durées)
│   ├── types/
│   │   ├── database.types.ts   # Typages TypeScript générés du schéma Supabase
│   │   └── index.ts            # Interfaces métier & modèles d'application
│   └── middleware.ts           # Middleware Next.js pour le rafraîchissement de session Supabase
└── .env.example                # Modèle des variables d'environnement
```

---

## 🛠️ Configuration & Installation

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role

NEXT_PUBLIC_SALON_ID=00000000-0000-0000-0000-000000000001
NEXT_PUBLIC_SALON_NAME="OULIBIJ"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Initialisation de la Base de Données Supabase

Exécutez le script SQL présent dans `supabase/migrations/20260914000000_init_oulibij_schema.sql` dans l'éditeur SQL de votre projet Supabase.

Ce script crée :
1. Les tables : `salons`, `profiles`, `services`, `staff`, `disponibilites`, `rendez_vous`, `realisations`.
2. La clé étrangère `salon_id` sur toutes les tables métier.
3. L'activation immédiate de **Row Level Security (RLS)** sur toutes les tables.
4. L'insertion de la ligne par défaut pour le salon **OULIBIJ**.
5. Les buckets de stockage Storage : `salons`, `services`, `staff`, `realisations`, `avatars`.

### 3. Lancer en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🌐 Déploiement sur Netlify

1. Connectez le dépôt GitHub à votre compte Netlify.
2. Ajoutez les variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.) dans les paramètres de site Netlify (*Site configuration > Environment variables*).
3. Le fichier `netlify.toml` configure automatiquement le build (`npm run build`) et le plugin `@netlify/plugin-nextjs`.
