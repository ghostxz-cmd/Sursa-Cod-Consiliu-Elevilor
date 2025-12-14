import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const { data: articles, error } = await supabase
      .from('blog_articles')
      .select(`
        id,
        titlu,
        rezumat,
        imagine_principala,
        created_at,
        vizualizari
      `)
      .eq('publicat', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Fetch public blog error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ articles: articles || [] });
  } catch (error) {
    console.error('Public blog error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
