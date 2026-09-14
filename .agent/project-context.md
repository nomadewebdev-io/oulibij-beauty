1. Objectif du projet

Créer un site vitrine + réservation en ligne pour un salon de coiffure destiné à une clientèle féminine, avec un design inspiré de la référence fournie (esthétique beauté/bien-être, dégradé rose pastel, mise en page épurée). Le site doit être fonctionnel rapidement (MVP) mais construit pour pouvoir grossir sans tout reconstruire.

2. Stack technique retenue
Brique	Choix	Pourquoi
Frontend	Next.js (App Router) + TypeScript + Tailwind CSS	Cohérent avec Xewel, SEO correct, tu es déjà à l'aise dessus
Backend / BDD	Supabase (Postgres + Auth + Storage + RLS)	Idem, pas de nouvel outil à apprendre
Hébergement	Netlify	Tu as déjà le compte
IDE agentique	Google Antigravity	Outil de dev principal
Paiement (acompte réservation, optionnel en V1)	Wave / Orange Money / CinetPay	À activer plus tard, ne bloque pas le MVP
3. Principe d'architecture : penser "multi-salon" dès le départ

Même si un seul salon existe au lancement, toutes les tables métier portent une colonne salon_id. Ça permet, plus tard, de transformer le site en plateforme SaaS pour plusieurs salons sans réécrire le modèle de données. Aucun effort supplémentaire côté UI en V1 : un seul salon = un seul enregistrement dans salons.

4. Arborescence des pages (MVP)
/ — Accueil vitrine (reprend la structure de la référence : hero, CTA Réserver/Découvrir, bandeau services, galerie photo)
/prestations — Liste des services avec prix et durée
/realisations — Galerie des travaux (coiffures réalisées)
/a-propos — Présentation du salon et de l'équipe
/contact — Coordonnées, carte, formulaire
/reserver — Tunnel de réservation (service → coiffeuse → créneau → confirmation)
/compte/mes-rendez-vous — Espace client authentifié
/admin — Espace gestion (prestations, équipe, créneaux, rendez-vous reçus), protégé
5. Modèle de données (Supabase)
salons : id, nom, slug, adresse, telephone, email, logo_url, couleur_theme
services : id, salon_id, nom, description, duree_minutes, prix, categorie, photo_url, actif
staff : id, salon_id, nom, photo_url, bio, specialites (text[]), actif
disponibilites : id, staff_id, jour_semaine, heure_debut, heure_fin
rendez_vous : id, salon_id, client_id, service_id, staff_id, date_heure, statut (en_attente / confirmé / terminé / annulé), notes, created_at
profiles : id (lié à auth.users), nom, telephone, avatar_url
realisations : id, salon_id, photo_url, description, categorie
avis (V2) : id, client_id, staff_id, note, commentaire, created_at

RLS activée sur toutes les tables dès leur création, pas après coup.

6. Direction artistique (basée sur la référence fournie)
Fond dégradé rose pastel / pêche en bordure, carte blanche arrondie au centre
Logo en typographie script/serif élégante
Titre principal en sans-serif noir très gras, sur deux lignes
Deux CTA en forme de pilule : un rempli en dégradé rose ("Réserver"), un contour noir ("Découvrir")
Rangée de 3 points forts avec icônes (ex. "Coupe & Brushing", "Coloration", "Soins capillaires") à la place des "Lorem ipsum"
Collage photo à droite (portraits, gestes de coiffure) à la place des visuels ongles/mains
Badge circulaire "scroll down" en bas de section hero
7. Exigences non-fonctionnelles (obligatoires, à rappeler à Antigravity)
Responsive dès la création de chaque écran, jamais ajouté après coup
Aucune donnée mock en dur : tout vient de Supabase dès le départ
Commit + push Git après chaque étape validée
Feature flags pour les modules pas encore prêts (ex. paiement en ligne), pour pouvoir les activer plus tard en un seul prompt
Audit sécurité (RLS, secrets) et performance (pagination, compression images) avant tout déploiement
8. Évolutions futures possibles (à ne pas construire maintenant, mais ne pas bloquer)
Paiement d'acompte en ligne (Wave / Orange Money / CinetPay)
Rappels de rendez-vous par SMS/WhatsApp
Programme de fidélité
Vente de produits capillaires (mini e-commerce)
Ouverture à plusieurs salons (le salon_id est déjà prêt pour ça)