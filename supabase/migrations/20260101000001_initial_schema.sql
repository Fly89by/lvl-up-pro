-- Joynt AI Clone - Initial Schema
-- PostgreSQL 15+ / Supabase compatible
-- Based on ERD from database_erd_full.html

-- ============================================
-- PART 1: EXTENSIONS & ENUMS
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE org_plan_type AS ENUM ('free', 'growth', 'professional', 'enterprise');
CREATE TYPE billing_status AS ENUM ('active', 'past_due', 'canceled', 'trialing');
CREATE TYPE user_role AS ENUM ('super_admin', 'org_admin', 'manager', 'inspector');
CREATE TYPE branch_role AS ENUM ('manager', 'inspector', 'viewer');
CREATE TYPE inspection_status AS ENUM ('draft', 'in_progress', 'submitted', 'reviewed', 'approved', 'rejected');
CREATE TYPE question_type AS ENUM ('yes_no', 'rating', 'text', 'multiple_choice', 'photo', 'qr_scan');
CREATE TYPE flag_level AS ENUM ('green', 'yellow', 'red');
CREATE TYPE issue_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE issue_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE task_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE notification_type AS ENUM ('issue', 'task', 'inspection', 'system', 'reminder');
CREATE TYPE notification_channel AS ENUM ('in_app', 'email', 'push', 'sms');
CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly');
CREATE TYPE sub_status AS ENUM ('active', 'past_due', 'canceled', 'expired', 'trialing');
CREATE TYPE payment_provider AS ENUM ('stripe', 'moyasar');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'view', 'login', 'export');
CREATE TYPE media_type AS ENUM ('image', 'video', 'document', 'audio');

-- ============================================
-- PART 2: TABLES
-- ============================================

-- 2.1 organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  logo_url TEXT,
  industry VARCHAR(100),
  plan_type org_plan_type NOT NULL DEFAULT 'free',
  billing_status billing_status NOT NULL DEFAULT 'trialing',
  trial_ends_at TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.2 users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role user_role NOT NULL DEFAULT 'inspector',
  avatar_url TEXT,
  password_hash TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  language VARCHAR(10) DEFAULT 'ar',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, email)
);

-- 2.3 branches
CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  lat DECIMAL(10,7),
  lng DECIMAL(10,7),
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.4 user_branches
CREATE TABLE user_branches (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  role_in_branch branch_role NOT NULL DEFAULT 'inspector',
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, branch_id)
);

-- 2.5 templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  industry VARCHAR(100),
  category VARCHAR(100),
  is_public BOOLEAN DEFAULT FALSE,
  sections JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  version INT DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.6 inspections
CREATE TABLE inspections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES templates(id),
  inspector_id UUID NOT NULL REFERENCES users(id),
  reviewed_by UUID REFERENCES users(id),
  status inspection_status NOT NULL DEFAULT 'draft',
  score DECIMAL(5,2),
  lat DECIMAL(10,7),
  lng DECIMAL(10,7),
  geo_address TEXT,
  notes TEXT,
  started_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.7 inspection_answers
CREATE TABLE inspection_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inspection_id UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  question_id VARCHAR(100) NOT NULL,
  question_type question_type NOT NULL,
  answer_value JSONB NOT NULL DEFAULT 'null',
  flag_level flag_level,
  note TEXT,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.8 inspection_media
CREATE TABLE inspection_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inspection_id UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  answer_id UUID REFERENCES inspection_answers(id) ON DELETE SET NULL,
  file_url TEXT NOT NULL,
  file_type media_type NOT NULL DEFAULT 'image',
  caption TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.9 issues
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  inspection_id UUID REFERENCES inspections(id) ON DELETE SET NULL,
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  reported_by UUID NOT NULL REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  severity issue_severity NOT NULL DEFAULT 'medium',
  status issue_status NOT NULL DEFAULT 'open',
  due_date TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.10 tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  issue_id UUID REFERENCES issues(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority task_priority NOT NULL DEFAULT 'medium',
  status task_status NOT NULL DEFAULT 'open',
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.11 task_comments
CREATE TABLE task_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.12 notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL DEFAULT 'system',
  title VARCHAR(255) NOT NULL,
  body TEXT,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  channel notification_channel NOT NULL DEFAULT 'in_app',
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- 2.13 subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  plan_type org_plan_type NOT NULL DEFAULT 'free',
  billing_cycle billing_cycle NOT NULL DEFAULT 'monthly',
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'SAR',
  payment_provider payment_provider NOT NULL DEFAULT 'stripe',
  provider_sub_id VARCHAR(255),
  provider_customer_id VARCHAR(255),
  status sub_status NOT NULL DEFAULT 'trialing',
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, provider_sub_id)
);

