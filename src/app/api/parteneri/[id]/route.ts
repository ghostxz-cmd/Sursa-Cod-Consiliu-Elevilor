import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET - Fetch single partener by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { id } = await params;

    // Increment vizualizari with simple update
    const { data: currentData } = await supabase
      .from('parteneri')
      .select('vizualizari')
      .eq('id', id)
      .single();

    if (currentData) {
      await supabase
        .from('parteneri')
        .update({ vizualizari: (currentData.vizualizari || 0) + 1 })
        .eq('id', id);
    }

    const { data, error } = await supabase
      .from('parteneri')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Partenerul nu a fost găsit' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare' },
      { status: 500 }
    );
  }
}

// DELETE - Delete partener
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { id } = await params;

    const { error } = await supabase
      .from('parteneri')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la ștergerea partenerului' },
      { status: 500 }
    );
  }
}
