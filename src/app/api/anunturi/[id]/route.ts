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
