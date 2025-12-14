-- FIX pentru eroarea "Unauthorized"
-- Rulează acest SQL în Supabase SQL Editor

-- Șterge policy-urile existente
DROP POLICY IF EXISTS "Public can view published albums" ON galerie_albume;
DROP POLICY IF EXISTS "Admins can do everything" ON galerie_albume;

-- Dezactivează RLS complet (autentificarea se face în API)
ALTER TABLE galerie_albume DISABLE ROW LEVEL SECURITY;
