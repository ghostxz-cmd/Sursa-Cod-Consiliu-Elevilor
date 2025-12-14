'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface BlogArticle {
  id: string;
  titlu: string;
  continut: string;
  rezumat?: string;
  imagine_principala?: string;
  tags?: string[];
  vizualizari: number;
  created_at: string;
  autor?: {
    nume: string;
    prenume: string;
  };
}

export default function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [articleId, setArticleId] = useState<string>('');

  useEffect(() => {
    params.then(({ id }) => {
      setArticleId(id);
    });
  }, [params]);

  useEffect(() => {
    if (articleId) {
      loadArticle();
      loadRelated();
    }
  }, [articleId]);

  const loadArticle = async () => {
    try {
      const response = await fetch(`/api/blog/${articleId}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data.article);
      }
    } catch (error) {
      console.error('Failed to load article:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelated = async () => {
    try {
      const response = await fetch('/api/blog?limit=3');
      if (response.ok) {
        const data = await response.json();
        setRelatedArticles(data.articles.filter((a: BlogArticle) => a.id !== articleId).slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to load related articles:', error);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{
          fontSize: '18px',
          color: '#666',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Se încarcă articolul...
        </p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '20px'
        }}>
          Articol negăsit
        </h1>
        <Link
          href="/"
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            color: '#fff',
            backgroundColor: '#1e88e5',
            border: 'none',
            borderRadius: '8px',
            textDecoration: 'none'
          }}
        >
          Înapoi acasă
        </Link>
      </div>
    );
  }

  return (
    <div>
      
      {/* Banner Image */}
      {article.imagine_principala && (
        <div style={{
          width: '100%',
          height: '400px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img
            src={article.imagine_principala}
            alt={article.titlu}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '40px'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
              <h1 style={{
                fontSize: '42px',
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                margin: 0,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                {article.titlu}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        {/* Article Meta */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e0e0e0',
          flexWrap: 'wrap'
        }}>
          {article.autor && (
            <span style={{
              fontSize: '15px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              <strong>Autor:</strong> {article.autor.prenume} {article.autor.nume}
            </span>
          )}
          <span style={{
            fontSize: '15px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            📅 {new Date(article.created_at).toLocaleDateString('ro-RO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span style={{
            fontSize: '15px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            👁️ {article.vizualizari} vizualizări
          </span>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '30px'
          }}>
            {article.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: '6px 15px',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#1e88e5',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '20px'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Article Content HTML */}
        <div
          style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#333',
            fontFamily: 'Montserrat, sans-serif'
          }}
          dangerouslySetInnerHTML={{ __html: article.continut }}
        />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '60px 20px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Articole Similare
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.id}`}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    textDecoration: 'none'
                  }}
                >
                  {related.imagine_principala && (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      position: 'relative'
                    }}>
                      <img
                        src={related.imagine_principala}
                        alt={related.titlu}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '25px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#333',
                      fontFamily: 'Montserrat, sans-serif',
                      marginBottom: '10px',
                      marginTop: 0
                    }}>
                      {related.titlu}
                    </h3>
                    {related.rezumat && (
                      <p style={{
                        fontSize: '15px',
                        color: '#666',
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {related.rezumat.substring(0, 120)}...
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
