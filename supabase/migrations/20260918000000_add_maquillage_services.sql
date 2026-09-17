-- ==============================================================================
-- MIGRATION: AJOUT DE LA CATÉGORIE MAQUILLAGE & COLONNE NECESSITE_ESSAI
-- ==============================================================================

-- 1. Ajout de la colonne necessite_essai à la table services
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS necessite_essai BOOLEAN NOT NULL DEFAULT false;

-- 2. Insertion / Mise à jour des prestations de Maquillage pour le salon Oulibij
INSERT INTO public.services (
    id, 
    salon_id, 
    nom, 
    description, 
    categorie, 
    duree_minutes, 
    prix, 
    is_active, 
    necessite_essai
)
VALUES
    (
        '00000000-0000-0000-0001-000000000007', 
        '00000000-0000-0000-0000-000000000001', 
        'Maquillage jour', 
        'Mise en beauté fraîche, lumineuse et naturelle adaptée à votre carnation pour illuminer votre journée.', 
        'Maquillage', 
        45, 
        50.00, 
        true, 
        false
    ),
    (
        '00000000-0000-0000-0001-000000000008', 
        '00000000-0000-0000-0000-000000000001', 
        'Maquillage soirée', 
        'Mise en beauté sophistiquée, teint zéro défaut, travail précis des yeux (smoky eyes, liner graphique) et bouche haute tenue pour vos soirées et événements.', 
        'Maquillage', 
        60, 
        75.00, 
        true, 
        false
    ),
    (
        '00000000-0000-0000-0001-000000000009', 
        '00000000-0000-0000-0000-000000000001', 
        'Maquillage mariée', 
        'Mise en beauté d''exception ultra-longue tenue pour le jour J. Diagnostic de carnation, teint lumineux waterproof, mise en valeur du regard et finitions couture.', 
        'Maquillage', 
        90, 
        150.00, 
        true, 
        true
    ),
    (
        '00000000-0000-0000-0001-000000000010', 
        '00000000-0000-0000-0000-000000000001', 
        'Essai maquillage mariée', 
        'Séance d''essai préalable personnalisée avant le grand jour : analyse morphologique, harmonie des teintes et validation complète du look parfait pour le jour J.', 
        'Maquillage', 
        60, 
        70.00, 
        true, 
        false
    )
ON CONFLICT (id) DO UPDATE SET
    nom = EXCLUDED.nom,
    description = EXCLUDED.description,
    categorie = EXCLUDED.categorie,
    duree_minutes = EXCLUDED.duree_minutes,
    prix = EXCLUDED.prix,
    is_active = EXCLUDED.is_active,
    necessite_essai = EXCLUDED.necessite_essai;

-- 3. Mise à jour de la spécialité du staff pour inclure Maquillage
UPDATE public.staff
SET 
    specialite = 'Master Styliste, Coloriste & Maquillage',
    bio = '12 ans d''expérience en haute coiffure & mise en beauté. Spécialiste des transformations éclat, balayages lumineux, maquillage événementiel et visagisme féminin.'
WHERE id = '00000000-0000-0000-0002-000000000001';
