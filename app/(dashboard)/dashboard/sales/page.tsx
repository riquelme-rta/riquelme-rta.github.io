'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function SalesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendas</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe suas vendas e transações
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Venda
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vendas</CardTitle>
          <CardDescription>
            Você tem 0 vendas registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma venda registrada ainda</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Registrar Primeira Venda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
