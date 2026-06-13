export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  industry: string | null;
  plan_type: "free" | "growth" | "professional" | "enterprise";
  billing_status: "active" | "past_due" | "canceled" | "trialing";
  trial_ends_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  org_id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: "super_admin" | "org_admin" | "manager" | "inspector";
  avatar_url: string | null;
  is_active: boolean;
  language: string;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface Branch {
  id: string;
  org_id: string;
  name: string;
  address: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserBranch {
  user_id: string;
  branch_id: string;
  role_in_branch: "manager" | "inspector" | "viewer";
  assigned_at: string;
}

export interface Template {
  id: string;
  org_id: string | null;
  created_by: string;
  title: string;
  description: string | null;
  industry: string | null;
  category: string | null;
  is_public: boolean;
  sections: TemplateSection[];
  is_active: boolean;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface TemplateSection {
  id: string;
  title: string;
  questions: TemplateQuestion[];
}

export interface TemplateQuestion {
  id: string;
  type: "yes_no" | "rating" | "text" | "multiple_choice" | "photo" | "qr_scan";
  title: string;
  required: boolean;
  max?: number;
  options?: string[];
}

export interface Inspection {
  id: string;
  org_id: string;
  branch_id: string;
  template_id: string;
  inspector_id: string;
  reviewed_by: string | null;
  status: "draft" | "in_progress" | "submitted" | "reviewed" | "approved" | "rejected";
  score: number | null;
  lat: number | null;
  lng: number | null;
  geo_address: string | null;
  notes: string | null;
  started_at: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Issue {
  id: string;
  org_id: string;
  inspection_id: string | null;
  branch_id: string;
  reported_by: string;
  assigned_to: string | null;
  title: string;
  description: string | null;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved" | "closed";
  due_date: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  org_id: string;
  branch_id: string;
  issue_id: string | null;
  created_by: string;
  assigned_to: string | null;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "completed" | "cancelled";
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  org_id: string;
  user_id: string;
  type: "issue" | "task" | "inspection" | "system" | "reminder";
  title: string;
  body: string | null;
  data: any;
  is_read: boolean;
  channel: "in_app" | "email" | "push" | "sms";
  sent_at: string;
  read_at: string | null;
}
