import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET - Fetch only published parteneri for public pages
export async function GET(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let query = supabase
      .from('parteneri')
      .select('*')
      .eq('publicat', true)
      .order('pozitie_afisare', { ascending: true })
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la încărcarea partenerilor' },
      { status: 500 }
    );
  }
}
