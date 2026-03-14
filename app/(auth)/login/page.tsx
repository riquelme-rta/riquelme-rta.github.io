import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Login - SmartCliente',
  description: 'Faça login na sua conta SmartCliente',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            SmartCliente
          </Link>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginForm />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 SmartCliente. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