-- 2.14 audit_logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action audit_action NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.15 qr_codes
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
  code VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  scanned_count INT DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- PART 3: INDEXES
-- ============================================

CREATE INDEX idx_users_org_id ON users(org_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE INDEX idx_branches_org_id ON branches(org_id);
CREATE INDEX idx_branches_city ON branches(city);

CREATE INDEX idx_user_branches_user_id ON user_branches(user_id);
CREATE INDEX idx_user_branches_branch_id ON user_branches(branch_id);

CREATE INDEX idx_templates_org_id ON templates(org_id);
CREATE INDEX idx_templates_industry ON templates(industry);
CREATE INDEX idx_templates_public ON templates(is_public) WHERE is_public = TRUE;

CREATE INDEX idx_inspections_org_id ON inspections(org_id);
CREATE INDEX idx_inspections_branch_id ON inspections(branch_id);
CREATE INDEX idx_inspections_template_id ON inspections(template_id);
CREATE INDEX idx_inspections_inspector_id ON inspections(inspector_id);
CREATE INDEX idx_inspections_status ON inspections(status);
CREATE INDEX idx_inspections_submitted_at ON inspections(submitted_at);

CREATE INDEX idx_inspection_answers_inspection_id ON inspection_answers(inspection_id);
CREATE INDEX idx_inspection_answers_flag ON inspection_answers(flag_level) WHERE flag_level IS NOT NULL;

CREATE INDEX idx_inspection_media_inspection_id ON inspection_media(inspection_id);

CREATE INDEX idx_issues_org_id ON issues(org_id);
CREATE INDEX idx_issues_branch_id ON issues(branch_id);
CREATE INDEX idx_issues_assigned_to ON issues(assigned_to);
CREATE INDEX idx_issues_status ON issues(status);
CREATE INDEX idx_issues_severity ON issues(severity);

CREATE INDEX idx_tasks_org_id ON tasks(org_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

CREATE INDEX idx_task_comments_task_id ON task_comments(task_id);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, is_read) WHERE is_read = FALSE;

CREATE INDEX idx_subscriptions_org_id ON subscriptions(org_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

CREATE INDEX idx_audit_logs_org_id ON audit_logs(org_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

CREATE INDEX idx_qr_codes_org_id ON qr_codes(org_id);
CREATE INDEX idx_qr_codes_code ON qr_codes(code);

-- Full text search
CREATE INDEX idx_templates_search ON templates USING gin(to_tsvector('simple', title || ' ' || COALESCE(description, '')));
CREATE INDEX idx_issues_search ON issues USING gin(to_tsvector('simple', title || ' ' || COALESCE(description, '')));

-- ============================================
-- PART 4: TRIGGERS (updated_at)
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_branches_updated_at BEFORE UPDATE ON branches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_templates_updated_at BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_inspections_updated_at BEFORE UPDATE ON inspections FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_issues_updated_at BEFORE UPDATE ON issues FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_qr_codes_updated_at BEFORE UPDATE ON qr_codes FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- PART 5: ROW LEVEL SECURITY
-- ============================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspection_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspection_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Organizations: users see only their org
CREATE POLICY org_isolation ON organizations
  USING (id = current_setting('app.org_id')::UUID);

-- Users: see users in same org
CREATE POLICY users_org_isolation ON users
  USING (org_id = current_setting('app.org_id')::UUID);

-- Branches: org isolation
CREATE POLICY branches_org_isolation ON branches
  USING (org_id = current_setting('app.org_id')::UUID);

-- User branches: org isolation via join
CREATE POLICY user_branches_org_isolation ON user_branches
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = user_branches.user_id
      AND u.org_id = current_setting('app.org_id')::UUID
    )
  );

-- Templates: org isolation OR public
CREATE POLICY templates_access ON templates
  USING (
    org_id = current_setting('app.org_id')::UUID
    OR is_public = TRUE
  );

-- Inspections: org isolation
CREATE POLICY inspections_org_isolation ON inspections
  USING (org_id = current_setting('app.org_id')::UUID);

-- Answers: via inspection org
CREATE POLICY answers_org_isolation ON inspection_answers
  USING (
    EXISTS (
      SELECT 1 FROM inspections i
      WHERE i.id = inspection_answers.inspection_id
      AND i.org_id = current_setting('app.org_id')::UUID
    )
  );

-- Media: via inspection org
CREATE POLICY media_org_isolation ON inspection_media
  USING (
    EXISTS (
      SELECT 1 FROM inspections i
      WHERE i.id = inspection_media.inspection_id
      AND i.org_id = current_setting('app.org_id')::UUID
    )
  );

-- Issues: org isolation
CREATE POLICY issues_org_isolation ON issues
  USING (org_id = current_setting('app.org_id')::UUID);

-- Tasks: org isolation
CREATE POLICY tasks_org_isolation ON tasks
  USING (org_id = current_setting('app.org_id')::UUID);

-- Task comments: via task org
CREATE POLICY task_comments_org_isolation ON task_comments
  USING (
    EXISTS (
      SELECT 1 FROM tasks t
      WHERE t.id = task_comments.task_id
      AND t.org_id = current_setting('app.org_id')::UUID
    )
  );

-- Notifications: user sees own
CREATE POLICY notifications_self ON notifications
  USING (user_id = current_setting('app.user_id')::UUID);

-- Subscriptions: org isolation
CREATE POLICY subscriptions_org_isolation ON subscriptions
  USING (org_id = current_setting('app.org_id')::UUID);

-- Audit logs: org isolation
CREATE POLICY audit_logs_org_isolation ON audit_logs
  USING (org_id = current_setting('app.org_id')::UUID);

-- QR codes: org isolation
CREATE POLICY qr_codes_org_isolation ON qr_codes
  USING (org_id = current_setting('app.org_id')::UUID);

-- ============================================
-- PART 6: VIEWS
-- ============================================

-- 6.1 Branch performance
CREATE VIEW v_branch_performance AS
SELECT
  b.id AS branch_id,
  b.name AS branch_name,
  b.city,
  o.id AS org_id,
  COUNT(DISTINCT i.id) AS total_inspections,
  ROUND(AVG(i.score), 2) AS avg_score,
  COUNT(DISTINCT iss.id) AS total_issues,
  COUNT(DISTINCT CASE WHEN iss.severity IN ('high', 'critical') THEN iss.id END) AS critical_issues,
  COUNT(DISTINCT CASE WHEN iss.status = 'resolved' THEN iss.id END) AS resolved_issues,
  COUNT(DISTINCT t.id) AS total_tasks,
  COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) AS completed_tasks,
  MAX(i.submitted_at) AS last_inspection_date
