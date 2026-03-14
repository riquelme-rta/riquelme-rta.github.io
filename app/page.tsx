'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-card">
      {/* Navigation */}
      <header className="border-b border-border/50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">SmartCliente</div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Criar Conta</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-balance">
          Gerencie seus clientes e vendas com facilidade
        </h1>
        <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
          Uma plataforma SaaS moderna e escalável para empresas que querem crescer. 
          Gerencie clientes, acompanhe vendas e tome decisões baseadas em dados.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Começar Agora</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Conhecer Recursos</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Gestão de Clientes',
              description: 'Organize todos os dados dos seus clientes em um só lugar',
              icon: '👥',
            },
            {
              title: 'Acompanhamento de Vendas',
              description: 'Monitore vendas em tempo real com dashboards intuitivos',
              icon: '📊',
            },
            {
              title: 'Relatórios Avançados',
              description: 'Gere relatórios detalhados para tomar melhores decisões',
              icon: '📈',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 border border-border rounded-lg bg-card hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Comece sua jornada hoje</h2>
          <p className="text-lg mb-8 opacity-90">
            Junte-se a centenas de empresas que usam SmartCliente
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Criar Conta Gratuita</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 SmartCliente. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
