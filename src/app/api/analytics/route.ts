import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();

    // Database performance - măsurăm timpul de răspuns real
    const dbStartTime = Date.now();
    const { data: blogData, error: blogError } = await supabase
      .from('blog_articles')
      .select('id, vizualizari, created_at')
      .limit(1);
    const dbResponseTime = Date.now() - dbStartTime;

    // API Response time
    const apiResponseTime = Date.now() - startTime;

    // System info - Node.js process
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    // Database statistics
    const { count: totalArticles } = await supabase
      .from('blog_articles')
      .select('*', { count: 'exact', head: true });

    const { count: totalAnunturi } = await supabase
      .from('anunturi')
      .select('*', { count: 'exact', head: true });

    const { data: totalViews } = await supabase
      .from('blog_articles')
      .select('vizualizari');

    const sumViews = totalViews?.reduce((sum, item) => sum + (item.vizualizari || 0), 0) || 0;

    // Database connection health
    const dbHealthy = !blogError;

    // Calculate total database size (aproximativ)
    const estimatedDbSize = ((totalArticles || 0) * 5) + ((totalAnunturi || 0) * 3); // KB estimate

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      performance: {
        apiResponseTime: `${apiResponseTime}ms`,
        databaseResponseTime: `${dbResponseTime}ms`,
        databaseHealthy: dbHealthy,
        status: dbResponseTime < 100 ? 'Excelent' : dbResponseTime < 300 ? 'Bun' : 'Lent'
      },
      system: {
        memoryUsage: {
          rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
          heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
          heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`
        },
        uptime: `${Math.floor(uptime / 60)} minute`,
        nodeVersion: process.version,
        platform: process.platform
      },
      database: {
        totalArticles: totalArticles || 0,
        totalAnunturi: totalAnunturi || 0,
        totalViews: sumViews,
        estimatedSize: `${estimatedDbSize} KB`,
        responseTime: `${dbResponseTime}ms`
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
