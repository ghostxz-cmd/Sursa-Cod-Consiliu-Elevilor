'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Email sau parolă incorectă');
      }
    } catch (err) {
      setError('A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        padding: '50px',
        maxWidth: '450px',
        width: '100%'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <Image
            src="/images/cropped-logo_color_simplu.png"
            alt="Logo"
            width={200}
            height={67}
            style={{ objectFit: 'contain' }}
          />
          <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            marginTop: '30px',
            marginBottom: '10px'
          }}>
            Panou Administrare
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif',
            margin: 0
          }}>
            Autentifică-te pentru a continua
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#c33',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                fontFamily: 'Montserrat, sans-serif',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="admin@ctgc.ro"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '8px'
            }}>
              Parolă
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                fontFamily: 'Montserrat, sans-serif',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              color: '#fff',
              backgroundColor: loading ? '#999' : '#1e88e5',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#1976d2';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#1e88e5';
            }}
          >
            {loading ? 'Se încarcă...' : 'Autentificare'}
          </button>
        </form>

        {/* Info */}
        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          fontSize: '13px',
          color: '#999',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Acces exclusiv pentru administratori
        </div>
      </div>
    </div>
  );
}
