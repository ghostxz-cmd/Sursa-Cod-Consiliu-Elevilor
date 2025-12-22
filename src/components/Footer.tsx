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
              color: '#1fcdff',
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
                  color: '#1fcdff',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  Cine suntem
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/blog" style={{
                  color: '#1fcdff',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  Blog
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/anunturi" style={{
                  color: '#1fcdff',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
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
              color: '#1fcdff',
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
                  color: '#1fcdff',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  Acasă
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/contact" style={{
                  color: '#1fcdff',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  Contact
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/galerie" style={{
                  color: '#1fcdff',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
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
              color: '#1fcdff',
              marginBottom: '20px'
            }}>
              Contact
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              color: '#000000'
            }}>
              <li style={{ marginBottom: '10px' }}>
                Email: <a href="mailto:ctgc.pn@gmail.com" style={{
                  color: '#1fcdff',
                  textDecoration: 'none'
                }}>ctgc.pn@gmail.com</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                Consiliul Elevilor Gheorghe Cartianu
              </li>
              <li style={{ marginBottom: '10px' }}>
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
            color: '#000000',
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
                color: '#65666C',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
