import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: article, error } = await supabase
      .from('blog_articles')
      .select(`
        *,
        autor:admin_users(nume, prenume)
      `)
      .eq('id', id)
      .eq('publicat', true)
      .single();

    if (error || !article) {
      return NextResponse.json(
        { error: 'Articol negăsit' },
        { status: 404 }
      );
    }

    // Incrementăm vizualizările
    await supabase
      .from('blog_articles')
      .update({ vizualizari: (article.vizualizari || 0) + 1 })
      .eq('id', id);

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Blog article error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
