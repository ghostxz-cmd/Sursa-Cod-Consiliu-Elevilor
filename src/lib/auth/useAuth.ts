'use client';

import { useState, useEffect } from 'react';
import { AdminUser, LoginData } from '../supabase';

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      // Verificăm sesiunea prin API
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      
      if (data.authenticated && data.user) {
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: LoginData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      
      const result = await response.json();
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Eroare la autentificare' };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      return result.success;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    hasRole: (roles: string[]) => user ? roles.includes(user.rol) : false,
    isSuperAdmin: user?.rol === 'super_admin'
  };
}
