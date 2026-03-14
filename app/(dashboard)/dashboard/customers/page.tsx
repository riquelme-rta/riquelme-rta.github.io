'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCustomers } from '@/hooks/useCustomers'
import { CreateCustomerForm } from '@/components/dashboard/customer-form'
import { Plus, Trash2 } from 'lucide-react'

export default function CustomersPage() {
  const [showForm, setShowForm] = useState(false)
  const { customers, pagination, isLoading, mutate } = useCustomers()

  const handleFormSuccess = () => {
    setShowForm(false)
    mutate()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os seus clientes
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        )}
      </div>

      {showForm && (
        <CreateCustomerForm
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            Você tem {pagination?.total || 0} clientes cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando clientes...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum cliente cadastrado ainda</p>
              <Button className="mt-4" onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Cliente
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold py-3 px-4">Nome</th>
                    <th className="text-left font-semibold py-3 px-4">Email</th>
                    <th className="text-left font-semibold py-3 px-4">Empresa</th>
                    <th className="text-left font-semibold py-3 px-4">Status</th>
                    <th className="text-right font-semibold py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{customer.name}</td>
                      <td className="py-3 px-4">{customer.email}</td>
                      <td className="py-3 px-4">{customer.company || '-'}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            customer.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : customer.status === 'prospect'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {customer.status === 'active'
                            ? 'Ativo'
                            : customer.status === 'prospect'
                            ? 'Prospect'
                            : 'Inativo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-destructive hover:underline text-xs">
                          <Trash2 className="h-4 w-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
