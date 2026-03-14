# SmartCliente - SaaS Escalável

Uma plataforma SaaS moderna e profissional para gestão de clientes, vendas e relacionamento com cliente.

## 🚀 Tecnologias

- **Frontend:** Next.js 15 + React 19 + TypeScript
- **Estilo:** Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes
- **Banco de Dados:** PostgreSQL (Supabase)
- **Autenticação:** Supabase Auth
- **Validação:** Zod
- **State Management:** SWR (client-side)

## 📁 Estrutura do Projeto

```
/app                    # Next.js App Router
  /(auth)              # Rotas públicas de autenticação
  /(dashboard)         # Rotas protegidas do SaaS
  /api                 # API endpoints
  /layout.tsx
  /page.tsx
  /globals.css

/components            # Componentes React
  /ui                  # Componentes reutilizáveis
  /dashboard           # Componentes do dashboard
  /auth                # Componentes de autenticação

/lib                   # Utilitários e configurações
  /supabase.ts        # Cliente Supabase
  /utils.ts           # Funções auxiliares

/types                 # Definições TypeScript
  /database.ts        # Tipos do banco de dados
  /index.ts           # Tipos globais

/public                # Arquivos estáticos

/scripts               # Scripts de setup e banco de dados
```

## 🔧 Configuração Inicial

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/smartcliente-saas.git
cd smartcliente-saas
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configurar Supabase

1. Criar um projeto em [Supabase](https://supabase.com)
2. Obter as credenciais (NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY)
3. Copiar `.env.local.example` para `.env.local`
4. Preencher as variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Editar `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_aqui
```

### 4. Executar Migrations do Banco de Dados

```bash
npm run db:setup
```

### 5. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) no navegador.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia o servidor em modo produção
- `npm run lint` - Executa linter
- `npm run db:setup` - Setup inicial do banco de dados

## 🏗️ Roadmap de Desenvolvimento

### Fase 1: Setup Inicial ✓
- [x] Criar projeto Next.js 15 com TypeScript
- [x] Configurar Tailwind + shadcn/ui
- [x] Setup Supabase
- [x] Criar estrutura de pastas

### Fase 2: Autenticação 
- [ ] Implementar tela de login
- [ ] Implementar tela de registro
- [ ] Implementar recuperação de senha
- [ ] Middleware de proteção de rotas
- [ ] Layout protegido do dashboard

### Fase 3: Dashboard Base
- [ ] Componentes do dashboard
- [ ] Layout responsivo
- [ ] Navegação principal
- [ ] Cards de estatísticas
- [ ] Theme mode (light/dark)

### Fase 4: CRUD de Clientes
- [ ] API de clientes
- [ ] Serviço de clientes
- [ ] Tela de listagem
- [ ] Tela de criar/editar
- [ ] Validação de formulários

### Fase 5: Recursos Avançados
- [ ] Sistema de planos
- [ ] Integração de pagamentos (Stripe)
- [ ] Relatórios
- [ ] Exportação de dados
- [ ] Notificações em tempo real

## 🔐 Segurança

- [x] TypeScript para type safety
- [x] Validação com Zod
- [x] Variáveis de ambiente seguras
- [ ] CSRF Protection
- [ ] Rate Limiting
- [ ] Helmet.js para headers seguros

## 📚 Documentação

Veja a documentação completa em:
- [Arquitetura](./docs/architecture.md)
- [Estrutura de Pastas](./docs/folder-structure.md)
- [API Endpoints](./docs/api.md)
- [Banco de Dados](./docs/database.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através de [seu-email@exemplo.com](mailto:seu-email@exemplo.com)

## 🎯 Comece Aqui

1. **[CONSTRUCTION_COMPLETE.md](./CONSTRUCTION_COMPLETE.md)** - Resumo completo do que foi construído
2. **[SETUP.md](./SETUP.md)** - Guia passo a passo para começar
3. **[docs/index.md](./docs/index.md)** - Documentação completa

---

Desenvolvido com ❤️ para crescimento escalável
