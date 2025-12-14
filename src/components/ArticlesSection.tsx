'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogArticle {
  id: string;
  titlu: string;
  rezumat?: string;
  imagine_principala?: string;
  created_at: string;
  vizualizari: number;
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/blog/public?limit=6');
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
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Se încarcă articolele...
          </p>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section style={{
      padding: '80px 20px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '15px'
          }}>
            Ultimele noastre articole
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Descoperă cele mai recente articole și știri din viața școlii
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {articles.map((article) => (
            <article
              key={article.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              {article.imagine_principala && (
                <div style={{
                  width: '100%',
                  height: '220px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src={article.imagine_principala}
                    alt={article.titlu}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>
              )}
              
              <div style={{ padding: '30px' }}>
                <div style={{
                  fontSize: '13px',
                  color: '#888',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '15px',
                  alignItems: 'center'
                }}>
                  <span>📅 {new Date(article.created_at).toLocaleDateString('ro-RO')}</span>
                  <span>👁️ {article.vizualizari || 0}</span>
                </div>

                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#333',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '15px',
                  lineHeight: '1.4',
                  minHeight: '66px'
                }}>
                  {article.titlu}
                </h3>

                {article.rezumat && (
                  <p style={{
                    fontSize: '15px',
                    color: '#666',
                    fontFamily: 'Montserrat, sans-serif',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    minHeight: '72px'
                  }}>
                    {article.rezumat.length > 120
                      ? article.rezumat.substring(0, 120) + '...'
                      : article.rezumat}
                  </p>
                )}

                <Link
                  href={`/blog/${article.id}`}
                  style={{
                    display: 'inline-block',
                    padding: '12px 25px',
                    fontSize: '15px',
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
                  Citește mai mult →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/blog"
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
            Vezi toate articolele
          </Link>
        </div>
      </div>
    </section>
  );
}
