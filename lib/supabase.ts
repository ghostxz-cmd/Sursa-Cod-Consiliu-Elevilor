import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zcihffxzqmyayfxfmesu.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWhmZnh6cW15YXlmeGZtZXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMDU2ODMsImV4cCI6MjA4MDg4MTY4M30.piVIUOwmoEM7T6GkLVatMmlk7e7tybu9Cw8biM-1jvU'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ===============================
// TYPES PENTRU BAZA DE DATE
// ===============================

export interface AdminUser {
  id: string
  email: string
  nume: string
  prenume: string
  rol: 'admin' | 'super_admin' | 'moderator'
  activ: boolean
  ultima_logare?: string
  password_hash?: string
  created_at: string
  updated_at: string
}

export interface Anunt {
  id: string
  titlu: string
  continut: string
  rezumat?: string
  autor_id?: string
  status: 'draft' | 'published' | 'archived'
  prioritate: 'low' | 'normal' | 'high' | 'urgent'
  data_expirare?: string
  imagine_principala?: string
  tags?: string[]
  vizualizari: number
  publicat: boolean
  created_at: string
  updated_at: string
  // Relații
  autor?: AdminUser
  categorii?: CategorieAnunt[]
}

export interface CategorieAnunt {
  id: string
  nume: string
  descriere?: string
  culoare: string
  icon?: string
  activa: boolean
  created_at: string
}

export interface Album {
  id: string
  nume: string
  descriere?: string
  poza_cover?: string
  autor_id?: string
  status: 'draft' | 'published' | 'private'
  data_eveniment?: string
  locatie?: string
  tags?: string[]
  vizualizari: number
  publicat: boolean
  created_at: string
  updated_at: string
  // Relații
  autor?: AdminUser
  poze?: Poza[]
}

export interface Poza {
  id: string
  album_id: string
  nume_poza: string
  descriere?: string
  url_poza: string
  url_thumbnail?: string
  url_watermark?: string
  dimensiuni?: {width: number, height: number}
  marime_fisier?: number
  tip_fisier?: string
  ordine_sortare: number
  autor_id?: string
  vizualizari: number
  created_at: string
  // Relații
  album?: Album
  autor?: AdminUser
}

export interface Eveniment {
  id: string
  titlu: string
  descriere: string
  data_incepere: string
  data_sfarsit?: string
  locatie?: string
  organizator_id?: string
  tip_eveniment: string
  status: 'planificat' | 'in_desfasurare' | 'finalizat' | 'anulat'
  capacitate_maxima?: number
  participanti_inscrisi: number
  pret: number
  necesita_inscriere: boolean
  imagine_eveniment?: string
  publicat: boolean
  created_at: string
  updated_at: string
  // Relații
  organizator?: AdminUser
  inscrieri?: InscrierEveniment[]
}

export interface InscrierEveniment {
  id: string
  eveniment_id: string
  nume: string
  prenume: string
  email: string
  telefon?: string
  clasa?: string
  mesaj_special?: string
  status_inscriere: 'in_asteptare' | 'confirmat' | 'respins'
  data_inscriere: string
  confirmat_de?: string
  data_confirmare?: string
  // Relații
  eveniment?: Eveniment
  confirmat_de_user?: AdminUser
}

export interface SetareSite {
  id: string
  cheie: string
  valoare: string
  tip: 'string' | 'number' | 'boolean' | 'json'
  descriere?: string
  categoria: string
  editat_de?: string
  updated_at: string
  // Relații
  editor?: AdminUser
}

export interface AdminLog {
  id: string
  admin_id?: string
  actiune: string
  tabel_afectat?: string
  record_id?: string
  detalii?: any
  ip_address?: string
  user_agent?: string
  created_at: string
  // Relații
  admin?: AdminUser
}

export interface AdminSession {
  id: string
  admin_id: string
  session_token: string
  expires_at: string
  ip_address?: string
  user_agent?: string
  activa: boolean
  created_at: string
  // Relații
  admin?: AdminUser
}

// ===============================
// TYPES PENTRU FORMS ȘI API
// ===============================

export interface CreateAnuntData {
  titlu: string
  continut: string
  rezumat?: string
  status?: 'draft' | 'published'
  prioritate?: 'low' | 'normal' | 'high' | 'urgent'
  data_expirare?: string
  imagine_principala?: string
  tags?: string[]
  categorii_ids?: string[]
}

export interface CreateAlbumData {
  nume: string
  descriere?: string
  data_eveniment?: string
  locatie?: string
  tags?: string[]
  status?: 'draft' | 'published' | 'private'
}

export interface CreatePozaData {
  album_id: string
  nume_poza: string
  descriere?: string
  url_poza: string
  url_thumbnail?: string
  ordine_sortare?: number
}

export interface CreateEvenimentData {
  titlu: string
  descriere: string
  data_incepere: string
  data_sfarsit?: string
  locatie?: string
  tip_eveniment: string
  capacitate_maxima?: number
  pret?: number
  necesita_inscriere?: boolean
  imagine_eveniment?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AdminStats {
  total_anunturi: number
  anunturi_publicate: number
  total_albume: number
  total_poze: number
  total_evenimente: number
  evenimente_active: number
  utilizatori_activi: number
  vizualizari_totale: number
}

// ===============================
// ENUMS ȘI CONSTANTE
// ===============================

export const ANUNT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
} as const

export const ANUNT_PRIORITATE = {
  LOW: 'low',
  NORMAL: 'normal', 
  HIGH: 'high',
  URGENT: 'urgent'
} as const

export const ALBUM_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  PRIVATE: 'private'
} as const

export const EVENIMENT_STATUS = {
  PLANIFICAT: 'planificat',
  IN_DESFASURARE: 'in_desfasurare',
  FINALIZAT: 'finalizat',
  ANULAT: 'anulat'
} as const

export const USER_ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
  MODERATOR: 'moderator'
} as const

