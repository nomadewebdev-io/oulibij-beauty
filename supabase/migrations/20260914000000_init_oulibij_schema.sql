-- ==============================================================================
-- SCHEMA INITIALISATION & RLS POLICIES FOR SALON "OULIBIJ"
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. CREATE TABLES
-- ==============================================================================

-- TABLE: salons
CREATE TABLE IF NOT EXISTS public.salons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    description TEXT,
    adresse TEXT,
    code_postal TEXT,
    ville TEXT,
    telephone TEXT,
    email TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    horaires_ouverture JSONB DEFAULT '{
        "lundi": {"ouvert": true, "debut": "09:00", "fin": "19:00"},
        "mardi": {"ouvert": true, "debut": "09:00", "fin": "19:00"},
        "mercredi": {"ouvert": true, "debut": "09:00", "fin": "19:00"},
        "jeudi": {"ouvert": true, "debut": "09:00", "fin": "19:30"},
        "vendredi": {"ouvert": true, "debut": "09:00", "fin": "20:00"},
        "samedi": {"ouvert": true, "debut": "08:30", "fin": "19:30"},
        "dimanche": {"ouvert": false, "debut": null, "fin": null}
    }'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- TABLE: profiles (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    telephone TEXT,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'staff', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- TABLE: services
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
    nom TEXT NOT NULL,
    description TEXT,
    categorie TEXT NOT NULL DEFAULT 'Général',
    duree_minutes INTEGER NOT NULL DEFAULT 45,
    prix NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- TABLE: staff
CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    specialite TEXT,
    bio TEXT,
    avatar_url TEXT,
    email TEXT,
    telephone TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- TABLE: disponibilites
