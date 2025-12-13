-- Schema SQL completă pentru CTGC Piatra Neamț
-- Sistem securizat cu RLS (Row Level Security) și funcții administrative

-- Activăm extensiile necesare
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===============================
-- TABELE PRINCIPALE
-- ===============================

-- Tabela pentru utilizatori admin
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nume VARCHAR(100) NOT NULL,
    prenume VARCHAR(100) NOT NULL,
    rol VARCHAR(50) DEFAULT 'admin' NOT NULL,
    activ BOOLEAN DEFAULT true NOT NULL,
    ultima_logare TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela pentru anunțuri
CREATE TABLE IF NOT EXISTS anunturi (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titlu VARCHAR(255) NOT NULL,
    continut TEXT NOT NULL,
    rezumat TEXT,
    autor_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
    prioritate VARCHAR(50) DEFAULT 'normal' NOT NULL CHECK (prioritate IN ('low', 'normal', 'high', 'urgent')),
    data_expirare TIMESTAMP WITH TIME ZONE,
    imagine_principala TEXT,
    tags TEXT[],
    vizualizari INTEGER DEFAULT 0 NOT NULL,
    publicat BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela pentru categorii anunțuri
CREATE TABLE IF NOT EXISTS categorii_anunturi (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nume VARCHAR(100) UNIQUE NOT NULL,
    descriere TEXT,
    culoare VARCHAR(7) DEFAULT '#3b82f6', -- hex color
    icon VARCHAR(100),
    activa BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de legătură anunțuri - categorii (many-to-many)
CREATE TABLE IF NOT EXISTS anunturi_categorii (
    anunt_id UUID REFERENCES anunturi(id) ON DELETE CASCADE,
    categorie_id UUID REFERENCES categorii_anunturi(id) ON DELETE CASCADE,
    PRIMARY KEY (anunt_id, categorie_id)
);

-- Tabela pentru albume foto
CREATE TABLE IF NOT EXISTS albume (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nume VARCHAR(255) NOT NULL,
    descriere TEXT,
    poza_cover TEXT,
    autor_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'private')),
    data_eveniment DATE,
    locatie VARCHAR(255),
    tags TEXT[],
    vizualizari INTEGER DEFAULT 0 NOT NULL,
    publicat BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela pentru fotografii
CREATE TABLE IF NOT EXISTS poze (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    album_id UUID REFERENCES albume(id) ON DELETE CASCADE NOT NULL,
    nume_poza VARCHAR(255) NOT NULL,
    descriere TEXT,
    url_poza TEXT NOT NULL,
    url_thumbnail TEXT,
    url_watermark TEXT,
    dimensiuni JSONB, -- {width: 1920, height: 1080}
    marime_fisier INTEGER, -- în bytes
    tip_fisier VARCHAR(10), -- jpg, png, webp
    ordine_sortare INTEGER DEFAULT 0,
    autor_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    vizualizari INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela pentru evenimente/activități
CREATE TABLE IF NOT EXISTS evenimente (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titlu VARCHAR(255) NOT NULL,
    descriere TEXT NOT NULL,
    data_incepere TIMESTAMP WITH TIME ZONE NOT NULL,
    data_sfarsit TIMESTAMP WITH TIME ZONE,
    locatie VARCHAR(255),
    organizator_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    tip_eveniment VARCHAR(100) NOT NULL, -- sedinta, excursie, concurs, etc.
    status VARCHAR(50) DEFAULT 'planificat' NOT NULL CHECK (status IN ('planificat', 'in_desfasurare', 'finalizat', 'anulat')),
    capacitate_maxima INTEGER,
    participanti_inscrisi INTEGER DEFAULT 0,
    pret DECIMAL(10,2) DEFAULT 0,
    necesita_inscriere BOOLEAN DEFAULT false,
    imagine_eveniment TEXT,
    publicat BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela pentru înscrierea la evenimente
CREATE TABLE IF NOT EXISTS inscrieri_evenimente (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    eveniment_id UUID REFERENCES evenimente(id) ON DELETE CASCADE NOT NULL,
    nume VARCHAR(100) NOT NULL,
    prenume VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefon VARCHAR(20),
    clasa VARCHAR(10),
    mesaj_special TEXT,
    status_inscriere VARCHAR(50) DEFAULT 'in_asteptare' NOT NULL CHECK (status_inscriere IN ('in_asteptare', 'confirmat', 'respins')),
    data_inscriere TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmat_de UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    data_confirmare TIMESTAMP WITH TIME ZONE
);

-- Tabela pentru setările site-ului
CREATE TABLE IF NOT EXISTS setari_site (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cheie VARCHAR(100) UNIQUE NOT NULL,
    valoare TEXT NOT NULL,
    tip VARCHAR(50) DEFAULT 'string' NOT NULL CHECK (tip IN ('string', 'number', 'boolean', 'json')),
    descriere TEXT,
    categoria VARCHAR(100) DEFAULT 'general',
    editat_de UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela pentru loguri administrative
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    actiune VARCHAR(255) NOT NULL,
    tabel_afectat VARCHAR(100),
    record_id UUID,
    detalii JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela pentru sesiunile admin
CREATE TABLE IF NOT EXISTS admin_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE NOT NULL,
    session_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    activa BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- FUNCȚII PENTRU SECURITATE
-- ===============================

-- Funcție pentru hash-uirea parolelor
CREATE OR REPLACE FUNCTION hash_password(password TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN crypt(password, gen_salt('bf', 12));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcție pentru verificarea parolelor
CREATE OR REPLACE FUNCTION verify_password(password TEXT, hash TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (hash = crypt(password, hash));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funcție pentru generarea tokenurilor de sesiune
CREATE OR REPLACE FUNCTION generate_session_token()
RETURNS TEXT AS $$
BEGIN
    RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- ===============================
-- FUNCȚII TRIGGER
-- ===============================

-- Funcție pentru actualizarea timestamp-ului updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger-e pentru actualizarea automată a updated_at
CREATE TRIGGER trigger_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_anunturi_updated_at
    BEFORE UPDATE ON anunturi
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_albume_updated_at
    BEFORE UPDATE ON albume
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_evenimente_updated_at
    BEFORE UPDATE ON evenimente
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_setari_site_updated_at
    BEFORE UPDATE ON setari_site
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ===============================
-- INDEXURI PENTRU PERFORMANȚĂ
-- ===============================

-- Indexuri pentru anunțuri
CREATE INDEX IF NOT EXISTS idx_anunturi_status ON anunturi(status);
CREATE INDEX IF NOT EXISTS idx_anunturi_publicat ON anunturi(publicat);
CREATE INDEX IF NOT EXISTS idx_anunturi_created_at ON anunturi(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_anunturi_autor ON anunturi(autor_id);
CREATE INDEX IF NOT EXISTS idx_anunturi_tags ON anunturi USING GIN(tags);

-- Indexuri pentru albume
CREATE INDEX IF NOT EXISTS idx_albume_status ON albume(status);
CREATE INDEX IF NOT EXISTS idx_albume_publicat ON albume(publicat);
CREATE INDEX IF NOT EXISTS idx_albume_created_at ON albume(created_at DESC);

-- Indexuri pentru poze
CREATE INDEX IF NOT EXISTS idx_poze_album ON poze(album_id);
CREATE INDEX IF NOT EXISTS idx_poze_ordine ON poze(album_id, ordine_sortare);

-- Indexuri pentru evenimente
CREATE INDEX IF NOT EXISTS idx_evenimente_data ON evenimente(data_incepere);
CREATE INDEX IF NOT EXISTS idx_evenimente_status ON evenimente(status);
CREATE INDEX IF NOT EXISTS idx_evenimente_publicat ON evenimente(publicat);

-- Indexuri pentru admin
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at DESC);

-- ===============================
-- POLITICI RLS (ROW LEVEL SECURITY)
-- ===============================

-- Activăm RLS pe tabelele sensibile
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Politici pentru admin_users (doar admin-ii pot vedea alți admini)
CREATE POLICY admin_users_policy ON admin_users
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_sessions s 
            WHERE s.admin_id = admin_users.id 
            AND s.expires_at > NOW() 
            AND s.activa = true
        )
    );

-- ===============================
-- DATE INIȚIALE
-- ===============================

-- Inserăm utilizatorul admin implicit
INSERT INTO admin_users (email, password_hash, nume, prenume, rol) 
VALUES (
    'admin@ctgc.ro',
    hash_password('CTGCAdmin2025!'),
    'Administrator',
    'Sistem',
    'super_admin'
) ON CONFLICT (email) DO NOTHING;

-- Inserăm categoriile implicite pentru anunțuri
INSERT INTO categorii_anunturi (nume, descriere, culoare, icon) VALUES 
    ('Anunțuri Generale', 'Anunțuri importante pentru toți elevii', '#3b82f6', 'megaphone'),
    ('Evenimente', 'Evenimente și activități școlare', '#10b981', 'calendar'),
    ('Examene', 'Informații despre examene și evaluări', '#f59e0b', 'clipboard-list'),
    ('Concursuri', 'Concursuri școlare și olimpiade', '#8b5cf6', 'trophy'),
    ('Excursii', 'Excursii și ieșiri educaționale', '#06b6d4', 'map'),
    ('Festivități', 'Festivități și ceremonii', '#ec4899', 'gift')
ON CONFLICT (nume) DO NOTHING;

-- Inserăm setările implicite ale site-ului
INSERT INTO setari_site (cheie, valoare, tip, descriere, categoria) VALUES 
    ('site_name', 'CTGC Piatra Neamț', 'string', 'Numele site-ului', 'general'),
    ('site_description', 'Consiliul Tineretului din Piatra Neamț', 'string', 'Descrierea site-ului', 'general'),
    ('contact_email', 'contact@ctgc.ro', 'string', 'Email de contact', 'contact'),
    ('contact_phone', '0233-xxx-xxx', 'string', 'Telefon de contact', 'contact'),
    ('facebook_url', 'https://facebook.com/ctgc.pn', 'string', 'Link către Facebook', 'social'),
    ('instagram_url', 'https://instagram.com/ctgc.pn', 'string', 'Link către Instagram', 'social'),
    ('anunturi_per_page', '10', 'number', 'Numărul de anunțuri pe pagină', 'display'),
    ('albume_per_page', '12', 'number', 'Numărul de albume pe pagină', 'display'),
    ('allow_registration', 'false', 'boolean', 'Permite înregistrarea utilizatorilor', 'security'),
    ('site_maintenance', 'false', 'boolean', 'Modul mentenanță', 'general')
ON CONFLICT (cheie) DO NOTHING;

-- ===============================
-- COMENTARII PENTRU DOCUMENTAȚIE
-- ===============================

COMMENT ON TABLE admin_users IS 'Utilizatori cu drepturi administrative';
COMMENT ON TABLE anunturi IS 'Anunțurile publicate pe site';
COMMENT ON TABLE albume IS 'Albumele foto din galerie';
COMMENT ON TABLE poze IS 'Fotografiile din albume';
COMMENT ON TABLE evenimente IS 'Evenimente și activități';
COMMENT ON TABLE setari_site IS 'Configurări globale ale site-ului';
COMMENT ON TABLE admin_logs IS 'Logurile acțiunilor administrative';
COMMENT ON TABLE admin_sessions IS 'Sesiunile active ale administratorilor';