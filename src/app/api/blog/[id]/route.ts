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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verificăm autentificarea
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const { error } = await supabase
      .from('blog_articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete blog article error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete blog article error:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