CREATE TABLE IF NOT EXISTS public.disponibilites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
    jour_semaine INTEGER NOT NULL CHECK (jour_semaine BETWEEN 0 AND 6),
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- TABLE: rendez_vous
CREATE TABLE IF NOT EXISTS public.rendez_vous (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    staff_id UUID REFERENCES public.staff(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    client_nom TEXT,
    client_email TEXT,
    client_telephone TEXT,
    date_heure_debut TIMESTAMPTZ NOT NULL,
    date_heure_fin TIMESTAMPTZ NOT NULL,
    statut TEXT NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirme', 'annule', 'termine')),
    notes_client TEXT,
    notes_salon TEXT,
    prix_total NUMERIC(10, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- TABLE: realisations
CREATE TABLE IF NOT EXISTS public.realisations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
    staff_id UUID REFERENCES public.staff(id) ON DELETE SET NULL,
    titre TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    categorie TEXT,
    date_realisation DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ==============================================================================

ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disponibilites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rendez_vous ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.realisations ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 4. RLS POLICIES & HELPER FUNCTIONS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.is_staff_or_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  IF user_id IS NULL THEN
    RETURN false;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role IN ('staff', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --- SALONS ---
DROP POLICY IF EXISTS "Salons public read access" ON public.salons;
CREATE POLICY "Salons public read access" ON public.salons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Salons admin full control" ON public.salons;
CREATE POLICY "Salons admin full control" ON public.salons FOR ALL
    USING (public.is_staff_or_admin(auth.uid()))
    WITH CHECK (public.is_staff_or_admin(auth.uid()));

-- --- PROFILES ---
DROP POLICY IF EXISTS "Profiles read own profile or staff/admin read all" ON public.profiles;
CREATE POLICY "Profiles read own profile or staff/admin read all" ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_staff_or_admin(auth.uid()));

DROP POLICY IF EXISTS "Profiles update own profile or admin" ON public.profiles;
CREATE POLICY "Profiles update own profile or admin" ON public.profiles FOR UPDATE
    USING (auth.uid() = id OR public.is_staff_or_admin(auth.uid()))
    WITH CHECK (auth.uid() = id OR public.is_staff_or_admin(auth.uid()));

DROP POLICY IF EXISTS "Profiles insert own profile" ON public.profiles;
CREATE POLICY "Profiles insert own profile" ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- --- SERVICES ---
DROP POLICY IF EXISTS "Services public read access" ON public.services;
CREATE POLICY "Services public read access" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Services staff/admin manage" ON public.services;
CREATE POLICY "Services staff/admin manage" ON public.services FOR ALL
    USING (public.is_staff_or_admin(auth.uid()))
    WITH CHECK (public.is_staff_or_admin(auth.uid()));

-- --- STAFF ---
DROP POLICY IF EXISTS "Staff public read access" ON public.staff;
CREATE POLICY "Staff public read access" ON public.staff FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff admin manage" ON public.staff;
CREATE POLICY "Staff admin manage" ON public.staff FOR ALL
    USING (public.is_staff_or_admin(auth.uid()))
    WITH CHECK (public.is_staff_or_admin(auth.uid()));

-- --- DISPONIBILITES ---
DROP POLICY IF EXISTS "Disponibilites public read access" ON public.disponibilites;
CREATE POLICY "Disponibilites public read access" ON public.disponibilites FOR SELECT USING (true);

DROP POLICY IF EXISTS "Disponibilites staff/admin manage" ON public.disponibilites;
CREATE POLICY "Disponibilites staff/admin manage" ON public.disponibilites FOR ALL
    USING (public.is_staff_or_admin(auth.uid()))
    WITH CHECK (public.is_staff_or_admin(auth.uid()));

-- --- RENDEZ_VOUS ---
DROP POLICY IF EXISTS "Rendez_vous client read own" ON public.rendez_vous;
CREATE POLICY "Rendez_vous client read own" ON public.rendez_vous FOR SELECT
    USING (auth.uid() = client_id OR public.is_staff_or_admin(auth.uid()));

DROP POLICY IF EXISTS "Rendez_vous insert access" ON public.rendez_vous;
CREATE POLICY "Rendez_vous insert access" ON public.rendez_vous FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Rendez_vous client update own or staff/admin manage" ON public.rendez_vous;
CREATE POLICY "Rendez_vous client update own or staff/admin manage" ON public.rendez_vous FOR UPDATE
    USING (auth.uid() = client_id OR public.is_staff_or_admin(auth.uid()))
    WITH CHECK (auth.uid() = client_id OR public.is_staff_or_admin(auth.uid()));

DROP POLICY IF EXISTS "Rendez_vous staff/admin delete" ON public.rendez_vous;
CREATE POLICY "Rendez_vous staff/admin delete" ON public.rendez_vous FOR DELETE
    USING (public.is_staff_or_admin(auth.uid()));

-- --- REALISATIONS ---
DROP POLICY IF EXISTS "Realisations public read access" ON public.realisations;
CREATE POLICY "Realisations public read access" ON public.realisations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Realisations staff/admin manage" ON public.realisations;
CREATE POLICY "Realisations staff/admin manage" ON public.realisations FOR ALL
    USING (public.is_staff_or_admin(auth.uid()))
    WITH CHECK (public.is_staff_or_admin(auth.uid()));

-- ==============================================================================
-- 5. TRIGGER: AUTO-CREATE PROFILE ON AUTH SIGN-UP
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_salon_id UUID;
BEGIN
    SELECT id INTO default_salon_id FROM public.salons LIMIT 1;

    INSERT INTO public.profiles (id, salon_id, email, full_name, role)
    VALUES (
        NEW.id,
        default_salon_id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'client')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 6. INSERT DEFAULT ROW FOR SALON "OULIBIJ"
-- ==============================================================================

INSERT INTO public.salons (
    id,
    nom,
    description,
    adresse,
    code_postal,
    ville,
    telephone,
    email,
    logo_url,
    cover_image_url
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

-- ==============================================================================
-- 7. STORAGE BUCKETS SETUP (Public read)
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('salons', 'salons', true),
    ('services', 'services', true),
    ('staff', 'staff', true),
    ('realisations', 'realisations', true),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Access on Salons Storage" ON storage.objects;
CREATE POLICY "Public Read Access on Salons Storage" ON storage.objects FOR SELECT USING (bucket_id = 'salons');

DROP POLICY IF EXISTS "Public Read Access on Services Storage" ON storage.objects;
CREATE POLICY "Public Read Access on Services Storage" ON storage.objects FOR SELECT USING (bucket_id = 'services');

DROP POLICY IF EXISTS "Public Read Access on Staff Storage" ON storage.objects;
CREATE POLICY "Public Read Access on Staff Storage" ON storage.objects FOR SELECT USING (bucket_id = 'staff');

DROP POLICY IF EXISTS "Public Read Access on Realisations Storage" ON storage.objects;
CREATE POLICY "Public Read Access on Realisations Storage" ON storage.objects FOR SELECT USING (bucket_id = 'realisations');

DROP POLICY IF EXISTS "Public Read Access on Avatars Storage" ON storage.objects;
CREATE POLICY "Public Read Access on Avatars Storage" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');
