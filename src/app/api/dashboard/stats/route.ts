import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Verificăm autentificarea
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Numărăm anunțurile
    const { count: totalAnunturi } = await supabase
      .from('anunturi')
      .select('*', { count: 'exact', head: true });

    // Numărăm articolele de blog
    const { count: totalBlog } = await supabase
      .from('blog_articles')
      .select('*', { count: 'exact', head: true });

    // Calculăm total vizualizări din anunțuri
    const { data: anunturiData } = await supabase
      .from('anunturi')
      .select('vizualizari');
    
    const totalVizualizari = anunturiData?.reduce((sum, item) => sum + (item.vizualizari || 0), 0) || 0;

    // Numărăm utilizatorii admin
    const { count: adminUsers } = await supabase
      .from('admin_users')
      .select('*', { count: 'exact', head: true })
      .eq('activ', true);

    return NextResponse.json({
      totalAnunturi: totalAnunturi || 0,
      totalBlog: totalBlog || 0,
      totalVizualizari: totalVizualizari,
      adminUsers: adminUsers || 0
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
