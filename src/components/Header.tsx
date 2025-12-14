'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Închide meniul când se schimbă dimensiunea ecranului
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Previne scroll-ul când meniul e deschis
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        zIndex: 1000,
        padding: '15px 20px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/images/cropped-logo_color_simplu.png"
              alt="Consiliul Elevilor"
              width={180}
              height={60}
              style={{ objectFit: 'contain', maxWidth: '140px', height: 'auto' }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center'
          }}>
            <Link 
              href="/" 
              style={{
                textDecoration: 'none',
                color: '#555',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
            >
              Acasă
            </Link>
            <Link 
              href="/despre-noi" 
              style={{
                textDecoration: 'none',
                color: '#555',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
            >
              Despre noi
            </Link>
            <Link 
              href="/anunturi" 
              style={{
                textDecoration: 'none',
                color: '#555',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
            >
              Anunturi
            </Link>
            <Link 
              href="/galerie" 
              style={{
                textDecoration: 'none',
                color: '#555',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
            >
              Galerie
            </Link>
            <Link 
              href="/parteneri" 
              style={{
                textDecoration: 'none',
                color: '#555',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
            >
              Partenerii Noștri
            </Link>
            <Link 
              href="/contact" 
              style={{
                textDecoration: 'none',
                color: '#555',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Logo Icon */}
          <div className="desktop-logo-icon" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px' 
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ddd',
              borderRadius: '8px',
              backgroundColor: 'white'
            }}>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={55}
                height={55}
                style={{ objectFit: 'contain', display: 'block' }}
                priority
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              border: 'none',
              background: 'none',
              fontSize: '30px',
              cursor: 'pointer',
              padding: '5px 10px',
              color: '#333',
              lineHeight: 1
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
            display: 'none'
          }}
          className="mobile-overlay"
        />
      )}

      {/* Mobile Navigation Menu */}
      <nav 
        className="mobile-nav"
        style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          padding: '20px',
          display: 'none',
          flexDirection: 'column',
          gap: '0',
          zIndex: 999,
          maxHeight: 'calc(100vh - 70px)',
          overflowY: 'auto',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Logo Section in Mobile Menu */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          padding: '20px 0',
          borderBottom: '2px solid #e0e0e0',
          marginBottom: '15px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #ddd',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <Image
              src="/images/logo.png"
              alt="Logo Școală"
              width={45}
              height={45}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Image
            src="/images/cropped-logo_color_simplu.png"
            alt="Consiliul Elevilor"
            width={120}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Menu Items */}
        <Link 
          href="/" 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            padding: '15px',
            borderBottom: '1px solid #f0f0f0',
            transition: 'background-color 0.3s ease'
          }}
        >
          Acasă
        </Link>
        <Link 
          href="/despre-noi"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            padding: '15px',
            borderBottom: '1px solid #f0f0f0',
            transition: 'background-color 0.3s ease'
          }}
        >
          Despre noi
        </Link>
        <Link 
          href="/anunturi"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            padding: '15px',
            borderBottom: '1px solid #f0f0f0',
            transition: 'background-color 0.3s ease'
          }}
        >
          Anunturi
        </Link>
        <Link 
          href="/galerie"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            padding: '15px',
            borderBottom: '1px solid #f0f0f0',
            transition: 'background-color 0.3s ease'
          }}
        >
          Galerie
        </Link>
        <Link 
          href="/parteneri"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            padding: '15px',
            borderBottom: '1px solid #f0f0f0',
            transition: 'background-color 0.3s ease'
          }}
        >
          Partenerii Noștri
        </Link>
        <Link 
          href="/contact"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            padding: '15px',
            transition: 'background-color 0.3s ease'
          }}
        >
          Contact
        </Link>
      </nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-logo-icon {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-nav {
            display: flex !important;
          }
          .mobile-overlay {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
