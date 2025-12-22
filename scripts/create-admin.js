const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zcihffxzqmyayfxfmesu.supabase.co';
// Folosim service_role key pentru a ocoli RLS
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWhmZnh6cW15YXlmeGZtZXN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTMwNTY4MywiZXhwIjoyMDgwODgxNjgzfQ.kp_pPnaBTJ8g6wgBRTJm5D6ZPJIaX_l7xfKvYoasvLw';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  try {
    console.log('Creez utilizatorul admin...');

    // Hash parola
    const { data: hash, error: hashError } = await supabase.rpc('hash_password', {
      password: '299638rar'
    });

    if (hashError) {
      console.error('Eroare la hash-uirea parolei:', hashError);
      return;
    }

    console.log('Parola hash-uită cu succes');

    // Inserez utilizatorul
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email: 'cse.ctgc@colegiulcartianu.ro',
        nume: 'Admin',
        prenume: 'CTGC',
        rol: 'super_admin',
        activ: true,
        password_hash: hash
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        console.log('✅ Utilizatorul există deja!');
        
        // Actualizez parola
        const { error: updateError } = await supabase
          .from('admin_users')
          .update({ password_hash: hash, activ: true })
          .eq('email', 'cse.ctgc@colegiulcartianu.ro');

        if (updateError) {
          console.error('Eroare la actualizarea parolei:', updateError);
        } else {
          console.log('✅ Parola a fost actualizată!');
        }
      } else {
        console.error('Eroare la crearea utilizatorului:', error);
      }
      return;
    }

    console.log('✅ Utilizator admin creat cu succes!');
    console.log('Email: cse.ctgc@colegiulcartianu.ro');
    console.log('Parola: 299638rar');
    console.log('Rol: super_admin');
    console.log('\nPoți accesa dashboard-ul la: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('Eroare:', error);
  }
}

createAdmin();
