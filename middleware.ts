import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function middleware(request: NextRequest) {
  // Criar cliente Supabase
  const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

  // Verificar sessão do usuário
  const { data: { session } } = await supabase.auth.getSession()

  // Se acessar rota protegida sem autenticação, redirecionar para login
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se estiver autenticado e tentar acessar login/registro, redirecionar para dashboard
  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
