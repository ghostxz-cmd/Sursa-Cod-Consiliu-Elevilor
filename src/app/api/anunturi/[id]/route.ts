import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Preluăm anunțul
    const { data: anunt, error } = await supabase
      .from('anunturi')
      .select('*')
      .eq('id', id)
      .eq('publicat', true)
      .single();

    if (error) {
      console.error('Fetch anunt error:', error);
      return NextResponse.json({ error: 'Anunt not found' }, { status: 404 });
    }

    // Incrementăm vizualizările
    const { error: updateError } = await supabase
      .from('anunturi')
      .update({ vizualizari: (anunt.vizualizari || 0) + 1 })
      .eq('id', id);

    if (updateError) {
      console.error('Update views error:', updateError);
    }

    return NextResponse.json({ anunt });
  } catch (error) {
    console.error('Get anunt error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch anunt' },
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
      .from('anunturi')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete anunt error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete anunt error:', error);
    return NextResponse.json(
      { error: 'Failed to delete anunt' },
      { status: 500 }
    );
  }
}
