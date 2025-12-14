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
        {/* Logo Section */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/cropped-logo_color_simplu.png"
            alt="Consiliul Elevilor"
            width={180}
            height={60}
            style={{ objectFit: 'contain' }}
          />
        </Link>
        
        {/* Navigation */}
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
            href="/blog" 
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
            Blog
          </Link>
          <Link 
            href="/contact" 
            style={{
              textDecoration: 'none',
              padding: '12px 28px',
              backgroundColor: '#1e88e5',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(30, 136, 229, 0.3)'
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
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
