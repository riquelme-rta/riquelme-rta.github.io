'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerSchema, type RegisterInput } from '@/lib/auth-schemas'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'

export function RegisterForm() {
  const { register, isLoading, error } = useAuth()
  const [formData, setFormData] = useState<RegisterInput>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organizationName: '',
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)
    setSuccess(false)

    try {
      registerSchema.parse(formData)
      const result = await register(formData)
      if (result) {
        setSuccess(true)
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          organizationName: '',
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message)
      }
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <h3 className="text-lg font-semibold">Conta criada com sucesso!</h3>
            <p className="text-sm text-muted-foreground">
              Verifique seu email para confirmar sua conta
            </p>
            <Button asChild>
              <Link href="/login">Voltar para Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Criar Conta</CardTitle>
        <CardDescription>
          Comece a usar SmartCliente hoje mesmo
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
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Seu Nome"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

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
            <Label htmlFor="organizationName">Nome da Organização</Label>
            <Input
              id="organizationName"
              name="organizationName"
              type="text"
              placeholder="Sua Empresa"
              value={formData.organizationName}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
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
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground text-center">
            Já tem conta?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