FROM branches b
JOIN organizations o ON o.id = b.org_id
LEFT JOIN inspections i ON i.branch_id = b.id
LEFT JOIN issues iss ON iss.branch_id = b.id
LEFT JOIN tasks t ON t.branch_id = b.id
GROUP BY b.id, b.name, b.city, o.id;

-- 6.2 User activity
CREATE VIEW v_user_activity AS
SELECT
  u.id AS user_id,
  u.full_name,
  u.email,
  u.role,
  b.name AS branch_name,
  COUNT(DISTINCT i.id) AS inspections_done,
  COUNT(DISTINCT iss.id) AS issues_reported,
  COUNT(DISTINCT t.id) AS tasks_assigned,
  COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) AS tasks_completed,
  MAX(i.submitted_at) AS last_inspection,
  MAX(u.last_login) AS last_login
FROM users u
LEFT JOIN user_branches ub ON ub.user_id = u.id
LEFT JOIN branches b ON b.id = ub.branch_id
LEFT JOIN inspections i ON i.inspector_id = u.id
LEFT JOIN issues iss ON iss.reported_by = u.id
LEFT JOIN tasks t ON t.assigned_to = u.id
GROUP BY u.id, u.full_name, u.email, u.role, b.name;

-- 6.3 Org summary
CREATE VIEW v_org_summary AS
SELECT
  o.id AS org_id,
  o.name AS org_name,
  o.plan_type,
  COUNT(DISTINCT u.id) AS total_users,
  COUNT(DISTINCT b.id) AS total_branches,
  COUNT(DISTINCT tmpl.id) AS total_templates,
  COUNT(DISTINCT i.id) AS total_inspections,
  ROUND(AVG(i.score), 2) AS avg_score,
  COUNT(DISTINCT iss.id) AS total_issues,
  COUNT(DISTINCT CASE WHEN iss.status = 'open' THEN iss.id END) AS open_issues,
  COUNT(DISTINCT t.id) AS total_tasks,
  COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) AS completed_tasks
