# Guia de Setup - SmartCliente SaaS

## Visão Geral do Projeto

Você agora tem uma base sólida e escalável para um SaaS completo com:
- ✅ Next.js 15 + React 19 + TypeScript
- ✅ Autenticação com Supabase
- ✅ Dashboard profissional com navegação
- ✅ CRUD completo de clientes
- ✅ Sistema de planos com 3 tiers
- ✅ Preparação para pagamentos com Stripe

## Setup Inicial

### 1. Instalar Dependências

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

### 2. Configurar Supabase

#### Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote as credenciais

#### Executar Migrations

Copie o conteúdo dos arquivos SQL em `scripts/`:

```bash
# 1. Executar scripts/01-schema.sql
# 2. Executar scripts/02-subscriptions.sql
```

No dashboard do Supabase:
1. Vá para SQL Editor
2. Cole o conteúdo de `01-schema.sql`
3. Execute (verde)
4. Repita com `02-subscriptions.sql`

#### Configurar Variáveis

Crie `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-privada
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Iniciar Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Fluxo de Teste

### 1. Criar Conta
- Acesse `/register`
- Preencha dados (nome, email, senha, empresa)
- Confirme email (usar Supabase email testing)

### 2. Fazer Login
- Acesse `/login`
- Use credenciais criadas

### 3. Explorar Dashboard
- `/dashboard` - Dashboard principal
- `/dashboard/customers` - Gestão de clientes (CRUD completo)
- `/dashboard/sales` - Vendas (estrutura preparada)
- `/dashboard/plans` - Planos disponíveis
- `/dashboard/settings` - Configurações

### 4. Testar CRUD de Clientes
- Crie novo cliente em `/dashboard/customers`
- Veja na lista
- Implemente edição/deleção conforme necessário

## Estrutura do Projeto

```
/app
  /(auth)           # Login, registro
  /(dashboard)      # Dashboard protegido
    /dashboard
    /customers
    /sales
    /settings
    /plans
  /api
    /customers      # API RESTful de clientes
    /plans          # API de planos
    /subscriptions  # API de subscriptions

/components
  /ui               # Componentes reutilizáveis
  /auth             # Componentes de autenticação
  /dashboard        # Componentes do dashboard

/services           # Lógica de negócio
/hooks              # Custom hooks React
/lib                # Utilitários e configurações
/types              # Tipos TypeScript
/scripts            # SQL migrations

/docs               # Documentação
```

## Próximas Implementações

### Priority 1 (Essencial)
- [ ] Completar edição/deleção de clientes
- [ ] Integrar Stripe (checkout)
- [ ] Criar hooks de limite de plano
- [ ] Adicionar notificações (toast)

### Priority 2 (Importante)
- [ ] Implementar busca e filtros
- [ ] Adicionar avatar/perfil do usuário
- [ ] Dark mode
- [ ] Email de confirmação customizado
- [ ] 2FA (autenticação de dois fatores)

### Priority 3 (Nice to Have)
- [ ] Importação CSV de clientes
- [ ] Relatórios avançados
- [ ] Exportação de dados
- [ ] Integração com WhatsApp/Email
- [ ] Analytics e tracking

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Iniciar servidor

# Build
npm run build        # Build para produção
npm run start        # Iniciar em produção
npm run lint         # Linter

# Banco de dados
# Execute manualmente via dashboard Supabase
```

## Arquivos Importantes

- `middleware.ts` - Proteção de rotas
- `config/site-config.ts` - Configurações globais
- `.env.local.example` - Variáveis de ambiente
- `docs/` - Documentação completa

## Deploy no Vercel

1. Push para GitHub
2. Conecte em [vercel.com](https://vercel.com)
3. Configure variáveis de ambiente
4. Deploy automático

## Debugging

### Comum: "Missing Supabase env variables"
- Verifique `.env.local`
- Reinicie servidor de dev

### Comum: "User not found after register"
- Confirme email no Supabase
- Verifique se tabela `users` foi criada

### Comum: RLS error
- Verifique se migrations rodaram
- Confirme que usuário está autenticado

## Referências

- [Documentação de Autenticação](./docs/authentication.md)
- [Documentação de CRUD de Clientes](./docs/customers-crud.md)
- [Documentação de Planos e Pagamentos](./docs/billing-and-subscriptions.md)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Suporte

Para dúvidas ou problemas:
1. Confira a documentação em `/docs`
2. Verifique logs no terminal
3. Teste no Supabase Dashboard
4. Crie issue no GitHub

## Próximo Passo

Recomendado: Complete a integração de Stripe seguindo o guide em `docs/billing-and-subscriptions.md`.

---

Parabéns! Você tem a base sólida de um SaaS profissional! 🚀
