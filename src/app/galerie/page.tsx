'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Album {
  id: string;
  titlu: string;
  descriere: string;
  coperta: string;
  poze: string[];
  vizualizari: number;
  publicat: boolean;
  created_at: string;
}

export default function GaleriePage() {
  const [albume, setAlbume] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbume();
  }, []);

  const fetchAlbume = async () => {
    try {
      const response = await fetch('/api/galerie/public');
      const data = await response.json();
      setAlbume(data.albume || []);
    } catch (error) {
      console.error('Error fetching albume:', error);
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
            Galerie Foto
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center',
            marginBottom: '50px',
            maxWidth: '600px',
            margin: '0 auto 50px'
          }}>
            Descoperă albumele noastre foto
          </p>

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              fontSize: '18px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Se încarcă albumele...
            </div>
          ) : albume.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              fontSize: '18px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Nu există albume publicate momentan.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px',
              marginTop: '40px'
            }}>
              {albume.map((album) => (
                <Link
                  key={album.id}
                  href={`/galerie/${album.id}`}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
                    width: '100%',
                    height: '240px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={album.coperta}
                      alt={album.titlu}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: 'Montserrat, sans-serif'
                    }}>
                      {album.poze.length} poze
                    </div>
                  </div>
                  
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      fontFamily: 'Montserrat, sans-serif',
                      marginBottom: '10px',
                      marginTop: 0
                    }}>
                      {album.titlu}
                    </h3>
                    
                    {album.descriere && (
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.6',
                        marginBottom: '12px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {album.descriere}
                      </p>
                    )}
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      fontSize: '13px',
                      color: '#999',
                      fontFamily: 'Montserrat, sans-serif',
                      marginTop: '15px'
                    }}>
                      <span>{album.vizualizari || 0} vizualizări</span>
                      <span>{new Date(album.created_at).toLocaleDateString('ro-RO')}</span>
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
