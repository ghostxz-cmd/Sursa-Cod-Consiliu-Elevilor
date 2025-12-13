'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

  useEffect(() => {
    // Verificăm autentificarea
    checkAuth();
    loadStats();
  }, []);

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
    // TODO: Load real stats from API
    setStats({
      totalAnunturi: 12,
      totalBlog: 5,
      totalVizualizari: 1247,
      adminUsers: 3
    });
    setLoading(false);
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

        {/* Other Sections Placeholder */}
        {activeSection !== 'dashboard' && (
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
