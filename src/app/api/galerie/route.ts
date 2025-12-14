import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function isAuthenticated(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('admin_session')?.value;

  console.log('🔐 Checking auth - sessionId:', sessionId);

  if (!sessionId) {
    console.log('❌ No session ID found');
    return false;
  }

  const { data, error } = await supabase
    .from('admin_sessions')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  console.log('🔍 Session lookup - data:', data, 'error:', error);

  return !!data;
}

export async function GET() {
  try {
    const { data: albume, error } = await supabase
      .from('galerie_albume')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ albume: albume || [] });
  } catch (error) {
    console.error('Error fetching albume:', error);
    return NextResponse.json({ error: 'Failed to fetch albume' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titlu, descriere, coperta, poze, publicat } = body;

    if (!titlu || !coperta || !poze || poze.length === 0) {
      return NextResponse.json(
        { error: 'Titlu, copertă și poze sunt obligatorii' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('galerie_albume')
      .insert([
        {
          titlu,
          descriere: descriere || '',
          coperta,
          poze,
          publicat: publicat || false,
          vizualizari: 0
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, album: data });
  } catch (error: any) {
    console.error('Error creating album:', error);
    return NextResponse.json({ 
      error: 'Failed to create album', 
      details: error.message || error.toString() 
    }, { status: 500 });
  }
}
