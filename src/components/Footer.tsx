'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="Footer" style={{
      backgroundColor: '#ffffff',
      paddingTop: '60px'
    }}>
      <div className="widgets_wrapper" style={{ paddingBottom: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Column 1 - About */}
          <div>
            <h4 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#1e88e5',
              marginBottom: '20px'
            }}>
              Despre Noi
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/despre-noi" style={{
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                  Cine suntem
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/blog" style={{
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                  Blog
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/anunturi" style={{
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                  Anunțuri
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#1e88e5',
              marginBottom: '20px'
            }}>
              Link-uri Rapide
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/" style={{
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                  Acasă
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/contact" style={{
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                  Contact
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/galerie" style={{
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                  Galerie
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h4 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#1e88e5',
              marginBottom: '20px'
            }}>
              Contact
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              color: '#555'
            }}>
              <li style={{ marginBottom: '10px', color: '#555' }}>
                Email: <a href="mailto:cse.ctgc@colegiulcartianu.ro" style={{
                  color: '#1e88e5',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#4fc3f7'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1e88e5'}>cse.ctgc@colegiulcartianu.ro</a>
              </li>
              <li style={{ marginBottom: '10px', color: '#555' }}>
                Consiliul Elevilor Gheorghe Cartianu
              </li>
              <li style={{ marginBottom: '10px', color: '#555' }}>
                Piatra Neamț, România
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{
        borderTop: '1px solid rgba(0,0,0,0.1)',
        padding: '20px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            © {new Date().getFullYear()} Consiliul Elevilor Gheorghe Cartianu. Toate drepturile rezervate.
          </div>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '20px'
          }}>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                color: '#555',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
