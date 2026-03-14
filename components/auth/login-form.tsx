'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema, type LoginInput } from '@/lib/auth-schemas'
import { Loader2, AlertCircle } from 'lucide-react'

export function LoginForm() {
  const { login, isLoading, error } = useAuth()
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  })
  const [formError, setFormError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    try {
      loginSchema.parse(formData)
      await login(formData)
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message)
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Acesse sua conta SmartCliente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(error || formError) && (
            <div className="flex gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/30">
              <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error || formError}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className="flex items-center gap-2">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
        </form>

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground text-center">
            Não tem conta?{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
