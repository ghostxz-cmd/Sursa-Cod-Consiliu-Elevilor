const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zcihffxzqmyayfxfmesu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWhmZnh6cW15YXlmeGZtZXN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTMwNTY4MywiZXhwIjoyMDgwODgxNjgzfQ.kp_pPnaBTJ8g6wgBRTJm5D6ZPJIaX_l7xfKvYoasvLw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  console.log('\n🔍 Testez conexiunea la Supabase...\n');
  
  try {
    const { data, error } = await supabase
      .from('galerie_albume')
      .select('count')
      .limit(1);

    if (error) {
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('❌ Tabelul galerie_albume NU EXISTĂ în Supabase!\n');
        console.log('📋 PAȘI PENTRU CREARE TABEL:\n');
        console.log('1. Deschide https://app.supabase.com/project/zcihffxzqmyayfxfmesu/editor');
        console.log('2. Click pe "SQL Editor" în meniul lateral stâng');
        console.log('3. Click pe "+ New Query"');
        console.log('4. Copiază TOT conținutul din fișierul supabase_galerie_setup.sql');
        console.log('5. Lipește în editor și apasă "Run" (sau Ctrl+Enter)');
        console.log('6. Rulează din nou acest script pentru verificare\n');
        return false;
      }
      throw error;
    }

    console.log('✅ Conexiune reușită!');
    console.log('✅ Tabelul galerie_albume există și funcționează!\n');
    return true;

  } catch (error) {
    console.error('❌ Eroare conexiune:', error.message);
    console.log('\n⚠️  Verifică variabilele de mediu în .env.local\n');
    return false;
  }
}

testSupabaseConnection();
