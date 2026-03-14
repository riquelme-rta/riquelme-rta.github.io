export const siteConfig = {
  name: 'SmartCliente',
  description: 'Plataforma SaaS para gestão de clientes e vendas',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og.png',
  links: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
}

export const appConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}

export const plans = {
  free: {
    id: 'free',
    name: 'Gratuito',
    slug: 'free',
    description: 'Para começar',
    price: 0,
    features: [
      'Até 50 clientes',
      'Dashboard básico',
      'Relatórios simples',
      '1 usuário',
      'Suporte por email',
    ],
    limits: {
      customers: 50,
      users: 1,
      storage: 1, // GB
    },
  },
  professional: {
    id: 'professional',
    name: 'Profissional',
    slug: 'professional',
    description: 'Para pequenas empresas',
    price: 99,
    features: [
      'Até 1.000 clientes',
      'Dashboard avançado',
      'Relatórios detalhados',
      'Até 5 usuários',
      'Suporte prioritário',
      'Integrações básicas',
    ],
    limits: {
      customers: 1000,
      users: 5,
      storage: 50, // GB
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    slug: 'enterprise',
    description: 'Para grandes empresas',
    price: 0, // Customizado
    features: [
      'Clientes ilimitados',
      'Dashboard completo',
      'Relatórios em tempo real',
      'Usuários ilimitados',
      'Suporte dedicado 24/7',
      'Integrações avançadas',
      'API customizada',
    ],
    limits: {
      customers: -1, // unlimited
      users: -1, // unlimited
      storage: -1, // unlimited
    },
  },
}
