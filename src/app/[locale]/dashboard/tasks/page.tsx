"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { ListChecks, Search, Plus, CheckCircle2, Clock, User, X, Save } from "lucide-react";

export default function TasksPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const supabase = createClient();
  const [tasks, setTasks] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" as string, branch_id: "", assigned_to: "", due_date: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return;

    const [tRes, bRes, uRes] = await Promise.all([
      supabase.from("tasks").select("*, branches(name)").eq("org_id", profile.org_id).order("created_at", { ascending: false }),
      supabase.from("branches").select("id, name").eq("org_id", profile.org_id).eq("is_active", true),
      supabase.from("users").select("id, full_name, role").eq("org_id", profile.org_id),
    ]);
    if (tRes.data) setTasks(tRes.data);
    if (bRes.data) setBranches(bRes.data);
    if (uRes.data) setUsers(uRes.data);
    setLoading(false);
  }

  async function createTask(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) { setSaving(false); return; }

    await supabase.from("tasks").insert({
      org_id: profile.org_id,
      branch_id: form.branch_id,
      created_by: user.id,
      assigned_to: form.assigned_to || null,
      title: form.title,
      description: form.description || null,
      priority: form.priority,
      status: "open",
      due_date: form.due_date || null,
    });

    setSaving(false);
    setShowForm(false);
    setForm({ title: "", description: "", priority: "medium", branch_id: "", assigned_to: "", due_date: "" });
    loadAll();
  }

  async function toggleStatus(task: any) {
    const newStatus = task.status === "completed" ? "open" : "completed";
    await supabase.from("tasks").update({
      status: newStatus,
      completed_at: newStatus === "completed" ? new Date().toISOString() : null,
    }).eq("id", task.id);
    loadAll();
  }

  const priorityColors: Record<string, string> = {
    low: "bg-zinc-100 text-zinc-600",
    medium: "bg-blue-50 text-blue-700",
    high: "bg-orange-50 text-orange-700",
    urgent: "bg-red-50 text-red-700",
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{t("tasks")}</h1>
          <p className="text-zinc-500 text-sm mt-1">Task Management</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors">
          <Plus className="w-4 h-4" /> {t("create")}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-900">New Task</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={createTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm outline-none focus:border-brand-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm outline-none focus:border-brand-400" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Priority</label>
                  <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm outline-none">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Due Date</label>
                  <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Branch</label>
                  <select value={form.branch_id} onChange={(e) => setForm({ ...form, branch_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm outline-none">
                    <option value="">Select...</option>
                    {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Assign To</label>
                  <select value={form.assigned_to} onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm outline-none">
                    <option value="">Select...</option>
                    {users.map((u) => <option key={u.id} value={u.id}>{u.full_name}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" disabled={saving}
                className="w-full py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 disabled:opacity-50">
                {saving ? "Saving..." : "Save Task"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {tasks.length === 0 && <p className="text-center py-12 text-zinc-400 text-sm">{t("noData")}</p>}
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 flex items-start gap-3">
            <button onClick={() => toggleStatus(task)} className="mt-0.5">
              {task.status === "completed" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-zinc-300 hover:border-brand-400 transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${task.status === "completed" ? "text-zinc-400 line-through" : "text-zinc-900 font-medium"}`}>
                {task.title}
              </p>
              {task.description && <p className="text-xs text-zinc-500 mt-0.5">{task.description}</p>}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority === "urgent" ? "Urgent" : task.priority === "high" ? "High" : task.priority === "medium" ? "Medium" : "Low"}
                </span>
                {task.branches?.name && <span className="text-xs text-zinc-400">{task.branches.name}</span>}
                {task.due_date && (
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(task.due_date).toLocaleDateString("en-US")}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
