import { supabase } from '@/lib/supabase'
import type { LoginInput, RegisterInput } from '@/lib/auth-schemas'

export const authService = {
  async login(data: LoginInput) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      return {
        success: true,
        user: authData.user,
        session: authData.session,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
      }
    }
  },

  async register(data: RegisterInput) {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            organization_name: data.organizationName,
          },
        },
      })

      if (error) throw error

      return {
        success: true,
        user: authData.user,
        message: 'Conta criada com sucesso. Verifique seu email para confirmar.',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar conta',
      }
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao sair',
      }
    }
  },

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error

      return {
        success: true,
        message: 'Verifique seu email para redefinir a senha',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao redefinir senha',
      }
    }
  },

  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error

      return {
        success: true,
        message: 'Senha atualizada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar senha',
      }
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error

      return user
    } catch (error) {
      return null
    }
  },

  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error

      return session
    } catch (error) {
      return null
    }
  },
}
