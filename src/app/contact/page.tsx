'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
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
            Contact
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
            Suntem aici pentru a răspunde întrebărilor tale
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#1e88e5',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '20px',
                marginTop: 0
              }}>
                Consiliul Elevilor
              </h2>
              <div style={{
                fontSize: '16px',
                color: '#666',
                fontFamily: 'Montserrat, sans-serif',
                lineHeight: '1.8'
              }}>
                <p style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#333' }}>Email:</strong><br />
                  <a href="mailto:ctgc.pn@gmail.com" style={{
                    color: '#1e88e5',
                    textDecoration: 'none'
                  }}>
                    ctgc.pn@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#1e88e5',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '20px',
                marginTop: 0
              }}>
                Website Developer
              </h2>
              <div style={{
                fontSize: '16px',
                color: '#666',
                fontFamily: 'Montserrat, sans-serif',
                lineHeight: '1.8'
              }}>
                <p style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#333' }}>Email:</strong><br />
                  <a href="mailto:raresandreiantoci@gmail.com" style={{
                    color: '#1e88e5',
                    textDecoration: 'none'
                  }}>
                    raresandreiantoci@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#1e88e5',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '20px',
                marginTop: 0
              }}>
                Colegiul Tehnic "Gheorghe Cartianu"
              </h2>
              <div style={{
                fontSize: '16px',
                color: '#666',
                fontFamily: 'Montserrat, sans-serif',
                lineHeight: '1.8'
              }}>
                <p style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#333' }}>Adresă:</strong><br />
                  Strada Republicii, Nr. 22<br />
                  Piatra Neamț, 610019
                </p>
                <p style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#333' }}>Telefon:</strong><br />
                  <a href="tel:+40233213050" style={{
                    color: '#1e88e5',
                    textDecoration: 'none'
                  }}>
                    +40 233 213 050
                  </a>
                </p>
                <p style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#333' }}>Fax:</strong><br />
                  +40 233 222 537
                </p>
                <p style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#333' }}>Email:</strong><br />
                  <a href="mailto:office@ctgc.ro" style={{
                    color: '#1e88e5',
                    textDecoration: 'none'
                  }}>
                    office@ctgc.ro
                  </a>
                </p>
                <p style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#333' }}>Website:</strong><br />
                  <a href="https://www.ctgc.ro" target="_blank" rel="noopener noreferrer" style={{
                    color: '#1e88e5',
                    textDecoration: 'none'
                  }}>
                    www.ctgc.ro
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '60px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '20px',
              marginTop: 0
            }}>
              Program
            </h2>
            <div style={{
              fontSize: '16px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              lineHeight: '1.8'
            }}>
              <p>
                <strong style={{ color: '#333' }}>Luni - Vineri:</strong> 08:00 - 16:00
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '60px',
            backgroundColor: '#e3f2fd',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1e88e5',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '15px',
              marginTop: 0
            }}>
              Ai întrebări?
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Nu ezita să ne contactezi! Echipa Consiliului Elevilor este întotdeauna disponibilă să răspundă la întrebările tale și să te sprijine.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
