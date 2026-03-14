-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  owner_id UUID NOT NULL,
  plan_id TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create users table (linked to auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  status TEXT NOT NULL DEFAULT 'prospect' CHECK (status IN ('active', 'inactive', 'prospect')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create indexes
CREATE INDEX organizations_owner_id_idx ON organizations(owner_id);
CREATE INDEX organizations_slug_idx ON organizations(slug);
CREATE INDEX users_organization_id_idx ON users(organization_id);
CREATE INDEX customers_organization_id_idx ON customers(organization_id);
CREATE INDEX customers_email_idx ON customers(email);

-- Enable Row Level Security (RLS)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations
CREATE POLICY organizations_select ON organizations
  FOR SELECT USING (
    auth.uid() = owner_id OR
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.organization_id = organizations.id
    )
  );

CREATE POLICY organizations_insert ON organizations
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY organizations_update ON organizations
  FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for users
CREATE POLICY users_select ON users
  FOR SELECT USING (
    auth.uid() = id OR
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY users_insert ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY users_update ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for customers
CREATE POLICY customers_select ON customers
  FOR SELECT USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    ) OR
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY customers_insert ON customers
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    ) OR
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY customers_update ON customers
  FOR UPDATE USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    ) OR
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY customers_delete ON customers
  FOR DELETE USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    ) OR
    organization_id IN (
      SELECT organization_id FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
