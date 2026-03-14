# Arquitetura do SmartCliente SaaS

## Visão Geral

SmartCliente é uma plataforma SaaS moderna, escalável e profissional para gestão de clientes, vendas e relacionamento com cliente. Construída com as melhores práticas de desenvolvimento web moderno.

## Stack Tecnológico

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19
- **Linguagem:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** shadcn/ui
- **State:** SWR (fetching)
- **Validação:** Zod
- **Formulários:** react-hook-form

### Backend
- **Server:** Node.js (via Next.js API Routes)
- **Framework:** Next.js 15
- **ORM:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth
- **Autorização:** Row Level Security (RLS)

### Infraestrutura
- **Banco de Dados:** PostgreSQL (Supabase)
- **Autenticação:** JWT (Supabase)
- **Armazenamento:** Vercel Blob (preparado)
- **Deploy:** Vercel
- **Pagamentos:** Stripe (preparado)

## Camadas da Arquitetura

```
┌─────────────────────────────────────────┐
│        UI Layer (React Components)      │
│  - Pages (/app)                         │
│  - Components (/components)             │
│  - Forms & Inputs                       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│     Logic Layer (Hooks & Services)      │
│  - Custom Hooks (/hooks)                │
│  - Business Logic (/services)           │
│  - State Management                     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      API Layer (Next.js Routes)         │
│  - RESTful Endpoints (/app/api)         │
│  - Request Validation                   │
│  - Error Handling                       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│   Data Layer (Supabase + PostgreSQL)    │
│  - Row Level Security (RLS)             │
│  - Database Schema                      │
│  - Queries & Mutations                  │
└─────────────────────────────────────────┘
```

## Fluxo de Dados

### Leitura (GET)
```
Component → useSWR() → API Route → Service → Supabase → Response
```

### Escrita (POST/PATCH/DELETE)
```
Form Input → Service Call → API Route → Service → Validation 
  → Supabase → Response → Update Cache (SWR mutate)
```

## Modelo de Dados

### Entidades Principais

```
Organization (Tenant)
  ├── Users (Membros)
  ├── Subscription (Plano)
  ├── Customers (Clientes)
  └── Invoices (Faturas)
```

### Relacionamentos

```sql
organizations (1) ──→ (N) users
organizations (1) ──→ (1) subscriptions (latest active)
organizations (1) ──→ (N) customers
subscriptions (1) ──→ (N) invoices
```

## Recursos Principais

### 1. Autenticação
- Sign up com email/senha
- Login com session JWT
- Logout automático
- Middleware de proteção de rotas
- 2FA ready

### 2. Multi-tenant
- Isolamento por organização
- Row Level Security (RLS)
- Dados seguros entre tenants

### 3. CRUD de Clientes
- Listar com paginação
- Criar novo cliente
- Editar informações
- Deletar cliente
- Validação de dados

### 4. Sistema de Planos
- 3 tiers (Free, Professional, Enterprise)
- Limites por plano
- Verificação de limites
- Upgrade/Downgrade ready

### 5. Preparação para Pagamentos
- Integração Stripe ready
- Webhook handlers (estrutura)
- Invoice management (estrutura)

## Segurança

### Autenticação
- JWT tokens via Supabase
- Secure cookies
- Session management
- Protected routes

### Autorização
- Row Level Security (RLS) no banco
- Verificação de ownership
- Role-based access (admin/manager/user)
- Organizatin isolation

### Validação
- Zod schemas
- Type-safe inputs
- Backend validation
- XSS protection

### Dados Sensíveis
- Variáveis de ambiente seguras
- Chaves privadas no servidor
- Sem exposição de dados
- HTTPS only

## Performance

### Otimizações
- Server-side rendering (SSR)
- Static generation (SSG)
- Image optimization
- Code splitting
- Caching com SWR

### Escalabilidade
- Supabase auto-scaling
- Connection pooling
- Indexed queries
- Pagination built-in

## Deployment

### Vercel
```
GitHub Push → Vercel Auto-Deploy → Build → Test → Production
```

### Variáveis de Ambiente
```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

## Pastas e Responsabilidades

```
/app                    # Next.js App Router
  /(auth)/             # Rotas públicas
  /(dashboard)/        # Rotas protegidas
  /api                 # API endpoints

/components            # Componentes React
  /ui                  # Componentes base (shadcn/ui)
  /dashboard           # Componentes específicos
  /auth                # Componentes de autenticação

/services              # Lógica de negócio
  /auth.service.ts
  /customer.service.ts
  /subscription.service.ts

/hooks                 # Custom hooks
  /useAuth.ts
  /useCustomers.ts
  /useSubscription.ts

/lib                   # Utilitários
  /supabase.ts         # Cliente Supabase
  /utils.ts            # Funções auxiliares
  /*-schemas.ts        # Schemas Zod

/types                 # TypeScript types
  /database.ts         # Types do banco
  /index.ts            # Types globais

/config                # Configurações
  /site-config.ts

/scripts               # SQL migrations
  /01-schema.sql
  /02-subscriptions.sql

/docs                  # Documentação
```

## Padrões de Desenvolvimento

### Componentes
- Functional components com hooks
- Props bem tipadas
- Separação de concerns
- Reutilizabilidade

### Services
- Métodos estáticos
- Tratamento de erros
- Resposta padronizada
- Type-safe

### Hooks
- Abstração de lógica
- Reusable logic
- SWR para data fetching
- Estado local com useState

### API Routes
- Validação de input
- Autenticação checada
- Response padronizada
- Error handling

## Roadmap

### Phase 1 ✅ (Completo)
- Setup inicial
- Autenticação
- Dashboard
- CRUD de clientes
- Sistema de planos

### Phase 2 (Próximo)
- Integração Stripe
- Webhooks de pagamento
- Gerenciamento de invoices
- Email notifications

### Phase 3
- CRM avançado
- Relatórios
- Analytics
- Integrações externas

## Contribuindo

### Padrões de Código
1. Use TypeScript everywhere
2. Valide inputs com Zod
3. Use componentes do shadcn/ui
4. Adicione documentação
5. Crie testes

### Branch Strategy
```
main (production)
  ├── develop (staging)
  │   ├── feature/nome
  │   ├── fix/nome
  │   └── docs/nome
```

## Troubleshooting

### Setup Issues
- Veja `SETUP.md`

### Development Issues
- Confira documentação em `/docs`
- Verify env vars
- Check Supabase dashboard

### Production Issues
- Verifique Vercel dashboard
- Check Supabase logs
- Review error tracking

## Referências

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Construído com ❤️ usando as melhores práticas modernas.
