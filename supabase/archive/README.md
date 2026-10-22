# Archive Code Supabase (Oulibij Beauty)

Ce dossier conserve l'intégralité du code d'intégration Supabase (client, server, middleware, storage et actions serveur) développé pour le projet.

## Fichiers archivés :
- `client.ts` : initialisation du client navigateur (@supabase/ssr)
- `server.ts` : initialisation du client serveur avec gestion des cookies (@supabase/ssr)
- `middleware.ts` : middleware de rafraîchissement de session et contrôle d'accès
- `storage.ts` : gestion des uploads et URLs publiques Supabase Storage
- `auth-actions.ts` : actions d'inscription, connexion, déconnexion et profil Supabase Auth
- `booking-actions.ts` : logique serveur de calcul de créneaux et insertion de réservations dans Postgres
- `admin-actions.ts` : gestion d'administration des prestations, équipe et rendez-vous

Pour réactiver Supabase :
1. Renseigner les variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env.local`
2. Restaurer les imports depuis ce dossier vers `@/lib/supabase/` et `@/lib/actions/`
