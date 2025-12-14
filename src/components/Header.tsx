'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      zIndex: 1000,
      padding: '15px 50px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/cropped-logo_color_simplu.png"
            alt="Consiliul Elevilor"
            width={180}
            height={60}
            style={{ objectFit: 'contain' }}
          />
        </div>
        
        <nav style={{
          display: 'flex',
          gap: '35px',
          alignItems: 'center'
        }}>
          <Link 
            href="/" 
            className="nav-link"
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
            className="nav-link"
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
            className="nav-link"
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
            className="nav-link"
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
            href="/contact" 
            className="nav-link"
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '70px',
            height: '70px',
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
              width={65}
              height={65}
              style={{ objectFit: 'contain', display: 'block' }}
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
