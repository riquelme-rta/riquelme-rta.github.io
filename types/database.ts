export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          organization_id: string | null
          role: 'admin' | 'manager' | 'user'
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          organization_id?: string | null
          role?: 'admin' | 'manager' | 'user'
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          organization_id?: string | null
          role?: 'admin' | 'manager' | 'user'
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          owner_id: string
          plan_id: string
          status: 'active' | 'suspended'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          owner_id: string
          plan_id: string
          status?: 'active' | 'suspended'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          owner_id?: string
          plan_id?: string
          status?: 'active' | 'suspended'
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          organization_id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          status: 'active' | 'inactive' | 'prospect'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          status?: 'active' | 'inactive' | 'prospect'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          status?: 'active' | 'inactive' | 'prospect'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
