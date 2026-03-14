'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie sua conta e preferências
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Minha Conta</CardTitle>
            <CardDescription>
              Informações pessoais e segurança
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              Perfil
            </button>
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              Alterar Senha
            </button>
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              Dois Fatores
            </button>
          </CardContent>
        </Card>

        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Organização</CardTitle>
            <CardDescription>
              Configurações da empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              Dados da Empresa
            </button>
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              Membros da Equipe
            </button>
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              Plano Atual
            </button>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Integrações</CardTitle>
            <CardDescription>
              Conecte serviços externos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              APIs
            </button>
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              Webhooks
            </button>
            <button className="w-full p-2 rounded hover:bg-muted text-left text-sm">
              Conectadas
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
