'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Partener {
  id: string;
  nume: string;
  logo: string;
  descriere_scurta: string;
  website: string;
  created_at: string;
}

export default function ParteneriPage() {
  const [parteneri, setParteneri] = useState<Partener[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParteneri();
  }, []);

  const loadParteneri = async () => {
    try {
      const res = await fetch('/api/parteneri/public');
      if (res.ok) {
        const data = await res.json();
        setParteneri(data);
      }
    } catch (error) {
      console.error('Error loading parteneri:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '60px',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 800,
            color: '#1a1a1a',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            Partenerii Noștri
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center',
            marginBottom: '50px',
            maxWidth: '700px',
            margin: '0 auto 50px'
          }}>
            Colaborăm cu organizații și companii care susțin educația și dezvoltarea tinerilor
          </p>

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              fontSize: '18px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Se încarcă partenerii...
            </div>
          ) : parteneri.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <p style={{
                fontSize: '18px',
                color: '#666',
                fontFamily: 'Montserrat, sans-serif',
                margin: 0
              }}>
                Momentan nu există parteneri publicați.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px'
            }}>
              {parteneri.map((partener) => (
                <Link
                  key={partener.id}
                  href={`/parteneri/${partener.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                  >
                    <div style={{
                      padding: '40px',
                      backgroundColor: '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '200px'
                    }}>
                      <img
                        src={partener.logo}
                        alt={partener.nume}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '150px',
                          objectFit: 'contain'
                        }}
                      />
                    </div>

                    <div style={{ padding: '25px', flex: 1 }}>
                      <h3 style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: '#1a1a1a',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '12px',
                        marginTop: 0
                      }}>
                        {partener.nume}
                      </h3>

                      {partener.descriere_scurta && (
                        <p style={{
                          fontSize: '15px',
                          color: '#666',
                          fontFamily: 'Montserrat, sans-serif',
                          lineHeight: '1.6',
                          margin: '0 0 15px 0'
                        }}>
                          {partener.descriere_scurta.length > 120
                            ? partener.descriere_scurta.substring(0, 120) + '...'
                            : partener.descriere_scurta}
                        </p>
                      )}

                      {partener.website && (
                        <div style={{
                          fontSize: '14px',
                          color: '#1e88e5',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600,
                          marginTop: '15px'
                        }}>
                          Vizitează website →
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
