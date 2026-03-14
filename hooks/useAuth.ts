'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import type { LoginInput, RegisterInput } from '@/lib/auth-schemas'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = useCallback(async (data: LoginInput) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authService.login(data)

      if (!result.success) {
        setError(result.error || 'Erro ao fazer login')
        return false
      }

      router.push('/dashboard')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login'
      setError(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const register = useCallback(async (data: RegisterInput) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authService.register(data)

      if (!result.success) {
        setError(result.error || 'Erro ao criar conta')
        return false
      }

      // Mostrar mensagem de sucesso
      setError(null)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar conta'
      setError(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authService.logout()

      if (!result.success) {
        setError(result.error || 'Erro ao sair')
        return false
      }

      router.push('/')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao sair'
      setError(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authService.resetPassword(email)

      if (!result.success) {
        setError(result.error || 'Erro ao redefinir senha')
        return false
      }

      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao redefinir senha'
      setError(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    login,
    register,
    logout,
    resetPassword,
    isLoading,
    error,
    setError,
  }
}
