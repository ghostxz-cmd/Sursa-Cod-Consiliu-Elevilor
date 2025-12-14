import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    let query = supabase
      .from('anunturi')
      .select('*')
      .eq('publicat', true)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: anunturi, error } = await query;

    if (error) {
      console.error('Fetch public anunturi error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ anunturi: anunturi || [] });
  } catch (error) {
    console.error('Public anunturi error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch anunturi' },
      { status: 500 }
    );
  }
}
