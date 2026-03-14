'use client'

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo de volta! Veja um resumo do seu negócio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Clientes"
          value="124"
          icon={Users}
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          title="Vendas Este Mês"
          value="R$ 15.240"
          icon={DollarSign}
          trend={{ value: 8, direction: 'up' }}
        />
        <StatsCard
          title="Taxa de Conversão"
          value="28%"
          icon={TrendingUp}
          trend={{ value: 3, direction: 'down' }}
        />
        <StatsCard
          title="Atividades Hoje"
          value="18"
          icon={Activity}
          trend={{ value: 5, direction: 'up' }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clientes Recentes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Recentes</CardTitle>
              <CardDescription>
                Seus 5 clientes mais recentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">Cliente {i + 1}</p>
                      <p className="text-sm text-muted-foreground">cliente@example.com</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">Ativo</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <p className="font-medium text-sm">Adicionar Cliente</p>
                <p className="text-xs text-muted-foreground">Cadastro novo</p>
              </button>
              <button className="w-full p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <p className="font-medium text-sm">Registrar Venda</p>
                <p className="text-xs text-muted-foreground">Nova transação</p>
              </button>
              <button className="w-full p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <p className="font-medium text-sm">Ver Relatórios</p>
                <p className="text-xs text-muted-foreground">Análises</p>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>
            Últimas ações na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Atividade {i + 1}</p>
                  <p className="text-xs text-muted-foreground">Há {i + 1} minuto(s)</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
