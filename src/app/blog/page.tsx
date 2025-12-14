'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogArticle {
  id: string;
  titlu: string;
  rezumat?: string;
  imagine_principala?: string;
  created_at: string;
  vizualizari: number;
  tags?: string[];
  autor?: {
    nume: string;
    prenume: string;
  };
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/blog/public');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <p style={{
          fontSize: '18px',
          color: '#666',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Se încarcă articolele...
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header/Hero Section */}
      <section style={{
        backgroundColor: '#1e88e5',
        padding: '80px 20px',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 700,
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '20px',
            margin: 0
          }}>
            Toate Articolele
          </h1>
          <p style={{
            fontSize: '20px',
            fontFamily: 'Montserrat, sans-serif',
            opacity: 0.9,
            marginTop: '15px'
          }}>
            Explorează toate articolele și noutățile noastre
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {articles.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '100px 20px',
            backgroundColor: '#fff',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              fontSize: '72px',
              marginBottom: '20px',
              opacity: 0.3
            }}>
              📝
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '15px'
            }}>
              Încă nu avem articole
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#999',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '30px'
            }}>
              Revino curând pentru a citi cele mai noi articole!
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                backgroundColor: '#1e88e5',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600
              }}
            >
              Înapoi acasă
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {articles.map((article) => (
              <article
                key={article.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
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
                {article.imagine_principala && (
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '220px',
                    backgroundColor: '#e0e0e0'
                  }}>
                    <Image
                      src={article.imagine_principala}
                      alt={article.titlu}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}

                <div style={{ padding: '25px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '15px',
                    fontSize: '13px',
                    color: '#999',
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    <span>
                      📅 {new Date(article.created_at).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span>👁️ {article.vizualizari}</span>
                  </div>

                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#333',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {article.titlu}
                  </h3>

                  {article.rezumat && (
                    <p style={{
                      fontSize: '15px',
                      color: '#666',
                      fontFamily: 'Montserrat, sans-serif',
                      lineHeight: '1.6',
                      marginBottom: '18px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.rezumat}
                    </p>
                  )}

                  {article.tags && article.tags.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '18px'
                    }}>
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '4px 12px',
                            backgroundColor: '#e3f2fd',
                            color: '#1e88e5',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${article.id}`}
                    style={{
                      display: 'inline-block',
                      padding: '10px 24px',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: 'Montserrat, sans-serif',
                      color: '#fff',
                      backgroundColor: '#1e88e5',
                      border: 'none',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1565c0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e88e5';
                    }}
                  >
                    Citește articolul →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Back to Home Link */}
      <section style={{
        padding: '40px 20px 80px',
        textAlign: 'center'
      }}>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '15px 40px',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            color: '#1e88e5',
            backgroundColor: 'transparent',
            border: '2px solid #1e88e5',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e88e5';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#1e88e5';
          }}
        >
          ← Înapoi la pagina principală
        </Link>
      </section>
    </div>
  );
}
