'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Partener {
  id: string;
  nume: string;
  logo: string;
  descriere_scurta: string;
  descriere_completa: string;
  website: string;
  email: string;
  telefon: string;
  adresa: string;
  imagine_cover: string;
  vizualizari: number;
  created_at: string;
}

export default function PartenerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [partener, setPartener] = useState<Partener | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartener = async () => {
      try {
        const res = await fetch(`/api/parteneri/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setPartener(data);
        } else {
          router.push('/parteneri');
        }
      } catch (error) {
        console.error('Error loading partener:', error);
        router.push('/parteneri');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadPartener();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <>
        <Header />
        <main style={{
          minHeight: '100vh',
          paddingTop: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Se încarcă...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!partener) {
    return null;
  }

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
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Back Button */}
          <button
            onClick={() => router.push('/parteneri')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              color: '#666',
              cursor: 'pointer',
              marginBottom: '30px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.borderColor = '#1e88e5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}
          >
            ← Înapoi la Parteneri
          </button>

          {/* Article Card */}
          <article style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
            {/* Cover Image or Logo Section */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '60px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px'
            }}>
              {partener.imagine_cover ? (
                <img
                  src={partener.imagine_cover}
                  alt={partener.nume}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              ) : (
                <img
                  src={partener.logo}
                  alt={partener.nume}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '250px',
                    objectFit: 'contain'
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '50px 40px' }}>
              <h1 style={{
                fontSize: '42px',
                fontWeight: 800,
                color: '#1a1a1a',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '20px',
                marginTop: 0,
                lineHeight: '1.2'
              }}>
                {partener.nume}
              </h1>

              {partener.descriere_scurta && (
                <p style={{
                  fontSize: '20px',
                  color: '#555',
                  fontFamily: 'Montserrat, sans-serif',
                  lineHeight: '1.6',
                  marginBottom: '30px',
                  fontWeight: 500
                }}>
                  {partener.descriere_scurta}
                </p>
              )}

              <div style={{
                height: '2px',
                backgroundColor: '#e0e0e0',
                margin: '30px 0'
              }} />

              {/* Description */}
              <div style={{
                fontSize: '17px',
                color: '#444',
                fontFamily: 'Montserrat, sans-serif',
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap'
              }}>
                {partener.descriere_completa}
              </div>

              {/* Contact Information */}
              {(partener.website || partener.email || partener.telefon || partener.adresa) && (
                <>
                  <div style={{
                    height: '2px',
                    backgroundColor: '#e0e0e0',
                    margin: '40px 0'
                  }} />

                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '30px',
                    borderRadius: '8px'
                  }}>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#1e88e5',
                      fontFamily: 'Montserrat, sans-serif',
                      marginBottom: '20px',
                      marginTop: 0
                    }}>
                      Informații de Contact
                    </h3>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '20px'
                    }}>
                      {partener.website && (
                        <div>
                          <strong style={{
                            display: 'block',
                            fontSize: '14px',
                            color: '#666',
                            fontFamily: 'Montserrat, sans-serif',
                            marginBottom: '5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Website
                          </strong>
                          <a
                            href={partener.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#1e88e5',
                              textDecoration: 'none',
                              fontSize: '16px',
                              fontFamily: 'Montserrat, sans-serif',
                              fontWeight: 600
                            }}
                          >
                            {partener.website}
                          </a>
                        </div>
                      )}

                      {partener.email && (
                        <div>
                          <strong style={{
                            display: 'block',
                            fontSize: '14px',
                            color: '#666',
                            fontFamily: 'Montserrat, sans-serif',
                            marginBottom: '5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Email
                          </strong>
                          <a
                            href={`mailto:${partener.email}`}
                            style={{
                              color: '#1e88e5',
                              textDecoration: 'none',
                              fontSize: '16px',
                              fontFamily: 'Montserrat, sans-serif',
                              fontWeight: 600
                            }}
                          >
                            {partener.email}
                          </a>
                        </div>
                      )}

                      {partener.telefon && (
                        <div>
                          <strong style={{
                            display: 'block',
                            fontSize: '14px',
                            color: '#666',
                            fontFamily: 'Montserrat, sans-serif',
                            marginBottom: '5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Telefon
                          </strong>
                          <a
                            href={`tel:${partener.telefon}`}
                            style={{
                              color: '#1e88e5',
                              textDecoration: 'none',
                              fontSize: '16px',
                              fontFamily: 'Montserrat, sans-serif',
                              fontWeight: 600
                            }}
                          >
                            {partener.telefon}
                          </a>
                        </div>
                      )}

                      {partener.adresa && (
                        <div>
                          <strong style={{
                            display: 'block',
                            fontSize: '14px',
                            color: '#666',
                            fontFamily: 'Montserrat, sans-serif',
                            marginBottom: '5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Adresă
                          </strong>
                          <p style={{
                            margin: 0,
                            color: '#444',
                            fontSize: '16px',
                            fontFamily: 'Montserrat, sans-serif',
                            lineHeight: '1.6'
                          }}>
                            {partener.adresa}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Meta Info */}
              <div style={{
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                fontSize: '14px',
                color: '#999',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                <span>
                  📅 {new Date(partener.created_at).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span>👁 {partener.vizualizari || 0} vizualizări</span>
              </div>
            </div>
          </article>

          {/* Back to List Button */}
          <div style={{
            textAlign: 'center',
            marginTop: '40px'
          }}>
            <button
              onClick={() => router.push('/parteneri')}
              style={{
                padding: '14px 36px',
                backgroundColor: '#1e88e5',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'Montserrat, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1976d2';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1e88e5';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Vezi toți partenerii
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
