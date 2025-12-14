import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupGalerieTable() {
  console.log('🔧 Verificare și creare tabel galerie_albume...');

  try {
    const { data: existingData, error: checkError } = await supabase
      .from('galerie_albume')
      .select('id')
      .limit(1);

    if (!checkError) {
      console.log('✅ Tabelul galerie_albume există deja!');
      return;
    }

    console.log('📝 Tabelul nu există, îl creez acum...');

    const createTableSQL = `
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

      CREATE INDEX IF NOT EXISTS idx_galerie_publicat ON galerie_albume(publicat);
      CREATE INDEX IF NOT EXISTS idx_galerie_created_at ON galerie_albume(created_at DESC);

      ALTER TABLE galerie_albume ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Public can view published albums" ON galerie_albume;
      CREATE POLICY "Public can view published albums" ON galerie_albume
        FOR SELECT
        USING (publicat = true);

      DROP POLICY IF EXISTS "Admins can do everything" ON galerie_albume;
      CREATE POLICY "Admins can do everything" ON galerie_albume
        FOR ALL
        USING (true)
        WITH CHECK (true);
    `;

    const { error: createError } = await supabase.rpc('exec_sql', { 
      sql: createTableSQL 
    });

    if (createError) {
      console.error('❌ Eroare la creare tabel:', createError);
      console.log('⚠️  Trebuie să rulezi manual SQL-ul din supabase_galerie_setup.sql în Supabase Dashboard');
    } else {
      console.log('✅ Tabel galerie_albume creat cu succes!');
    }

  } catch (error) {
    console.error('❌ Eroare:', error);
    console.log('\n📋 PAȘI MANUALI:');
    console.log('1. Deschide https://app.supabase.com');
    console.log('2. Mergi la SQL Editor');
    console.log('3. Copiază conținutul din supabase_galerie_setup.sql');
    console.log('4. Rulează SQL-ul\n');
  }
}

setupGalerieTable();
