# Sistema de Planos e Pagamentos - SmartCliente

Este documento descreve o sistema de planos e preparação para pagamentos na plataforma SmartCliente.

## Visão Geral

O sistema de planos inclui:
- **Três tiers de preços:** Free, Professional e Enterprise
- **Limites por plano:** Clientes, usuários, armazenamento
- **Preparação para Stripe:** Integração de pagamentos
- **Gestão de Subscriptions:** Rastreamento de assinaturas
- **Controle de Acesso:** Limitação de recursos por plano

## Planos

### Free (Gratuito)
- **Preço:** R$ 0/mês
- **Clientes:** Até 50
- **Usuários:** 1
- **Armazenamento:** 1 GB
- **Features:**
  - Dashboard básico
  - Relatórios simples
  - Suporte por email

### Professional (Profissional)
- **Preço:** R$ 99/mês
- **Clientes:** Até 1.000
- **Usuários:** 5
- **Armazenamento:** 50 GB
- **Features:**
  - Dashboard avançado
  - Relatórios detalhados
  - Suporte prioritário
  - Integrações básicas

### Enterprise
- **Preço:** Customizado (contato comercial)
- **Clientes:** Ilimitados
- **Usuários:** Ilimitados
- **Armazenamento:** Ilimitado
- **Features:**
  - Dashboard completo
  - Relatórios em tempo real
  - Suporte dedicado 24/7
  - Integrações avançadas
  - API customizada

## Estrutura de Dados

### Tabelas

#### plans
```sql
- id: TEXT (PRIMARY KEY) - 'free', 'professional', 'enterprise'
- name: TEXT - Nome do plano
- slug: TEXT - URL-safe slug
- price: DECIMAL - Preço mensal
- billing_cycle: TEXT - 'monthly' ou 'annual'
- features: JSONB - Lista de features
- limits: JSONB - Limites { customers, users, storage }
```

#### subscriptions
```sql
- id: UUID (PRIMARY KEY)
- organization_id: UUID
- plan_id: TEXT
- status: TEXT - 'active', 'cancelled', 'overdue'
- current_period_start: TIMESTAMP
- current_period_end: TIMESTAMP
- cancelled_at: TIMESTAMP
- stripe_subscription_id: TEXT
- stripe_customer_id: TEXT
```

#### invoices
```sql
- id: UUID (PRIMARY KEY)
- subscription_id: UUID
- organization_id: UUID
- amount: DECIMAL
- status: TEXT - 'draft', 'sent', 'paid', 'cancelled'
- stripe_invoice_id: TEXT
- due_date: TIMESTAMP
- paid_at: TIMESTAMP
```

## Arquitetura

### Serviço (Backend)
```typescript
subscriptionService {
  getPlans()                           // Lista todos os planos
  getPlan(planId)                      // Busca plano específico
  getOrgSubscription(organizationId)   // Assinatura atual da org
  canAccessFeature(org, feature)       // Verifica limite
  getUsage(organizationId)             // Uso atual
  isWithinLimits(organizationId)       // Verifica se está dentro dos limites
}
```

### API Endpoints
```
GET  /api/plans                        # Lista planos
GET  /api/subscriptions/current        # Assinatura atual
GET  /api/usage                        # Uso e limites
POST /api/subscriptions                # Criar subscription (preparado para Stripe)
```

### Hooks (Frontend)
```typescript
usePlans()                   // Buscar planos disponíveis
useCurrentSubscription()     // Assinatura atual
useUsage()                   // Uso e limites
```

### Componentes
```typescript
PricingCard                  // Card de preço
```

## Fluxo de Upgrade

```
Usuário seleciona plano → Redireciona para checkout Stripe 
  → Stripe processa pagamento → Webhook de confirmação 
  → Cria subscription no banco → Atualiza acesso
```

## Verificação de Limites

### No CRUD de Clientes

Antes de criar um cliente:

```typescript
const { withinLimits } = await useUsage()
if (!withinLimits) {
  return showUpgradeModal()
}
```

### Em Operações

```typescript
const result = subscriptionService.isWithinLimits(organizationId)
if (!result.withinLimits) {
  // Bloquear operação ou sugerir upgrade
}
```

## Preparação para Stripe

### Variáveis de Ambiente Necessárias

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Próximas Implementações

1. **Checkout com Stripe**
   ```typescript
   // /app/api/checkout
   POST /api/checkout
   - Criar session do Stripe
   - Retornar URL de checkout
   ```

2. **Webhooks do Stripe**
   ```typescript
   // /app/api/webhooks/stripe
   - checkout.session.completed
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded
   - invoice.payment_failed
   ```

3. **Gerenciamento de Subscriptions**
   ```typescript
   // POST /api/subscriptions/:id/upgrade
   // POST /api/subscriptions/:id/cancel
   // GET /api/subscriptions/:id/invoices
   ```

## Row Level Security (RLS)

### Plans
- Público: Qualquer um pode visualizar planos

### Subscriptions
- Apenas o dono da organização pode visualizar
- Admins da organização podem visualizar

### Invoices
- Apenas membros da organização podem visualizar
- Apenas donos podem criar

## Segurança

### Proteção de Limites
- Validação no backend antes de criar recursos
- Limites verificados em cada operação
- Uso calculado a partir do banco de dados

### Proteção de Pagamentos
- Stripe maneja toda a segurança de pagamento
- Webhooks verificados com secret
- Stripe IDs armazenados de forma segura

## Exemplo de Uso

```typescript
'use client'

import { usePlans, useUsage } from '@/hooks/useSubscription'

export function Features() {
  const { plans } = usePlans()
  const { withinLimits, usage, limits } = useUsage()

  return (
    <div>
      {!withinLimits && (
        <div className="bg-yellow-50 p-4 rounded">
          <p>Você atingiu o limite de {limits.customers} clientes</p>
          <button>Fazer Upgrade</button>
        </div>
      )}

      <p>Usando {usage.customers} de {limits.customers} clientes</p>
    </div>
  )
}
```

## Próximos Passos

- [ ] Integração com Stripe Checkout
- [ ] Webhook handler para Stripe
- [ ] Página de faturas
- [ ] Histórico de billings
- [ ] Cancelamento de subscription
- [ ] Gerenciamento de método de pagamento
- [ ] Testes de limite em produção
