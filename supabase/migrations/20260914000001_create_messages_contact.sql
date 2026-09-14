-- ==============================================================================
-- TABLE: messages_contact
-- Permet aux visiteurs d'envoyer des messages depuis le formulaire /contact
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.messages_contact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT,
    sujet TEXT,
    message TEXT NOT NULL,
    lu BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Activation de RLS
ALTER TABLE public.messages_contact ENABLE ROW LEVEL SECURITY;

-- Politiques RLS :
-- 1. Tout le monde (visiteurs anonymes et connectés) peut insérer un message
DROP POLICY IF EXISTS "Public insert access for messages_contact" ON public.messages_contact;
CREATE POLICY "Public insert access for messages_contact" ON public.messages_contact 
    FOR INSERT 
    WITH CHECK (true);

-- 2. Seuls le staff et les administrateurs peuvent consulter et gérer les messages
DROP POLICY IF EXISTS "Staff and admin manage messages_contact" ON public.messages_contact;
CREATE POLICY "Staff and admin manage messages_contact" ON public.messages_contact 
    FOR ALL 
    USING (public.is_staff_or_admin(auth.uid()))
    WITH CHECK (public.is_staff_or_admin(auth.uid()));
