-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE CHECK (slug IN ('free', 'professional', 'enterprise')),
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  features JSONB NOT NULL DEFAULT '[]',
  limits JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES plans(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'overdue')),
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'cancelled')),
  stripe_invoice_id TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create indexes
CREATE INDEX plans_slug_idx ON plans(slug);
CREATE INDEX subscriptions_organization_id_idx ON subscriptions(organization_id);
CREATE INDEX subscriptions_status_idx ON subscriptions(status);
CREATE INDEX subscriptions_stripe_subscription_id_idx ON subscriptions(stripe_subscription_id);
CREATE INDEX invoices_organization_id_idx ON invoices(organization_id);
CREATE INDEX invoices_status_idx ON invoices(status);

-- Insert default plans
INSERT INTO plans (id, name, slug, price, billing_cycle, features, limits)
VALUES
  (
    'free',
    'Gratuito',
    'free',
    0,
    'monthly',
    '["Até 50 clientes", "Dashboard básico", "Relatórios simples", "1 usuário", "Suporte por email"]'::jsonb,
    '{"customers": 50, "users": 1, "storage": 1}'::jsonb
  ),
  (
    'professional',
    'Profissional',
    'professional',
    99,
    'monthly',
    '["Até 1.000 clientes", "Dashboard avançado", "Relatórios detalhados", "Até 5 usuários", "Suporte prioritário", "Integrações básicas"]'::jsonb,
    '{"customers": 1000, "users": 5, "storage": 50}'::jsonb
  ),
  (
    'enterprise',
    'Enterprise',
    'enterprise',
    0,
    'monthly',
    '["Clientes ilimitados", "Dashboard completo", "Relatórios em tempo real", "Usuários ilimitados", "Suporte dedicado 24/7", "Integrações avançadas", "API customizada"]'::jsonb,
    '{"customers": -1, "users": -1, "storage": -1}'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for plans (public read)
CREATE POLICY plans_select ON plans
  FOR SELECT USING (true);

-- RLS Policies for subscriptions
CREATE POLICY subscriptions_select ON subscriptions
  FOR SELECT USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    ) OR
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY subscriptions_insert ON subscriptions
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY subscriptions_update ON subscriptions
  FOR UPDATE USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for invoices
CREATE POLICY invoices_select ON invoices
  FOR SELECT USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    ) OR
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY invoices_insert ON invoices
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );
