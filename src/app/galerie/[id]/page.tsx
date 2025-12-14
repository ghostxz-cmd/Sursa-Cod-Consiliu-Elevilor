'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = async () => {
    try {
      const resolvedParams = await params;
      const response = await fetch(`/api/galerie/${resolvedParams.id}`);
      const data = await response.json();
      
      if (data.album) {
        setAlbum(data.album);
      } else {
        router.push('/galerie');
      }
    } catch (error) {
      console.error('Error fetching album:', error);
      router.push('/galerie');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: album?.titlu || 'Album Foto',
          text: album?.descriere || 'Vezi acest album foto',
          url: url
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiat în clipboard!');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main style={{
          minHeight: '100vh',
          paddingTop: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Se încarcă albumul...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!album) {
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
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#1e88e5',
              backgroundColor: '#e3f2fd',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '30px'
            }}
          >
            ← Înapoi la Galerie
          </button>

          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '40px',
            marginBottom: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ flex: 1 }}>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#1a1a1a',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '15px',
                  marginTop: 0
                }}>
                  {album.titlu}
                </h1>
                
                {album.descriere && (
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    fontFamily: 'Montserrat, sans-serif',
                    lineHeight: '1.8',
                    marginBottom: '20px'
                  }}>
                    {album.descriere}
                  </p>
                )}
                
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  fontSize: '14px',
                  color: '#999',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  <span>{album.poze.length} poze</span>
                  <span>{album.vizualizari || 0} vizualizări</span>
                  <span>{new Date(album.created_at).toLocaleDateString('ro-RO')}</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: '#4caf50',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                Distribuie
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {album.poze.map((poza, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(poza)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <img
                  src={poza}
                  alt={`${album.titlu} - Poza ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            padding: '20px'
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '50px',
              height: '50px',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '50%',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000
            }}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              maxWidth: '95%',
              maxHeight: '95%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </>
  );
}
