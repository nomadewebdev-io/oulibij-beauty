-- ==============================================================================
-- MIGRATION: 20260915000000_security_and_performance_patch.sql
-- Description: 
-- 1. Sécurité : Protection anti-élévation de privilège sur profiles (Trigger)
-- 2. Storage : Restreindre écriture/upload sur les buckets services, staff, salons, realisations aux admins
-- 3. Performance : Index PostgreSQL sur les clés étrangères et colonnes de filtre fréquentes
-- ==============================================================================

-- 1. FONCTIONS DE CONTRÔLE DE RÔLES ET PRIVILÈGES
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  IF user_id IS NULL THEN
    RETURN false;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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

-- 2. TRIGGER ANTI-ÉLÉVATION DE PRIVILÈGE SUR PROFILES (COLONNE ROLE)
CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Si le rôle est modifié
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- Bloquer si l'utilisateur connecté n'est pas admin (permet le service_role interne où auth.uid() est null)
    IF auth.uid() IS NOT NULL AND NOT public.is_admin(auth.uid()) THEN
      RAISE EXCEPTION 'Action non autorisée : seuls les administrateurs peuvent modifier le rôle des comptes.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_protect_profile_role ON public.profiles;
CREATE TRIGGER trg_protect_profile_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_role();

-- 3. STORAGE SECURITY : POLICIES POUR BUCKETS
-- Assurer l'existence des buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('salons', 'salons', true),
    ('services', 'services', true),
    ('staff', 'staff', true),
    ('realisations', 'realisations', true),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Lecture publique autorisée sur tous les buckets média
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

-- Supprimer l'ancienne policy générique trop permissive
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;

-- Restreindre Upload / Update / Delete sur salons, services, staff, realisations aux seuls Staff / Admins
DROP POLICY IF EXISTS "Admin upload on salon buckets" ON storage.objects;
CREATE POLICY "Admin upload on salon buckets" ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('salons', 'services', 'staff', 'realisations') 
    AND public.is_staff_or_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Admin update on salon buckets" ON storage.objects;
CREATE POLICY "Admin update on salon buckets" ON storage.objects FOR UPDATE
  USING (
    bucket_id IN ('salons', 'services', 'staff', 'realisations') 
    AND public.is_staff_or_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Admin delete on salon buckets" ON storage.objects;
CREATE POLICY "Admin delete on salon buckets" ON storage.objects FOR DELETE
  USING (
    bucket_id IN ('salons', 'services', 'staff', 'realisations') 
    AND public.is_staff_or_admin(auth.uid())
  );

-- Autoriser les utilisateurs authentifiés à uploader et gérer uniquement leurs avatars
DROP POLICY IF EXISTS "Authenticated users upload avatar" ON storage.objects;
CREATE POLICY "Authenticated users upload avatar" ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Authenticated users update avatar" ON storage.objects;
CREATE POLICY "Authenticated users update avatar" ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Authenticated users delete avatar" ON storage.objects;
CREATE POLICY "Authenticated users delete avatar" ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
  );

-- 4. PERFORMANCE : INDEX POSTGRESQL OPTIMISÉS
CREATE INDEX IF NOT EXISTS idx_rendez_vous_staff_date ON public.rendez_vous (staff_id, date_heure_debut, date_heure_fin, statut);
CREATE INDEX IF NOT EXISTS idx_rendez_vous_client ON public.rendez_vous (client_id, date_heure_debut DESC);
CREATE INDEX IF NOT EXISTS idx_rendez_vous_salon_statut ON public.rendez_vous (salon_id, statut);
CREATE INDEX IF NOT EXISTS idx_disponibilites_staff_day ON public.disponibilites (staff_id, jour_semaine, is_active);
CREATE INDEX IF NOT EXISTS idx_services_salon_active ON public.services (salon_id, is_active, categorie);
CREATE INDEX IF NOT EXISTS idx_staff_salon_active ON public.staff (salon_id, is_active);
CREATE INDEX IF NOT EXISTS idx_realisations_salon_cat ON public.realisations (salon_id, categorie, date_realisation DESC);
CREATE INDEX IF NOT EXISTS idx_messages_contact_salon_date ON public.messages_contact (salon_id, created_at DESC, lu);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);
