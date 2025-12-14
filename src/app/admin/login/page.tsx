'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();

  useEffect(() => {
    // Redirect direct to dashboard without login
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        textAlign: 'center',
        color: '#666',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '16px'
      }}>
        Redirecting to dashboard...
      </div>
    </div>
  );
}
