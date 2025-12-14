import { supabase } from '../supabase'
import { AdminUser, LoginData, AdminSession } from '../supabase'

// ===============================
// FUNCȚII DE AUTENTIFICARE
//pentru authentificatre administatori
// ===============================

export class AuthService {
  
  /**
   * Login pentru administratori (folosit pe server-side în API routes)
   */
  static async login(loginData: LoginData, ipAddress?: string, userAgent?: string): Promise<{
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
          ip_address: ipAddress || 'unknown',
          user_agent: userAgent || 'unknown'
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
        ip: ipAddress || 'unknown',
        user_agent: userAgent || 'unknown'
      })

      return {
        success: true,
        user,
        session: {
          ...session,
          token: sessionToken
        }
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
   * Logout pentru administratori (folosit pe server-side)
   */
  static async logout(sessionToken: string): Promise<boolean> {
    try {
      if (sessionToken) {
        // Dezactivăm sesiunea în baza de date
        await supabase
          .from('admin_sessions')
          .update({ activ: false })
          .eq('session_token', sessionToken)

        // Logăm acțiunea
        const { data: session } = await supabase
          .from('admin_sessions')
          .select('admin_id')
          .eq('session_token', sessionToken)
          .single()

        if (session) {
          await this.logAction(session.admin_id, 'LOGOUT', 'admin_users', session.admin_id)
        }
      }
      
      return true
    } catch (error) {
      console.error('Logout error:', error)
      return false
    }
  }

  // ===============================
  // FUNCȚII UTILITARE PRIVATE
  // ===============================

  /**
   * Obține IP-ul clientului (pentru logging)
   */
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
          ip_address: detalii?.ip || 'unknown',
          user_agent: detalii?.user_agent || 'unknown'
        })
    } catch (error) {
      console.error('Log action error:', error)
    }
  }
}

// ===============================
// HOOK PENTRU REACT
// ===============================
// Hook-ul useAuth a fost mutat în lib/auth/useAuth.ts pentru a separa
// codul client-side de codul server-side