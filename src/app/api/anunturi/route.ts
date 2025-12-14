import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data: anunturi, error } = await supabase
      .from('anunturi')
      .select(`
        *,
        autor:admin_users(nume, prenume)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch anunturi error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ anunturi: anunturi || [] });
  } catch (error) {
    console.error('Anunturi error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch anunturi' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titlu, continut, rezumat, status, prioritate, data_expirare, imagine_principala, tags, publicat } = body;

    const { data: anunt, error } = await supabase
      .from('anunturi')
      .insert({
        titlu,
        continut,
        rezumat,
        status: status || 'draft',
        prioritate: prioritate || 'normal',
        data_expirare,
        imagine_principala,
        tags,
        publicat: publicat || false,
        vizualizari: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Create anunt error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ anunt });
  } catch (error) {
    console.error('Create anunt error:', error);
    return NextResponse.json(
      { error: 'Failed to create anunt' },
      { status: 500 }
    );
  }
}
