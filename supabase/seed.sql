-- SEED DATA FOR SALON OULIBIJ

-- 1. SALON "OULIBIJ"
INSERT INTO public.salons (
    id, nom, description, adresse, code_postal, ville, telephone, email, logo_url, cover_image_url
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'OULIBIJ',
    'Salon de coiffure & beauté d''exception. Créativité, expertise afro & européenne, soins capillaires sur-mesure et expérience bien-être haut de gamme.',
    '15 Avenue de l''Élégance',
    '75008',
    'Paris',
    '+33 1 42 68 00 00',
    'contact@oulibij-salon.fr',
    '/images/logo.png',
    '/images/salon-hero.jpg'
)
ON CONFLICT (id) DO UPDATE SET
    nom = EXCLUDED.nom,
    description = EXCLUDED.description;

-- 2. SERVICES INITIAL SEED
INSERT INTO public.services (id, salon_id, nom, description, categorie, duree_minutes, prix, is_active, necessite_essai)
VALUES
    ('00000000-0000-0000-0001-000000000001', '00000000-0000-0000-0000-000000000001', 'Coupe & Brushing Signature', 'Shampoing traitant, coupe sur-mesure et brushing haute tenue.', 'Coupe & Coiffage', 50, 65.00, true, false),
    ('00000000-0000-0000-0001-000000000002', '00000000-0000-0000-0000-000000000001', 'Tresses & Braids Artistiques', 'Box braids knotless, nattes collées ou vanilles soignées.', 'Tresses & Braids', 120, 110.00, true, false),
    ('00000000-0000-0000-0001-000000000003', '00000000-0000-0000-0000-000000000001', 'Balayage & Nuance Lumineuse', 'Éclaircissement fondu sur-mesure, patine gloss et soin réparateur.', 'Coloration & Balayage', 90, 135.00, true, false),
    ('00000000-0000-0000-0001-000000000004', '00000000-0000-0000-0000-000000000001', 'Soin Botox Capillaire & Kératine', 'Traitement réparateur profond et brillance miroir intense.', 'Soins & Traitements', 75, 95.00, true, false),
    ('00000000-0000-0000-0001-000000000005', '00000000-0000-0000-0000-000000000001', 'Lissage Brésilien Organique', 'Lissage soyeux enrichi en acides aminés sans formol.', 'Lissages & Détente', 150, 180.00, true, false),
    ('00000000-0000-0000-0001-000000000006', '00000000-0000-0000-0000-000000000001', 'Coiffure de Soirée & Événement', 'Chignon couture, attaches sophistiquées pour vos grands moments.', 'Coupe & Coiffage', 60, 85.00, true, false),
    ('00000000-0000-0000-0001-000000000007', '00000000-0000-0000-0000-000000000001', 'Maquillage jour', 'Mise en beauté fraîche, lumineuse et naturelle adaptée à votre carnation pour illuminer votre journée.', 'Maquillage', 45, 50.00, true, false),
    ('00000000-0000-0000-0001-000000000008', '00000000-0000-0000-0000-000000000001', 'Maquillage soirée', 'Mise en beauté sophistiquée, teint zéro défaut, travail précis des yeux (smoky eyes, liner graphique) et bouche haute tenue pour vos soirées et événements.', 'Maquillage', 60, 75.00, true, false),
    ('00000000-0000-0000-0001-000000000009', '00000000-0000-0000-0000-000000000001', 'Maquillage mariée', 'Mise en beauté d''exception ultra-longue tenue pour le jour J. Diagnostic de carnation, teint lumineux waterproof, mise en valeur du regard et finitions couture.', 'Maquillage', 90, 150.00, true, true),
    ('00000000-0000-0000-0001-000000000010', '00000000-0000-0000-0000-000000000001', 'Essai maquillage mariée', 'Séance d''essai préalable personnalisée avant le grand jour : analyse morphologique, harmonie des teintes et validation complète du look parfait pour le jour J.', 'Maquillage', 60, 70.00, true, false)
ON CONFLICT (id) DO UPDATE SET
    nom = EXCLUDED.nom,
    description = EXCLUDED.description,
    categorie = EXCLUDED.categorie,
    prix = EXCLUDED.prix,
    duree_minutes = EXCLUDED.duree_minutes,
    is_active = EXCLUDED.is_active,
    necessite_essai = EXCLUDED.necessite_essai;

-- 3. STAFF INITIAL SEED
INSERT INTO public.staff (id, salon_id, nom, prenom, specialite, bio, email, telephone, is_active)
VALUES
    ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000001', 'Diallo', 'Aminata', 'Master Styliste, Coloriste & Maquillage', '12 ans d''expérience en haute coiffure & mise en beauté. Spécialiste des transformations éclat, balayages lumineux, maquillage événementiel et visagisme féminin.', 'aminata@oulibij-beauty.fr', '+33 6 11 22 33 44', true),
    ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0000-000000000001', 'Koffi', 'Yannick', 'Artiste Braider & Soins Texturés', 'Virtuose des tresses géométriques, nattes artistiques, box braids et soins intenses pour cheveux texturés.', 'yannick@oulibij-beauty.fr', '+33 6 22 33 44 55', true),
    ('00000000-0000-0000-0002-000000000003', '00000000-0000-0000-0000-000000000001', 'Laurent', 'Chloé', 'Styliste Soins & Lissages', 'Experte en soins botox réparateurs, lissages brésiliens et brushings soyeux longue durée.', 'chloe@oulibij-beauty.fr', '+33 6 33 44 55 66', true)
ON CONFLICT (id) DO UPDATE SET
    nom = EXCLUDED.nom,
    prenom = EXCLUDED.prenom,
    specialite = EXCLUDED.specialite,
    bio = EXCLUDED.bio;

-- 4. REALISATIONS SEED
INSERT INTO public.realisations (id, salon_id, titre, description, image_url, categorie, date_realisation)
VALUES
    ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000001', 'Brushing Wavy Éclat & Volume', 'Ondulations souples sur base soyeuse.', '/images/hero-1.jpg', 'Coiffage', '2026-09-01'),
    ('00000000-0000-0000-0003-000000000002', '00000000-0000-0000-0000-000000000001', 'Art des Tresses & Finition Nette', 'Box braids géométriques légères et soignées.', '/images/hero-3.jpg', 'Tresses', '2026-09-05'),
    ('00000000-0000-0000-0003-000000000003', '00000000-0000-0000-0000-000000000001', 'Balayage Soleil & Patine Gloss', 'Blond miel fondu et reflets miroir.', '/images/hero-4.jpg', 'Coloration', '2026-09-08'),
    ('00000000-0000-0000-0003-000000000004', '00000000-0000-0000-0000-000000000001', 'Soin Botox Réparateur & Lissage', 'Régénération complète de la fibre capillaire.', '/images/hero-2.jpg', 'Soins', '2026-09-10')
ON CONFLICT (id) DO NOTHING;

-- 5. DISPONIBILITES STAFF (Lundi au Samedi: 09:00 - 19:00)
INSERT INTO public.disponibilites (salon_id, staff_id, jour_semaine, heure_debut, heure_fin, is_active)
SELECT 
    '00000000-0000-0000-0000-000000000001',
    s.id,
    j.jour,
    '09:00'::time,
    '19:00'::time,
    true
FROM public.staff s
CROSS JOIN (SELECT generate_series(1, 6) AS jour) j
WHERE s.salon_id = '00000000-0000-0000-0000-000000000001'
ON CONFLICT DO NOTHING;
