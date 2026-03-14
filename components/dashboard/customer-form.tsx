'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateCustomer } from '@/hooks/useCustomers'
import { customerSchema, type CreateCustomerInput } from '@/lib/customer-schemas'
import { Loader2, AlertCircle } from 'lucide-react'

interface CustomerFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function CreateCustomerForm({ onSuccess, onCancel }: CustomerFormProps) {
  const { create, isLoading, error } = useCreateCustomer()
  const [formData, setFormData] = useState<CreateCustomerInput>({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'prospect',
  })
  const [formError, setFormError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    try {
      customerSchema.parse(formData)
      const result = await create(formData)
      if (result) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          status: 'prospect',
        })
        onSuccess?.()
      }
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Cliente</CardTitle>
        <CardDescription>Adicione um novo cliente à sua base</CardDescription>
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
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              placeholder="João Silva"
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
              placeholder="joao@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              name="company"
              placeholder="Sua Empresa Ltda"
              value={formData.company || ''}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(11) 99999-9999"
              value={formData.phone || ''}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isLoading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="prospect">Prospect</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Criando...' : 'Criar Cliente'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
