-- CLEANUP COMPLET + RECREARE TABEL GALERIE
-- Rulează acest SQL în Supabase SQL Editor

-- 1. Șterge trigger-ul
DROP TRIGGER IF EXISTS galerie_updated_at_trigger ON galerie_albume;

-- 2. Șterge funcția
DROP FUNCTION IF EXISTS update_galerie_updated_at();

-- 3. Șterge toate policy-urile
DROP POLICY IF EXISTS "Public can view published albums" ON galerie_albume;
DROP POLICY IF EXISTS "Admins can do everything" ON galerie_albume;

-- 4. Șterge tabelul complet
DROP TABLE IF EXISTS galerie_albume CASCADE;

-- 5. Recrează tabelul FĂRĂ RLS
CREATE TABLE galerie_albume (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titlu TEXT NOT NULL,
  descriere TEXT,
  coperta TEXT NOT NULL,
  poze TEXT[] NOT NULL,
  publicat BOOLEAN DEFAULT FALSE,
  vizualizari INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Creează indexuri
CREATE INDEX idx_galerie_publicat ON galerie_albume(publicat);
CREATE INDEX idx_galerie_created_at ON galerie_albume(created_at DESC);

-- 7. IMPORTANT: Dezactivează RLS complet
ALTER TABLE galerie_albume DISABLE ROW LEVEL SECURITY;

-- 8. Recrează funcția pentru updated_at
CREATE OR REPLACE FUNCTION update_galerie_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Recrează trigger-ul
CREATE TRIGGER galerie_updated_at_trigger
  BEFORE UPDATE ON galerie_albume
  FOR EACH ROW
  EXECUTE FUNCTION update_galerie_updated_at();

-- VERIFICARE FINALĂ
SELECT 'Tabel creat cu succes! RLS dezactivat.' as status;
