# CRUD de Clientes - SmartCliente

Este documento descreve a implementação do CRUD de clientes na plataforma SmartCliente.

## Visão Geral

O sistema de gestão de clientes inclui:
- **Listagem** de clientes com paginação
- **Criar** novos clientes
- **Editar** informações de clientes
- **Deletar** clientes
- **Filtros** e busca

## Arquitetura

### Serviço (Backend)
```typescript
// services/customer.service.ts
- getCustomers() - Lista clientes com paginação
- getCustomer() - Busca cliente específico
- createCustomer() - Cria novo cliente
- updateCustomer() - Atualiza cliente
- deleteCustomer() - Deleta cliente
- getStats() - Retorna estatísticas
```

### API Endpoints
```
GET    /api/customers           # Listar clientes (com paginação)
POST   /api/customers           # Criar cliente
GET    /api/customers/[id]      # Buscar cliente
PATCH  /api/customers/[id]      # Atualizar cliente
DELETE /api/customers/[id]      # Deletar cliente
```

### Hook (Frontend)
```typescript
// hooks/useCustomers.ts
useCustomers()       - Buscar lista de clientes
useCreateCustomer()  - Criar novo cliente
useUpdateCustomer()  - Atualizar cliente
useDeleteCustomer()  - Deletar cliente
```

### Componentes
```typescript
// components/dashboard/customer-form.tsx
CreateCustomerForm   - Formulário para criar/editar cliente
```

## Fluxo de Dados

### Listar Clientes
```
Page → useCustomers() → SWR → GET /api/customers 
  → customerService.getCustomers() → Supabase
```

### Criar Cliente
```
Form → handleSubmit → useCreateCustomer() 
  → POST /api/customers → customerService.createCustomer()
  → Supabase → Atualiza SWR
```

### Atualizar Cliente
```
Form → handleSubmit → useUpdateCustomer() 
  → PATCH /api/customers/:id → customerService.updateCustomer()
  → Supabase → Atualiza SWR
```

### Deletar Cliente
```
Confirm → useDeleteCustomer() 
  → DELETE /api/customers/:id → customerService.deleteCustomer()
  → Supabase → Atualiza SWR
```

## Validação

Todos os dados são validados usando Zod:

```typescript
customerSchema = {
  name: string (min 2 chars)
  email: string (valid email)
  phone: string (optional)
  company: string (optional)
  status: 'active' | 'inactive' | 'prospect'
}
```

## Segurança

### Row Level Security (RLS)
- Usuários só podem ver/editar clientes da sua organização
- Admins podem editar clientes
- Managers podem criar e editar clientes
- Users só podem visualizar

### Validação
- Todos os inputs são validados no backend
- Autenticação é verificada em cada endpoint
- Organization_id é verificado antes de qualquer operação

### Autorização
- Usuários devem estar autenticados
- Usuários devem pertencer à organização

## Exemplo de Uso

```typescript
'use client'

import { useCustomers, useCreateCustomer } from '@/hooks/useCustomers'

export function MyComponent() {
  const { customers, isLoading } = useCustomers()
  const { create, isLoading: isCreating } = useCreateCustomer()

  const handleCreate = async () => {
    const result = await create({
      name: 'João Silva',
      email: 'joao@example.com',
      status: 'active',
    })
  }

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {customers.map(c => <p key={c.id}>{c.name}</p>)}
      <button onClick={handleCreate} disabled={isCreating}>
        Criar
      </button>
    </div>
  )
}
```

## Próximos Passos

- [ ] Implementar importação em massa (CSV)
- [ ] Adicionar filtros avançados
- [ ] Implementar busca por nome/email
- [ ] Adicionar histórico de atividades
- [ ] Integração com CRM externo
