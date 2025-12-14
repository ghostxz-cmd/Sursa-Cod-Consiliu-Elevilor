-- Creare tabel blog_articles
CREATE TABLE IF NOT EXISTS public.blog_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titlu TEXT NOT NULL,
    continut TEXT NOT NULL,
    rezumat TEXT,
    imagine_principala TEXT,
    tags TEXT[],
    vizualizari INTEGER DEFAULT 0,
    publicat BOOLEAN DEFAULT false,
    autor_id UUID REFERENCES public.admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pentru performanță
CREATE INDEX IF NOT EXISTS idx_blog_articles_publicat ON public.blog_articles(publicat);
CREATE INDEX IF NOT EXISTS idx_blog_articles_created_at ON public.blog_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_articles_autor_id ON public.blog_articles(autor_id);

-- Enable Row Level Security
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

-- Policy pentru citire publică (doar articole publicate)
CREATE POLICY "Allow public read published"
ON public.blog_articles
FOR SELECT
USING (publicat = true);

-- Policy pentru inserare (oricine poate insera, verificăm în API)
CREATE POLICY "Allow insert for all"
ON public.blog_articles
FOR INSERT
WITH CHECK (true);

-- Policy pentru update (oricine poate actualiza, verificăm în API)
CREATE POLICY "Allow update for all"
ON public.blog_articles
FOR UPDATE
USING (true);

-- Policy pentru delete (oricine poate șterge, verificăm în API)
CREATE POLICY "Allow delete for all"
ON public.blog_articles
FOR DELETE
USING (true);

-- Policy pentru citire toate articolele (inclusiv draft-uri)
CREATE POLICY "Allow read all"
ON public.blog_articles
FOR SELECT
USING (true);

-- Trigger pentru updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_articles_updated_at
    BEFORE UPDATE ON public.blog_articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarii
COMMENT ON TABLE public.blog_articles IS 'Tabel pentru articole de blog';
COMMENT ON COLUMN public.blog_articles.titlu IS 'Titlul articolului';
COMMENT ON COLUMN public.blog_articles.continut IS 'Conținutul complet HTML al articolului';
COMMENT ON COLUMN public.blog_articles.rezumat IS 'Rezumat scurt pentru preview';
COMMENT ON COLUMN public.blog_articles.imagine_principala IS 'URL sau base64 pentru imagine banner';
COMMENT ON COLUMN public.blog_articles.tags IS 'Array de tag-uri';
COMMENT ON COLUMN public.blog_articles.vizualizari IS 'Număr de vizualizări';
COMMENT ON COLUMN public.blog_articles.publicat IS 'Dacă articolul este publicat sau draft';
