-- Tabel pentru albume de galerie
CREATE TABLE IF NOT EXISTS galerie_albume (
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

-- Index pentru performanță
CREATE INDEX IF NOT EXISTS idx_galerie_publicat ON galerie_albume(publicat);
CREATE INDEX IF NOT EXISTS idx_galerie_created_at ON galerie_albume(created_at DESC);

-- Dezactivez RLS pentru că autentificarea se face în API
ALTER TABLE galerie_albume DISABLE ROW LEVEL SECURITY;

-- Trigger pentru updated_at
CREATE OR REPLACE FUNCTION update_galerie_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER galerie_updated_at_trigger
  BEFORE UPDATE ON galerie_albume
  FOR EACH ROW
  EXECUTE FUNCTION update_galerie_updated_at();
