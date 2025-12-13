import { supabase } from '../supabase'
import { AdminUser, LoginData, AdminSession } from '../supabase'

// ===============================
// FUNCȚII DE AUTENTIFICARE
//pentru authentificatre administatori
// ===============================

export class AuthService {
  
  /**
   * Login pentru administratori
   */
  static async login(loginData: LoginData): Promise<{
    success: boolean
    user?: AdminUser
    session?: AdminSession
    error?: string
  }> {
    try {
      const { email, password } = loginData
      
      // Verificăm dacă utilizatorul există și este activ
      const { data: user, error: userError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('activ', true)
        .single()

      if (userError || !user) {
        return {
          success: false,
          error: 'Email sau parolă incorrectă'
        }
      }

      // Verificăm parola folosind funcția din PostgreSQL
      const { data: passwordCheck, error: passwordError } = await supabase
        .rpc('verify_password', {
          password,
          hash: user.password_hash
        })

      if (passwordError || !passwordCheck) {
        return {
          success: false,
          error: 'Email sau parolă incorrectă'
        }
      }

      // Generăm token de sesiune
      const { data: sessionToken, error: tokenError } = await supabase
        .rpc('generate_session_token')

      if (tokenError || !sessionToken) {
        return {
          success: false,
          error: 'Eroare la generarea sesiunii'
        }
      }

      // Creăm sesiunea în baza de date
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 24) // Sesiune 24h

      const { data: session, error: sessionError } = await supabase
        .from('admin_sessions')
        .insert({
          admin_id: user.id,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString(),
          ip_address: await this.getClientIP(),
          user_agent: navigator.userAgent
        })
        .select('*')
        .single()

      if (sessionError) {
        return {
          success: false,
          error: 'Eroare la crearea sesiunii'
        }
      }

      // Actualizăm ultima logare
      await supabase
        .from('admin_users')
        .update({ ultima_logare: new Date().toISOString() })
        .eq('id', user.id)

      // Logăm acțiunea
      await this.logAction(user.id, 'LOGIN', 'admin_users', user.id, {
        ip: await this.getClientIP(),
        user_agent: navigator.userAgent
      })

      // Salvăm token-ul în localStorage
      localStorage.setItem('admin_session', sessionToken)

      return {
        success: true,
        user,
        session
      }

    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: 'Eroare internă de server'
      }
    }
  }

  /**
   * Logout pentru administratori
   */
  static async logout(): Promise<boolean> {
    try {
      const sessionToken = localStorage.getItem('admin_session')
      
      if (sessionToken) {
        // Dezactivăm sesiunea în baza de date
        await supabase
          .from('admin_sessions')
          .update({ activa: false })
          .eq('session_token', sessionToken)

        // Logăm acțiunea
        const user = await this.getCurrentUser()
        if (user) {
          await this.logAction(user.id, 'LOGOUT', 'admin_users', user.id)
        }
      }

      // Șteregem token-ul din localStorage
      localStorage.removeItem('admin_session')
      
      return true
    } catch (error) {
      console.error('Logout error:', error)
      return false
    }
  }

  /**
   * Verifică dacă utilizatorul este autentificat
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const sessionToken = localStorage.getItem('admin_session')
      
      if (!sessionToken) {
        return false
      }

      // Verificăm sesiunea în baza de date
      const { data: session, error } = await supabase
        .from('admin_sessions')
        .select(`
          *,
          admin:admin_users(*)
        `)
        .eq('session_token', sessionToken)
        .eq('activa', true)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error || !session) {
        // Sesiunea nu este validă, o ștergem
        localStorage.removeItem('admin_session')
        return false
      }

      return true
    } catch (error) {
      console.error('Authentication check error:', error)
      return false
    }
  }

  /**
   * Obține utilizatorul curent autentificat
   */
  static async getCurrentUser(): Promise<AdminUser | null> {
    try {
      const sessionToken = localStorage.getItem('admin_session')
      
      if (!sessionToken) {
        return null
      }

      const { data: session, error } = await supabase
        .from('admin_sessions')
        .select(`
          *,
          admin:admin_users(*)
        `)
        .eq('session_token', sessionToken)
        .eq('activa', true)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error || !session || !session.admin) {
        localStorage.removeItem('admin_session')
        return null
      }

      return session.admin as AdminUser
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  }

  /**
   * Verifică dacă utilizatorul are un anumit rol
   */
  static async hasRole(roles: string[]): Promise<boolean> {
    const user = await this.getCurrentUser()
    if (!user) return false
    
    return roles.includes(user.rol)
  }

  /**
   * Verifică dacă utilizatorul este super admin
   */
  static async isSuperAdmin(): Promise<boolean> {
    return await this.hasRole(['super_admin'])
  }

  /**
   * Schimbă parola utilizatorului curent
   */
  static async changePassword(currentPassword: string, newPassword: string): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      const user = await this.getCurrentUser()
      if (!user) {
        return {
          success: false,
          error: 'Utilizator neautentificat'
        }
      }

      // Verificăm parola curentă
      const { data: passwordCheck, error: passwordError } = await supabase
        .rpc('verify_password', {
          password: currentPassword,
          hash: user.password_hash
        })

      if (passwordError || !passwordCheck) {
        return {
          success: false,
          error: 'Parola curentă este incorrectă'
        }
      }

      // Hash-uim noua parolă
      const { data: newHash, error: hashError } = await supabase
        .rpc('hash_password', { password: newPassword })

      if (hashError || !newHash) {
        return {
          success: false,
          error: 'Eroare la procesarea parolei noi'
        }
      }

      // Actualizăm parola
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: newHash })
        .eq('id', user.id)

      if (updateError) {
        return {
          success: false,
          error: 'Eroare la actualizarea parolei'
        }
      }

      // Logăm acțiunea
      await this.logAction(user.id, 'CHANGE_PASSWORD', 'admin_users', user.id)

      return { success: true }
    } catch (error) {
      console.error('Change password error:', error)
      return {
        success: false,
        error: 'Eroare internă de server'
      }
    }
  }

  /**
   * Invalidează toate sesiunile unui utilizator (forțează logout pe toate device-urile)
   */
  static async invalidateAllSessions(userId?: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser()
      const targetUserId = userId || user?.id
      
      if (!targetUserId) return false

      await supabase
        .from('admin_sessions')
        .update({ activa: false })
        .eq('admin_id', targetUserId)

      // Dacă invalidăm sesiunile utilizatorului curent, îl delogăm
      if (!userId || userId === user?.id) {
        localStorage.removeItem('admin_session')
      }

      return true
    } catch (error) {
      console.error('Invalidate sessions error:', error)
      return false
    }
  }

  // ===============================
  // FUNCȚII UTILITARE PRIVATE
  // ===============================

  /**
   * Obține IP-ul clientului (pentru logging)
   */
  private static async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch {
      return 'unknown'
    }
  }

  /**
   * Logează o acțiune administrativă
   */
  private static async logAction(
    adminId: string,
    actiune: string,
    tabelAfectat?: string,
    recordId?: string,
    detalii?: any
  ): Promise<void> {
    try {
      await supabase
        .from('admin_logs')
        .insert({
          admin_id: adminId,
          actiune,
          tabel_afectat: tabelAfectat,
          record_id: recordId,
          detalii,
          ip_address: await this.getClientIP(),
          user_agent: navigator.userAgent
        })
    } catch (error) {
      console.error('Log action error:', error)
    }
  }
}

// ===============================
// HOOK PENTRU REACT
// ===============================

import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true)
      const authenticated = await AuthService.isAuthenticated()
      setIsAuthenticated(authenticated)
      
      if (authenticated) {
        const currentUser = await AuthService.getCurrentUser()
        setUser(currentUser)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (loginData: LoginData) => {
    const result = await AuthService.login(loginData)
    if (result.success && result.user) {
      setUser(result.user)
      setIsAuthenticated(true)
    }
    return result
  }

  const logout = async () => {
    const success = await AuthService.logout()
    if (success) {
      setUser(null)
      setIsAuthenticated(false)
    }
    return success
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    hasRole: (roles: string[]) => user ? roles.includes(user.rol) : false,
    isSuperAdmin: user?.rol === 'super_admin'
  }
}