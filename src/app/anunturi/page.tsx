    'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Anunt {
  id: string;
  titlu: string;
  continut: string;
  rezumat: string;
  imagine_principala: string;
  tags: string[];
  vizualizari: number;
  created_at: string;
}

export default function AnunturiPage() {
  const [anunturi, setAnunturi] = useState<Anunt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/anunturi/public')
      .then((res) => res.json())
      .then((data) => {
        setAnunturi(data.anunturi || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching anunturi:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: '60px 20px',
        paddingTop: '120px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 800,
              color: '#1a237e',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '15px'
            }}>
              Anunțuri
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Cele mai recente informații și anunțuri importante pentru comunitatea noastră
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '18px'
            }}>
              Se încarcă anunțurile...
            </div>
          ) : anunturi.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '18px'
            }}>
              Nu există anunțuri momentan.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '30px'
            }}>
              {anunturi.map((anunt) => (
                <Link
                  key={anunt.id}
                  href={`/anunturi/${anunt.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                  }}
                  >
                    {/* Image */}
                    {anunt.imagine_principala && (
                      <div style={{
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={anunt.imagine_principala}
                          alt={anunt.titlu}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div style={{
                      padding: '25px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#1a237e',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '12px',
                        lineHeight: '1.3'
                      }}>
                        {anunt.titlu}
                      </h3>

                      {anunt.rezumat && (
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          fontFamily: 'Montserrat, sans-serif',
                          lineHeight: '1.6',
                          marginBottom: '15px',
                          flex: 1
                        }}>
                          {anunt.rezumat}
                        </p>
                      )}

                      {/* Tags */}
                      {anunt.tags && anunt.tags.length > 0 && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginBottom: '15px'
                        }}>
                          {anunt.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              style={{
                                padding: '4px 12px',
                                fontSize: '11px',
                                fontWeight: 600,
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#1a237e',
                                backgroundColor: '#e8eaf6',
                                borderRadius: '15px'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '15px',
                        borderTop: '1px solid #f0f0f0',
                        fontSize: '13px',
                        color: '#999',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>
                        <span>
                          {new Date(anunt.created_at).toLocaleDateString('ro-RO', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                        <span>{anunt.vizualizari} vizualizări</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
