import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET - Fetch all parteneri (for admin)
export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from('parteneri')
      .select('*')
      .order('pozitie_afisare', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la încărcarea partenerilor' },
      { status: 500 }
    );
  }
}

// POST - Create new partener
export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const body = await request.json();

    const { data, error } = await supabase
      .from('parteneri')
      .insert([
        {
          nume: body.nume,
          logo: body.logo,
          descriere_scurta: body.descriere_scurta || null,
          descriere_completa: body.descriere_completa,
          website: body.website || null,
          email: body.email || null,
          telefon: body.telefon || null,
          adresa: body.adresa || null,
          imagine_cover: body.imagine_cover || null,
          pozitie_afisare: body.pozitie_afisare || 0,
          publicat: body.publicat || false,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la crearea partenerului' },
      { status: 500 }
    );
  }
}
