import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let query = supabase
      .from('galerie_albume')
      .select('*')
      .eq('publicat', true)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: albume, error } = await query;

    if (error) throw error;

    return NextResponse.json({ albume: albume || [] });
  } catch (error) {
    console.error('Error fetching public albume:', error);
    return NextResponse.json({ error: 'Failed to fetch albume' }, { status: 500 });
  }
}