FROM organizations o
LEFT JOIN users u ON u.org_id = o.id
LEFT JOIN branches b ON b.org_id = o.id
LEFT JOIN templates tmpl ON tmpl.org_id = o.id
LEFT JOIN inspections i ON i.org_id = o.id
LEFT JOIN issues iss ON iss.org_id = o.id
LEFT JOIN tasks t ON t.org_id = o.id
GROUP BY o.id, o.name, o.plan_type;

-- 6.4 Inspection trends (daily)
CREATE VIEW v_inspection_trends AS
SELECT
  org_id,
  DATE(submitted_at) AS inspection_date,
  COUNT(*) AS inspection_count,
  ROUND(AVG(score), 2) AS avg_score,
  COUNT(DISTINCT branch_id) AS branches_covered
FROM inspections
WHERE submitted_at IS NOT NULL
GROUP BY org_id, DATE(submitted_at)
ORDER BY inspection_date DESC;

-- 6.5 Issue summary by severity and status
CREATE VIEW v_issue_summary AS
SELECT
  org_id,
  branch_id,
  severity,
  status,
  COUNT(*) AS issue_count,
  MAX(created_at) AS latest_issue
FROM issues
GROUP BY org_id, branch_id, severity, status;

-- ============================================
-- PART 7: SEED DATA
-- ============================================

-- Demo organization
INSERT INTO organizations (id, name, slug, industry, plan_type, billing_status)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'شركة التميز للجودة', 'tamayuz', 'restaurant', 'growth', 'active'),
  ('a0000000-0000-0000-0000-000000000002', 'مؤسسة الإتقان للتجارة', 'itqan', 'retail', 'free', 'trialing');

-- Demo admin user (password: demo123456)
INSERT INTO users (id, org_id, email, full_name, role, password_hash, language)
VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'admin@tamayuz.sa', 'أحمد العلي', 'org_admin', crypt('demo123456', gen_salt('bf')), 'ar'),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'manager@tamayuz.sa', 'سارة خالد', 'manager', crypt('demo123456', gen_salt('bf')), 'ar'),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'inspector@tamayuz.sa', 'فيصل عمر', 'inspector', crypt('demo123456', gen_salt('bf')), 'ar');

-- Demo branches
INSERT INTO branches (id, org_id, name, city)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'الفرع الرئيسي - الرياض', 'الرياض'),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'فرع جدة', 'جدة'),
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'فرع الدمام', 'الدمام');

-- User branch assignments
INSERT INTO user_branches (user_id, branch_id, role_in_branch)
VALUES
  ('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'manager'),
  ('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'manager'),
  ('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'inspector'),
  ('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000002', 'inspector');

-- Demo templates
INSERT INTO templates (id, org_id, created_by, title, description, industry, category, is_public, sections)
VALUES
  ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'نموذج فحص المطاعم', 'نموذج شامل لفحص جودة المطاعم', 'restaurant', 'جودة', TRUE, '[
    {"id":"sec1","title":"النظافة العامة","questions":[
      {"id":"q1","type":"yes_no","title":"هل أرضيات المطبخ نظيفة؟","required":true},
      {"id":"q2","type":"yes_no","title":"هل أسطح العمل معقمة؟","required":true},
      {"id":"q3","type":"rating","title":"تقييم النظافة العامة","max":5,"required":true}
    ]},
    {"id":"sec2","title":"المواد الغذائية","questions":[
      {"id":"q4","type":"yes_no","title":"هل تواريخ الصلاحية سليمة؟","required":true},
      {"id":"q5","type":"yes_no","title":"هل التخزين في درجة حرارة مناسبة؟","required":true}
    ]},
    {"id":"sec3","title":"خدمة العملاء","questions":[
      {"id":"q6","type":"rating","title":"سرعة الخدمة","max":5,"required":true},
      {"id":"q7","type":"text","title":"ملاحظات إضافية","required":false}
    ]}
  ]'),
  ('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'نموذج فحص المخازن', 'فحص جودة المخازن والتخزين', 'warehouse', 'لوجستيات', TRUE, '[
    {"id":"sec1","title":"التخزين","questions":[
      {"id":"q1","type":"yes_no","title":"هل التخزين منظم؟","required":true},
      {"id":"q2","type":"yes_no","title":"هل هناك مواد تالفة؟","required":true}
    ]}
  ]');
