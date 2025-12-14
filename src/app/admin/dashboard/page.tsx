'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BlogEditor from '@/components/BlogEditor';
import AnuntEditor from '@/components/AnuntEditor';
import AlbumEditor from '@/components/AlbumEditor';

interface DashboardStats {
  totalAnunturi: number;
  totalBlog: number;
  totalVizualizari: number;
  adminUsers: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalAnunturi: 0,
    totalBlog: 0,
    totalVizualizari: 0,
    adminUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [anunturi, setAnunturi] = useState<any[]>([]);
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [showAnuntEditor, setShowAnuntEditor] = useState(false);
  const [showAlbumEditor, setShowAlbumEditor] = useState(false);
  const [albume, setAlbume] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    // Verificăm autentificarea
    checkAuth();
    loadStats();
  }, []);

  useEffect(() => {
    if (activeSection === 'anunturi') {
      loadAnunturi();
    } else if (activeSection === 'blog') {
      loadBlog();
    } else if (activeSection === 'galerie') {
      loadAlbume();
    } else if (activeSection === 'analytics') {
      loadAnalytics();
    }
  }, [activeSection]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      
      if (!data.authenticated) {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnunturi = async () => {
    setLoadingContent(true);
    try {
      const response = await fetch('/api/anunturi');
      if (response.ok) {
        const data = await response.json();
        setAnunturi(data.anunturi || []);
      }
    } catch (error) {
      console.error('Failed to load anunturi:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  const loadBlog = async () => {
    setLoadingContent(true);
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setBlogArticles(data.articles || []);
      }
    } catch (error) {
      console.error('Failed to load blog:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  const loadAlbume = async () => {
    setLoadingContent(true);
    try {
      const response = await fetch('/api/galerie');
      if (response.ok) {
        const data = await response.json();
        setAlbume(data.albume || []);
      }
    } catch (error) {
      console.error('Failed to load albume:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  const loadAnalytics = async () => {
    setLoadingContent(true);
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <Image
            src="/images/cropped-logo_color_simplu.png"
            alt="Logo"
            width={150}
            height={50}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1 }}>
          <button
            onClick={() => setActiveSection('dashboard')}
            style={{
              width: '100%',
              padding: '12px 16px',
              marginBottom: '8px',
              textAlign: 'left',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: activeSection === 'dashboard' ? '#1e88e5' : '#555',
              backgroundColor: activeSection === 'dashboard' ? '#e3f2fd' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveSection('analytics')}
            style={{
              width: '100%',
              padding: '12px 16px',
              marginBottom: '8px',
              textAlign: 'left',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: activeSection === 'analytics' ? '#1e88e5' : '#555',
              backgroundColor: activeSection === 'analytics' ? '#e3f2fd' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Analytics & Performanță
          </button>

          <button
            onClick={() => setActiveSection('anunturi')}
            style={{
              width: '100%',
              padding: '12px 16px',
              marginBottom: '8px',
              textAlign: 'left',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: activeSection === 'anunturi' ? '#1e88e5' : '#555',
              backgroundColor: activeSection === 'anunturi' ? '#e3f2fd' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Anunțuri
          </button>

          <button
            onClick={() => setActiveSection('blog')}
            style={{
              width: '100%',
              padding: '12px 16px',
              marginBottom: '8px',
              textAlign: 'left',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: activeSection === 'blog' ? '#1e88e5' : '#555',
              backgroundColor: activeSection === 'blog' ? '#e3f2fd' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Blog
          </button>

          <button
            onClick={() => setActiveSection('galerie')}
            style={{
              width: '100%',
              padding: '12px 16px',
              marginBottom: '8px',
              textAlign: 'left',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: activeSection === 'galerie' ? '#1e88e5' : '#555',
              backgroundColor: activeSection === 'galerie' ? '#e3f2fd' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Galerie
          </button>

          <button
            onClick={() => setActiveSection('setari')}
            style={{
              width: '100%',
              padding: '12px 16px',
              marginBottom: '8px',
              textAlign: 'left',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: activeSection === 'setari' ? '#1e88e5' : '#555',
              backgroundColor: activeSection === 'setari' ? '#e3f2fd' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Setări
          </button>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px 16px',
            textAlign: 'left',
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            color: '#d32f2f',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Deconectare
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px' }}>
        {/* Header */}
        <header style={{
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '5px',
              marginTop: 0
            }}>
              {activeSection === 'dashboard' && 'Dashboard'}
              {activeSection === 'analytics' && 'Analytics & Performanță'}
              {activeSection === 'anunturi' && 'Gestionare Anunțuri'}
              {activeSection === 'blog' && 'Gestionare Blog'}
              {activeSection === 'galerie' && 'Gestionare Galerie'}
              {activeSection === 'setari' && 'Setări'}
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              margin: 0
            }}>
              Bine ai venit în panoul de administrare
            </p>
          </div>

          <Link 
            href="/"
            target="_blank"
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: '#1e88e5',
              backgroundColor: '#e3f2fd',
              border: 'none',
              borderRadius: '8px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Vezi Site-ul →
          </Link>
        </header>

        {/* Dashboard Stats */}
        {activeSection === 'dashboard' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '25px',
              marginBottom: '40px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#666',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '10px',
                  marginTop: 0
                }}>
                  Total Anunțuri
                </h3>
                <p style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#1e88e5',
                  fontFamily: 'Montserrat, sans-serif',
                  margin: 0
                }}>
                  {stats.totalAnunturi}
                </p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#666',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '10px',
                  marginTop: 0
                }}>
                  Articole Blog
                </h3>
                <p style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#4caf50',
                  fontFamily: 'Montserrat, sans-serif',
                  margin: 0
                }}>
                  {stats.totalBlog}
                </p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#666',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '10px',
                  marginTop: 0
                }}>
                  Vizualizări
                </h3>
                <p style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#ff9800',
                  fontFamily: 'Montserrat, sans-serif',
                  margin: 0
                }}>
                  {stats.totalVizualizari}
                </p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#666',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '10px',
                  marginTop: 0
                }}>
                  Administratori
                </h3>
                <p style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#9c27b0',
                  fontFamily: 'Montserrat, sans-serif',
                  margin: 0
                }}>
                  {stats.adminUsers}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '25px',
                marginTop: 0
              }}>
                Acțiuni Rapide
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                <button
                  onClick={() => setActiveSection('anunturi')}
                  style={{
                    padding: '15px 20px',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#fff',
                    backgroundColor: '#1e88e5',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Adaugă Anunț
                </button>
                <button
                  onClick={() => setActiveSection('blog')}
                  style={{
                    padding: '15px 20px',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#fff',
                    backgroundColor: '#4caf50',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Scrie Articol
                </button>
                <button
                  onClick={() => setActiveSection('galerie')}
                  style={{
                    padding: '15px 20px',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#fff',
                    backgroundColor: '#ff9800',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Încarcă Imagine
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <div>
            {loadingContent ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Se încarcă datele...
              </p>
            ) : analyticsData ? (
              <div>
                {/* Performance Metrics */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#333',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '20px',
                    marginTop: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Performanță Server</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '15px'
                  }}>
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      borderLeft: '3px solid #4caf50'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>API Response Time</div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.performance.apiResponseTime}</div>
                    </div>

                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      borderLeft: '3px solid #2196f3'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>Database Response</div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.performance.databaseResponseTime}</div>
                    </div>

                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      borderLeft: '3px solid #ff9800'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>Status</div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.performance.status}</div>
                    </div>

                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      borderLeft: '3px solid #9c27b0'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>DB Health</div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: analyticsData.performance.databaseHealthy ? '#4caf50' : '#f44336',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.performance.databaseHealthy ? 'OK' : 'Error'}</div>
                    </div>
                  </div>
                </div>

                {/* System Resources */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#333',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '20px',
                    marginTop: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Resurse Sistem</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px'
                  }}>
                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '5px'
                      }}>Memory (RSS)</div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.system.memoryUsage.rss}</div>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '5px'
                      }}>Heap Used</div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.system.memoryUsage.heapUsed}</div>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '5px'
                      }}>Heap Total</div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.system.memoryUsage.heapTotal}</div>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '5px'
                      }}>Uptime</div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.system.uptime}</div>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '5px'
                      }}>Node Version</div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.system.nodeVersion}</div>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '5px'
                      }}>Platform</div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.system.platform}</div>
                    </div>
                  </div>
                </div>

                {/* Database Stats */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#333',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '20px',
                    marginTop: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Database Metrics</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '15px'
                  }}>
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>Total Articles</div>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#2196f3',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.database.totalArticles}</div>
                    </div>

                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>Total Anunturi</div>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#9c27b0',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.database.totalAnunturi}</div>
                    </div>

                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>Total Views</div>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#ff9800',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.database.totalViews}</div>
                    </div>

                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>DB Size</div>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#4caf50',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.database.estimatedSize}</div>
                    </div>

                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>DB Response</div>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#00bcd4',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.database.responseTime}</div>
                    </div>
                  </div>
                </div>

                {/* Environment Info */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#333',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '20px',
                    marginTop: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Environment Info</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '15px'
                  }}>
                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 600
                      }}>Node Environment</span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif',
                        padding: '4px 12px',
                        backgroundColor: '#e3f2fd',
                        borderRadius: '15px'
                      }}>{analyticsData.environment.nodeEnv}</span>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 600
                      }}>Timezone</span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{analyticsData.environment.timezone}</span>
                    </div>

                    <div style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 600
                      }}>Last Check</span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{new Date(analyticsData.timestamp).toLocaleTimeString('ro-RO')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Nu s-au putut încărca datele de analytics.
              </p>
            )}
          </div>
        )}


        {/* Blog Section */}
        {activeSection === 'blog' && !showBlogEditor && (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                margin: 0
              }}>
                Toate Articolele ({blogArticles.length})
              </h2>
              <button
                onClick={() => setShowBlogEditor(true)}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#fff',
                  backgroundColor: '#4caf50',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                + Articol Nou
              </button>
            </div>

            {loadingContent ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Se încarcă...
              </p>
            ) : blogArticles.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Nu există articole. Scrie primul articol!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {blogArticles.map((article: any) => (
                  <div key={article.id} style={{
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    gap: '20px'
                  }}>
                    {article.imagine_principala && (
                      <div style={{ flexShrink: 0 }}>
                        <img
                          src={article.imagine_principala}
                          alt={article.titlu}
                          style={{
                            width: '150px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        marginTop: 0
                      }}>
                        {article.titlu}
                      </h3>
                      {article.rezumat && (
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          fontFamily: 'Montserrat, sans-serif',
                          marginBottom: '10px'
                        }}>
                          {article.rezumat}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#888', alignItems: 'center' }}>
                        <span>📊 {article.vizualizari || 0} vizualizări</span>
                        <span>📅 {new Date(article.created_at).toLocaleDateString('ro-RO')}</span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: article.publicat ? '#e8f5e9' : '#fff3e0',
                          color: article.publicat ? '#4caf50' : '#ff9800'
                        }}>
                          {article.publicat ? 'Publicat' : 'Draft'}
                        </span>
                        <Link
                          href={`/blog/${article.id}`}
                          target="_blank"
                          style={{
                            marginLeft: 'auto',
                            padding: '6px 15px',
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#1e88e5',
                            backgroundColor: '#e3f2fd',
                            border: 'none',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Vezi Articol →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blog Editor */}
        {activeSection === 'blog' && showBlogEditor && (
          <BlogEditor
            onCancel={() => setShowBlogEditor(false)}
            onSave={() => {
              setShowBlogEditor(false);
              loadBlog();
            }}
          />
        )}

        {/* Anunțuri Section */}
        {activeSection === 'anunturi' && !showAnuntEditor && (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                margin: 0
              }}>
                Toate Anunțurile ({anunturi.length})
              </h2>
              <button
                onClick={() => setShowAnuntEditor(true)}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#fff',
                  backgroundColor: '#4caf50',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                + Anunț Nou
              </button>
            </div>

            {loadingContent ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Se încarcă...
              </p>
            ) : anunturi.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Nu există anunțuri. Adaugă primul anunț!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {anunturi.map((anunt: any) => (
                  <div key={anunt.id} style={{
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    gap: '20px'
                  }}>
                    {anunt.imagine_principala && (
                      <div style={{ flexShrink: 0 }}>
                        <img
                          src={anunt.imagine_principala}
                          alt={anunt.titlu}
                          style={{
                            width: '150px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        marginTop: 0
                      }}>
                        {anunt.titlu}
                      </h3>
                      {anunt.rezumat && (
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          fontFamily: 'Montserrat, sans-serif',
                          marginBottom: '10px'
                        }}>
                          {anunt.rezumat}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#888', alignItems: 'center' }}>
                        <span>📊 {anunt.vizualizari || 0} vizualizări</span>
                        <span>📅 {new Date(anunt.created_at).toLocaleDateString('ro-RO')}</span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: anunt.publicat ? '#e8f5e9' : '#fff3e0',
                          color: anunt.publicat ? '#4caf50' : '#ff9800'
                        }}>
                          {anunt.publicat ? 'Publicat' : 'Draft'}
                        </span>
                        <Link
                          href={`/anunturi/${anunt.id}`}
                          target="_blank"
                          style={{
                            marginLeft: 'auto',
                            padding: '6px 15px',
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#1e88e5',
                            backgroundColor: '#e3f2fd',
                            border: 'none',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Vezi Anunț →
                        </Link>
                        <button
                          onClick={async () => {
                            if (confirm('Ești sigur că vrei să ștergi acest anunț?')) {
                              try {
                                const response = await fetch(`/api/anunturi/${anunt.id}`, {
                                  method: 'DELETE'
                                });
                                if (response.ok) {
                                  loadAnunturi();
                                }
                              } catch (error) {
                                console.error('Failed to delete anunt:', error);
                              }
                            }
                          }}
                          style={{
                            padding: '6px 15px',
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#f44336',
                            backgroundColor: '#ffebee',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️ Șterge
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Anunț Editor */}
        {activeSection === 'anunturi' && showAnuntEditor && (
          <AnuntEditor
            onCancel={() => setShowAnuntEditor(false)}
            onSave={() => {
              setShowAnuntEditor(false);
              loadAnunturi();
            }}
          />
        )}

        {/* Blog Section */}
        {activeSection === 'blog' && !showBlogEditor && (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                margin: 0
              }}>
                Toate Articolele ({blogArticles.length})
              </h2>
              <button
                onClick={() => setShowBlogEditor(true)}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#fff',
                  backgroundColor: '#4caf50',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                + Articol Nou
              </button>
            </div>

            {loadingContent ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Se încarcă...
              </p>
            ) : blogArticles.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Nu există articole. Scrie primul articol!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {blogArticles.map((article: any) => (
                  <div key={article.id} style={{
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    gap: '20px'
                  }}>
                    {article.imagine_principala && (
                      <div style={{ flexShrink: 0 }}>
                        <img
                          src={article.imagine_principala}
                          alt={article.titlu}
                          style={{
                            width: '150px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        marginTop: 0
                      }}>
                        {article.titlu}
                      </h3>
                      {article.rezumat && (
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          fontFamily: 'Montserrat, sans-serif',
                          marginBottom: '10px'
                        }}>
                          {article.rezumat}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#888', alignItems: 'center' }}>
                        <span>📊 {article.vizualizari || 0} vizualizări</span>
                        <span>📅 {new Date(article.created_at).toLocaleDateString('ro-RO')}</span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: article.publicat ? '#e8f5e9' : '#fff3e0',
                          color: article.publicat ? '#4caf50' : '#ff9800'
                        }}>
                          {article.publicat ? 'Publicat' : 'Draft'}
                        </span>
                        <Link
                          href={`/blog/${article.id}`}
                          target="_blank"
                          style={{
                            marginLeft: 'auto',
                            padding: '6px 15px',
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#1e88e5',
                            backgroundColor: '#e3f2fd',
                            border: 'none',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Vezi Articol →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blog Editor */}
        {activeSection === 'blog' && showBlogEditor && (
          <BlogEditor
            onCancel={() => setShowBlogEditor(false)}
            onSave={() => {
              setShowBlogEditor(false);
              loadBlog();
            }}
          />
        )}

        {/*               style={{
                            marginLeft: 'auto',
                            padding: '6px 15px',
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#1e88e5',
                            backgroundColor: '#e3f2fd',
                            border: 'none',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Vezi Articol →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}  marginTop: 0
                      }}>
                        {article.titlu}
                      </h3>
                      {article.rezumat && (
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          fontFamily: 'Montserrat, sans-serif',
                          marginBottom: '10px'
                        }}>
                          {article.rezumat}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#888' }}>
                        <span>📊 {article.vizualizari || 0} vizualizări</span>
                        <span>📅 {new Date(article.created_at).toLocaleDateString('ro-RO')}</span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: article.publicat ? '#e8f5e9' : '#fff3e0',
                          color: article.publicat ? '#4caf50' : '#ff9800'
                        }}>
                          {article.publicat ? 'Publicat' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Galerie Section */}
        {activeSection === 'galerie' && !showAlbumEditor && (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                margin: 0
              }}>
                Toate Albumele ({albume.length})
              </h2>
              <button
                onClick={() => setShowAlbumEditor(true)}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#fff',
                  backgroundColor: '#4caf50',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                + Album Nou
              </button>
            </div>

            {loadingContent ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Se încarcă...
              </p>
            ) : albume.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Montserrat, sans-serif' }}>
                Nu există albume. Creează primul album!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {albume.map((album: any) => (
                  <div key={album.id} style={{
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    gap: '20px'
                  }}>
                    {album.coperta && (
                      <div style={{ flexShrink: 0 }}>
                        <img
                          src={album.coperta}
                          alt={album.titlu}
                          style={{
                            width: '150px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#333',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '8px',
                        marginTop: 0
                      }}>
                        {album.titlu}
                      </h3>
                      {album.descriere && (
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          fontFamily: 'Montserrat, sans-serif',
                          marginBottom: '10px'
                        }}>
                          {album.descriere}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#888', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span>{album.poze?.length || 0} poze</span>
                        <span>{album.vizualizari || 0} vizualizări</span>
                        <span>{new Date(album.created_at).toLocaleDateString('ro-RO')}</span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: album.publicat ? '#e8f5e9' : '#fff3e0',
                          color: album.publicat ? '#4caf50' : '#ff9800'
                        }}>
                          {album.publicat ? 'Publicat' : 'Draft'}
                        </span>
                        <Link
                          href={`/galerie/${album.id}`}
                          target="_blank"
                          style={{
                            marginLeft: 'auto',
                            padding: '6px 15px',
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#1e88e5',
                            backgroundColor: '#e3f2fd',
                            border: 'none',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Vezi Album →
                        </Link>
                        <button
                          onClick={async () => {
                            if (confirm('Sigur vrei să ștergi acest album?')) {
                              try {
                                const response = await fetch(`/api/galerie/${album.id}`, {
                                  method: 'DELETE'
                                });
                                if (response.ok) {
                                  alert('Album șters cu succes!');
                                  loadAlbume();
                                } else {
                                  alert('Eroare la ștergerea albumului');
                                }
                              } catch (error) {
                                alert('Eroare la ștergerea albumului');
                              }
                            }
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#fff',
                            backgroundColor: '#f44336',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          Șterge
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Album Editor */}
        {activeSection === 'galerie' && showAlbumEditor && (
          <AlbumEditor
            onCancel={() => setShowAlbumEditor(false)}
            onSave={() => {
              setShowAlbumEditor(false);
              loadAlbume();
            }}
          />
        )}

        {/* Setări Placeholder */}
        {activeSection === 'setari' && (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '60px 40px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '15px',
              marginTop: 0
            }}>
              Secțiune în dezvoltare
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              margin: 0
            }}>
              Această funcționalitate va fi disponibilă în curând
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
