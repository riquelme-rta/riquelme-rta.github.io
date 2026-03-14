# Documentação - SmartCliente SaaS

Bem-vindo à documentação completa do SmartCliente! Este é seu guia para entender, usar e estender a plataforma.

## Início Rápido

- **[SETUP.md](../SETUP.md)** - Guia de configuração inicial e teste
- **[README.md](../README.md)** - Visão geral do projeto

## Arquitetura e Design

- **[architecture.md](./architecture.md)** - Visão geral da arquitetura
- **[folder-structure.md](./folder-structure.md)** - Explicação das pastas

## Features e Implementação

- **[authentication.md](./authentication.md)** - Sistema de autenticação com Supabase
- **[customers-crud.md](./customers-crud.md)** - CRUD completo de clientes
- **[billing-and-subscriptions.md](./billing-and-subscriptions.md)** - Planos e sistema de pagamentos

## API Reference

### Customers
```
GET    /api/customers              # Listar clientes
POST   /api/customers              # Criar cliente
GET    /api/customers/:id          # Buscar cliente
PATCH  /api/customers/:id          # Atualizar cliente
DELETE /api/customers/:id          # Deletar cliente
```

### Plans
```
GET    /api/plans                  # Listar planos
```

### Subscriptions
```
GET    /api/subscriptions/current  # Assinatura atual
GET    /api/usage                  # Uso e limites
```

## Desenvolvimento

### Setup
1. Instale dependências: `npm install`
2. Configure Supabase em `.env.local`
3. Execute migrations do banco
4. Inicie dev: `npm run dev`

### Estrutura do Projeto
```
/app              - Next.js pages e API
/components       - Componentes React
/services         - Lógica de negócio
/hooks            - Custom hooks
/lib              - Utilitários
/types            - TypeScript types
/scripts          - SQL migrations
/docs             - Documentação
```

### Stack
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL + Auth)
- Zod para validação
- SWR para data fetching

## Padrões de Código

### Components
```typescript
'use client'  // Se precisar de interatividade

import { Button } from '@/components/ui/button'

interface MyComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return <button onClick={onAction}>{title}</button>
}
```

### Services
```typescript
export const myService = {
  async getData() {
    try {
      const { data, error } = await supabase.from('table').select()
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
}
```

### Hooks
```typescript
'use client'

import { useState } from 'react'

export function useMyHook() {
  const [state, setState] = useState(null)
  
  return { state, setState }
}
```

### API Routes
```typescript
export async function GET(request: NextRequest) {
  try {
    // Validar autenticação
    // Processar request
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'msg' },
      { status: 500 }
    )
  }
}
```

## Deployment

### Vercel
1. Push para GitHub
2. Conecte repositório em Vercel
3. Configure variáveis de ambiente
4. Deploy automático

### Variáveis de Ambiente
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

## Troubleshooting

### "Missing Supabase env variables"
- Verifique `.env.local`
- Reinicie servidor

### "User not found"
- Confirme email no Supabase
- Verifique migrations

### "RLS error"
- Confira se migrations rodaram
- Verifique autenticação

## Contribuindo

1. Crie branch: `git checkout -b feature/nova-feature`
2. Commit: `git commit -m 'Descrição'`
3. Push: `git push origin feature/nova-feature`
4. PR no GitHub

## Próximos Passos

### Priority 1
- [ ] Completar CRUD de clientes (editar/deletar)
- [ ] Integrar Stripe
- [ ] Adicionar notificações

### Priority 2
- [ ] Busca e filtros
- [ ] Dark mode
- [ ] 2FA

### Priority 3
- [ ] Relatórios
- [ ] Exportação de dados
- [ ] Integrações externas

## Recursos Externos

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## FAQ

### Q: Como adicionar nova página?
A: Crie arquivo em `/app/(dashboard)/dashboard/nova-page/page.tsx`

### Q: Como chamar API do cliente?
A: Use SWR em hook customizado em `/hooks`

### Q: Como adicionar componente?
A: Crie em `/components` usando shadcn/ui

### Q: Como adicionar banco de dados?
A: Crie migration em `/scripts` e rode via Supabase

### Q: Como fazer deploy?
A: Push para GitHub, Vercel faz deploy automático

## Suporte

Dúvidas? Confira:
1. Documentação relevante em `/docs`
2. Exemplos no código
3. Logs do servidor
4. Dashboard Supabase

## Changelog

### v0.1.0 (Current)
- Setup inicial com Next.js 15
- Autenticação com Supabase
- Dashboard com navegação
- CRUD de clientes
- Sistema de planos (3 tiers)
- Preparação para Stripe

---

**Última atualização:** Março 2026

Desenvolvido com ❤️ para empresas escaláveis
