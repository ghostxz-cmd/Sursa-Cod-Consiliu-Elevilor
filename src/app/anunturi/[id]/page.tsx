'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  updated_at: string;
}

export default function AnuntPage() {
  const params = useParams();
  const router = useRouter();
  const [anunt, setAnunt] = useState<Anunt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnunt = async () => {
      if (!params?.id) return;

      try {
        const response = await fetch(`/api/anunturi/${params.id}`);
        const data = await response.json();

        if (response.ok) {
          setAnunt(data.anunt);
        } else {
          router.push('/anunturi');
        }
      } catch (error) {
        console.error('Error loading anunt:', error);
        router.push('/anunturi');
      } finally {
        setLoading(false);
      }
    };

    loadAnunt();
  }, [params, router]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          padding: '60px 20px',
          paddingTop: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Se încarcă anunțul...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!anunt) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
        paddingTop: '120px'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: '#1a237e',
              backgroundColor: '#fff',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '30px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#1a237e';
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e0e0e0';
              e.currentTarget.style.backgroundColor = '#fff';
            }}
          >
            ← Înapoi la Anunțuri
          </button>

          {/* Article Container */}
          <article style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            {/* Banner Image */}
            {anunt.imagine_principala && (
              <div style={{
                width: '100%',
                height: '400px',
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
            <div style={{ padding: '50px' }}>
              {/* Title */}
              <h1 style={{
                fontSize: '36px',
                fontWeight: 800,
                color: '#1a237e',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                {anunt.titlu}
              </h1>

              {/* Meta Info */}
              <div style={{
                display: 'flex',
                gap: '25px',
                paddingBottom: '25px',
                marginBottom: '30px',
                borderBottom: '2px solid #f0f0f0',
                fontSize: '14px',
                color: '#666',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                <span>
                  Publicat: {new Date(anunt.created_at).toLocaleDateString('ro-RO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <span>{anunt.vizualizari} vizualizări</span>
                {anunt.updated_at !== anunt.created_at && (
                  <span>
                    Actualizat: {new Date(anunt.updated_at).toLocaleDateString('ro-RO', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                )}
              </div>

              {/* Tags */}
              {anunt.tags && anunt.tags.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '30px'
                }}>
                  {anunt.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: 600,
                        fontFamily: 'Montserrat, sans-serif',
                        color: '#1a237e',
                        backgroundColor: '#e8eaf6',
                        borderRadius: '20px'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Rezumat */}
              {anunt.rezumat && (
                <div style={{
                  padding: '25px',
                  backgroundColor: '#f8f9fa',
                  borderLeft: '4px solid #1a237e',
                  borderRadius: '8px',
                  marginBottom: '35px'
                }}>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#333',
                    fontFamily: 'Montserrat, sans-serif',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    {anunt.rezumat}
                  </p>
                </div>
              )}

              {/* Main Content */}
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#333',
                  fontFamily: 'Montserrat, sans-serif'
                }}
                dangerouslySetInnerHTML={{ __html: anunt.continut }}
              />
            </div>
          </article>

          {/* Share Section */}
          <div style={{
            marginTop: '40px',
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '15px'
            }}>
              Distribuie acest anunț
            </h3>
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copiat în clipboard!');
                }}
                style={{
                  padding: '10px 25px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#fff',
                  backgroundColor: '#1a237e',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0d1642';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a237e';
                }}
              >
                📋 Copiază Link
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
