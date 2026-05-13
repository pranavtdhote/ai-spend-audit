-- ==========================================
-- NEURALCOST: SUPABASE DATABASE SCHEMA
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Leads Table (For the Credex Consultation CTA)
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    company_name VARCHAR(255),
    role VARCHAR(100),
    team_size INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'new' -- 'new', 'contacted', 'qualified', 'converted'
);

-- 2. Audits Table (Saves the core results and generates the shareable URL)
CREATE TABLE audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    share_id VARCHAR(20) UNIQUE NOT NULL, -- Short ID for public URLs (e.g., /share/abc123xyz)
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL, -- Null if they didn't provide email
    team_size INT,
    primary_use_case VARCHAR(100),
    total_monthly_spend DECIMAL(10,2) NOT NULL,
    total_monthly_savings DECIMAL(10,2) NOT NULL,
    ai_summary TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Audit Tools Table (The specific stack breakdown)
CREATE TABLE audit_tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
    tool_id VARCHAR(100) NOT NULL,
    plan_id VARCHAR(100) NOT NULL,
    seats INT NOT NULL DEFAULT 1,
    monthly_cost DECIMAL(10,2) NOT NULL
);

-- 4. Audit Recommendations Table (The specific savings identified)
CREATE TABLE audit_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'consolidate', 'downgrade', 'alert'
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    reasoning TEXT NOT NULL,
    monthly_savings DECIMAL(10,2) NOT NULL,
    confidence_score INT NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_recommendations ENABLE ROW LEVEL SECURITY;

-- Leads: Anyone can insert (via the form), but only authenticated admins can view
CREATE POLICY "Enable insert for anonymous users" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated admins" ON leads FOR SELECT USING (auth.role() = 'authenticated');

-- Audits: Anyone can insert, but only public ones can be viewed by anonymous users
CREATE POLICY "Enable insert for anonymous users" ON audits FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for public audits" ON audits FOR SELECT USING (is_public = true);

-- Audit Tools & Recommendations: Only viewable if the parent audit is public
CREATE POLICY "Enable read for public audit tools" ON audit_tools FOR SELECT USING (
    EXISTS (SELECT 1 FROM audits WHERE audits.id = audit_tools.audit_id AND audits.is_public = true)
);
CREATE POLICY "Enable read for public audit recommendations" ON audit_recommendations FOR SELECT USING (
    EXISTS (SELECT 1 FROM audits WHERE audits.id = audit_recommendations.audit_id AND audits.is_public = true)
);

-- Note: In production, we'd use a service role key on the backend to insert the tools and recommendations 
-- simultaneously as part of a transaction, so we don't need anonymous insert policies on those child tables.
