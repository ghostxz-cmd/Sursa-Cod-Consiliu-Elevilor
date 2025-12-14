const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zcihffxzqmyayfxfmesu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWhmZnh6cW15YXlmeGZtZXN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTMwNTY4MywiZXhwIjoyMDgwODgxNjgzfQ.kp_pPnaBTJ8g6wgBRTJm5D6ZPJIaX_l7xfKvYoasvLw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('\n🧪 Testez inserarea directă în galerie_albume...\n');
  
  try {
    const testAlbum = {
      titlu: 'Test Album',
      descriere: 'Album de test',
      coperta: 'https://via.placeholder.com/300',
      poze: ['https://via.placeholder.com/300', 'https://via.placeholder.com/400'],
      publicat: false,
      vizualizari: 0
    };

    console.log('📝 Încerc să inserez:', testAlbum);

    const { data, error } = await supabase
      .from('galerie_albume')
      .insert([testAlbum])
      .select()
      .single();

    if (error) {
      console.error('❌ EROARE la insert:', error);
      console.log('\n🔍 Detalii eroare:');
      console.log('- Code:', error.code);
      console.log('- Message:', error.message);
      console.log('- Details:', error.details);
      console.log('- Hint:', error.hint);
      
      if (error.code === '42501') {
        console.log('\n⚠️  Eroare de permisiuni RLS!');
        console.log('\n📋 RULEAZĂ EXACT ACEST SQL ÎN SUPABASE:');
        console.log('------------------------------------------');
        console.log('ALTER TABLE galerie_albume DISABLE ROW LEVEL SECURITY;');
        console.log('------------------------------------------\n');
        console.log('Link direct: https://app.supabase.com/project/zcihffxzqmyayfxfmesu/sql/new\n');
      }
      return false;
    }

    console.log('✅ SUCCESS! Album inserat:', data);
    
    console.log('\n🗑️  Șterg albumul de test...');
    await supabase.from('galerie_albume').delete().eq('id', data.id);
    console.log('✅ Album de test șters!\n');
    
    return true;

  } catch (error) {
    console.error('❌ Eroare critică:', error);
    return false;
  }
}

testInsert();
