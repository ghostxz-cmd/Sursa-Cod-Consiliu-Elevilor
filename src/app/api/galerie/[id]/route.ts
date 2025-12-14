import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { id } = await context.params;

    const { data: album, error } = await supabase
      .from('galerie_albume')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    await supabase
      .from('galerie_albume')
      .update({ vizualizari: (album.vizualizari || 0) + 1 })
      .eq('id', id);

    return NextResponse.json({ album });
  } catch (error) {
    console.error('Error fetching album:', error);
    return NextResponse.json({ error: 'Failed to fetch album' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { id } = await context.params;

    const { error } = await supabase
      .from('galerie_albume')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting album:', error);
    return NextResponse.json({ error: 'Failed to delete album' }, { status: 500 });
  }
}
