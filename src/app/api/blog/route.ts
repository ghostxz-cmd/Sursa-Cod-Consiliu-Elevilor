import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Verificăm autentificarea
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: articles, error } = await supabase
      .from('blog_articles')
      .select(`
        *,
        autor:admin_users(nume, prenume)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch blog error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ articles: articles || [] });
  } catch (error) {
    console.error('Blog error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificăm autentificarea
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { titlu, continut, rezumat, imagine_principala, tags, publicat } = body;

    const { data: article, error } = await supabase
      .from('blog_articles')
      .insert({
        titlu,
        continut,
        rezumat,
        imagine_principala,
        tags,
        publicat: publicat || false,
        vizualizari: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Create blog error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog article' },
      { status: 500 }
    );
  }
}
