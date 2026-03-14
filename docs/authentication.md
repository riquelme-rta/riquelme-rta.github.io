# Autenticação - SmartCliente

Este documento descreve como a autenticação é implementada no SmartCliente.

## Visão Geral

O sistema de autenticação usa:
- **Supabase Auth** para gerenciamento de usuários
- **NextAuth.js Patterns** para sessões (através de middleware)
- **Row Level Security (RLS)** para proteção de dados

## Fluxo de Autenticação

### 1. Registro de Usuário

```
Usuário preenche formulário → RegisterForm → authService.register() → Supabase Auth
  → Usuário criado → Email de confirmação enviado → Usuário redireciona para login
```

**Passos:**
1. Usuário acessa `/register`
2. Preenche: email, senha, nome, nome da organização
3. Validação com Zod
4. `authService.register()` chama `supabase.auth.signUp()`
5. Email de confirmação é enviado
6. Usuário confirma email e pode fazer login

### 2. Login

```
Usuário preenche formulário → LoginForm → authService.login() → Supabase Auth
  → Sessão criada → JWT Token armazenado → Redireciona para dashboard
```

**Passos:**
1. Usuário acessa `/login`
2. Preenche: email, senha
3. Validação com Zod
4. `authService.login()` chama `supabase.auth.signInWithPassword()`
5. Se sucesso, sessão é criada e JWT é armazenado
6. Redireciona para `/dashboard`

### 3. Proteção de Rotas

O middleware (`middleware.ts`) verifica:
- ✓ Rotas `/dashboard/*` requerem autenticação
- ✓ Se não autenticado, redireciona para `/login`
- ✓ Se autenticado em `/login` ou `/register`, redireciona para `/dashboard`

### 4. Logout

```
Usuário clica em logout → authService.logout() → Supabase Auth
  → Sessão destruída → Redireciona para homepage
```

## Estrutura de Arquivos

```
/components/auth/
  login-form.tsx         # Componente de formulário de login
  register-form.tsx      # Componente de formulário de registro

/services/
  auth.service.ts        # Serviço com métodos de autenticação

/hooks/
  useAuth.ts            # Hook customizado com lógica de auth

/lib/
  auth-schemas.ts       # Schemas Zod para validação
  supabase.ts          # Cliente Supabase

/app/(auth)/
  /login/page.tsx       # Página de login
  /register/page.tsx    # Página de registro

middleware.ts          # Middleware Next.js para proteção de rotas
```

## Tipos de Usuário e Roles

```typescript
type User = {
  id: string
  email: string
  name: string
  organizationId: string
  role: 'admin' | 'manager' | 'user'
  status: 'active' | 'inactive'
}
```

### Roles

- **Admin:** Controle total sobre a organização
- **Manager:** Acesso a recursos de vendas e clientes
- **User:** Acesso somente leitura

## Segurança

### 1. Validação
- Zod schemas validam todos os dados de entrada
- Email e senha são validados antes de enviar ao Supabase

### 2. Row Level Security (RLS)
- Cada tabela tem políticas RLS
- Usuários só podem acessar dados da sua organização
- Queries na API são restringidas por RLS

### 3. Middleware
- Protege rotas `/dashboard` sem autenticação
- Redireciona usuários autenticados de `/login`

### 4. Variáveis de Ambiente
- Chaves públicas são prefixadas com `NEXT_PUBLIC_`
- Chaves secretas são privadas e nunca expostas ao client

## Como Usar

### Hook useAuth

```typescript
'use client'

import { useAuth } from '@/hooks/useAuth'

export function MyComponent() {
  const { login, logout, register, isLoading, error } = useAuth()

  const handleLogin = async (email: string, password: string) => {
    const success = await login({ email, password })
    if (success) {
      console.log('Login realizado!')
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading && <p>Carregando...</p>}
      {/* seu código aqui */}
    </div>
  )
}
```

### AuthService

```typescript
import { authService } from '@/services/auth.service'

// Login
const result = await authService.login({
  email: 'user@example.com',
  password: 'password',
})

// Register
const result = await authService.register({
  email: 'user@example.com',
  password: 'password',
  confirmPassword: 'password',
  name: 'User Name',
  organizationName: 'Company Name',
})

// Logout
await authService.logout()

// Reset password
await authService.resetPassword('user@example.com')
```

## Próximos Passos

- [ ] Implementar 2FA (autenticação de dois fatores)
- [ ] Adicionar OAuth (Google, GitHub)
- [ ] Email templates customizados
- [ ] Rate limiting em login
- [ ] Auditoria de login

## Referências

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [Zod Documentation](https://zod.dev/)
