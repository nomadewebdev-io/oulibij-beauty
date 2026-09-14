-- SEED DATA FOR SALON OULIBIJ

-- 1. SALON "OULIBIJ"
INSERT INTO public.salons (
    id, nom, description, adresse, code_postal, ville, telephone, email
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'OULIBIJ',
    'Salon de coiffure & esthétique haut de gamme, expert en coiffure mixte, tresses, soins capillaires et relooking.',
    '15 Avenue de l''Élégance',
    '75008',
    'Paris',
    '+33 1 42 68 00 00',
    'contact@oulibij-salon.fr'
)
ON CONFLICT (id) DO NOTHING;

-- 2. SERVICES INITIAL SEED
INSERT INTO public.services (salon_id, nom, description, categorie, duree_minutes, prix, is_active)
VALUES
    ('00000000-0000-0000-0000-000000000001', 'Coupe & Coiffage Signature', 'Shampoing traitant, coupe sur-mesure et brushing haute tenue.', 'Coiffure & Coupe', 50, 65.00, true),
    ('00000000-0000-0000-0000-000000000001', 'Tresses & Nattes Artistiques', 'Création personnalisée de tresses, box braids ou nattes collées soignées.', 'Tresses & Braids', 120, 110.00, true),
    ('00000000-0000-0000-0000-000000000001', 'Balayage & Nuance Lumineuse', 'Éclaircissement naturel personnalisé et patine éclat brillance.', 'Coloration & Balayage', 90, 135.00, true),
    ('00000000-0000-0000-0000-000000000001', 'Soin Botox Capillaire & Kératine', 'Traitement restructurant intense, hydratation profonde et brillance miroir.', 'Soins Profonds', 75, 95.00, true),
    ('00000000-0000-0000-0000-000000000001', 'Coupe Homme & Barbe Prestige', 'Coupe tondeuse/ciseaux, dégradé à blanc, contouring barbe et serviette chaude.', 'Homme & Barbe', 45, 45.00, true),
    ('00000000-0000-0000-0000-000000000001', 'Lissage Brésilien Organique', 'Lissage longue durée nourrissant à base d''huiles précieuses sans formol.', 'Lissages', 150, 180.00, true)
ON CONFLICT DO NOTHING;

-- 3. STAFF INITIAL SEED
INSERT INTO public.staff (salon_id, nom, prenom, specialite, bio, email, telephone, is_active)
VALUES
    ('00000000-0000-0000-0000-000000000001', 'Diallo', 'Aminata', 'Master Styliste & Coloriste', 'Plus de 12 ans d''expérience dans la coiffure haute couture et la coloration sur-mesure.', 'aminata@oulibij-salon.fr', '+33 6 11 22 33 44', true),
    ('00000000-0000-0000-0000-000000000001', 'Koffi', 'Yannick', 'Expert Tresses & Soins Texturés', 'Spécialiste des tresses artistiques, locks et textures afro/métisses.', 'yannick@oulibij-salon.fr', '+33 6 22 33 44 55', true),
    ('00000000-0000-0000-0000-000000000001', 'Laurent', 'Chloé', 'Spécialiste Balayage & Brushing', 'Passionnée par les blonds lumineux et les brushings volumineux façon tapis rouge.', 'chloe@oulibij-salon.fr', '+33 6 33 44 55 66', true)
ON CONFLICT DO NOTHING;
