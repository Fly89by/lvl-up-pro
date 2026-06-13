"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, GripVertical, MoveUp, MoveDown, Save, ArrowRight } from "lucide-react";

interface Question {
  id: string;
  type: "yes_no" | "rating" | "text" | "multiple_choice" | "photo";
  title: string;
  required: boolean;
  options?: string[];
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

const questionTypes = [
  { value: "yes_no", label: "Yes / No" },
  { value: "rating", label: "Rating (1-5)" },
  { value: "text", label: "Text" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "photo", label: "Photo" },
];

export default function TemplateBuilder() {
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<Section[]>([
    { id: generateId(), title: "Section 1", questions: [] },
  ]);
  const [saving, setSaving] = useState(false);

  function addSection() {
    setSections([...sections, { id: generateId(), title: `Section ${sections.length + 1}`, questions: [] }]);
  }

  function removeSection(sectionId: string) {
    if (sections.length <= 1) return;
    setSections(sections.filter((s) => s.id !== sectionId));
  }

  function updateSectionTitle(sectionId: string, title: string) {
    setSections(sections.map((s) => (s.id === sectionId ? { ...s, title } : s)));
  }

  function addQuestion(sectionId: string) {
    setSections(sections.map((s) =>
      s.id === sectionId
        ? { ...s, questions: [...s.questions, { id: generateId(), type: "yes_no" as const, title: "", required: true }] }
        : s
    ));
  }

  function removeQuestion(sectionId: string, questionId: string) {
    setSections(sections.map((s) =>
      s.id === sectionId
        ? { ...s, questions: s.questions.filter((q) => q.id !== questionId) }
        : s
    ));
  }

  function updateQuestion(sectionId: string, questionId: string, updates: Partial<Question>) {
    setSections(sections.map((s) =>
      s.id === sectionId
        ? { ...s, questions: s.questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q)) }
        : s
    ));
  }

  function addOption(sectionId: string, questionId: string) {
    const option = `Option ${Date.now()}`;
    setSections(sections.map((s) =>
      s.id === sectionId
        ? { ...s, questions: s.questions.map((q) =>
            q.id === questionId
              ? { ...q, options: [...(q.options || []), option] }
              : q
          )}
        : s
    ));
  }

  function updateOption(sectionId: string, questionId: string, idx: number, value: string) {
    setSections(sections.map((s) =>
      s.id === sectionId
        ? { ...s, questions: s.questions.map((q) =>
            q.id === questionId
              ? { ...q, options: q.options?.map((o, i) => (i === idx ? value : o)) }
              : q
          )}
        : s
    ));
  }

  function removeOption(sectionId: string, questionId: string, idx: number) {
    setSections(sections.map((s) =>
      s.id === sectionId
        ? { ...s, questions: s.questions.map((q) =>
            q.id === questionId
              ? { ...q, options: q.options?.filter((_, i) => i !== idx) }
              : q
          )}
        : s
    ));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) { setSaving(false); return; }

    const { error } = await supabase.from("templates").insert({
      org_id: profile.org_id,
      created_by: user.id,
      title,
      description: description || null,
      category: category || null,
      sections,
      is_public: false,
      is_active: true,
      version: 1,
    });

    setSaving(false);
    if (!error) router.push("/dashboard/templates");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-surface-900 animate-fade-in-up">New Template</h1>
          <p className="text-surface-500 text-sm mt-1">Create a custom inspection template tailored to your needs</p>
        </div>
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-surface-500 hover:text-surface-700">
          <ArrowRight className="w-4 h-4" /> Back
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-6 space-y-4 glass-card">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Template Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              placeholder="e.g. Restaurant Cleanliness Assessment"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Description (optional)</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}
                placeholder="Restaurants, Warehouses..."
                className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none" />
            </div>
          </div>
        </div>

        {sections.map((section, sIdx) => (
          <div key={section.id} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-6 space-y-4 glass-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-sm">{sIdx + 1}</div>
                <input type="text" value={section.title} onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                  className="text-sm font-semibold text-surface-900 border-none outline-none bg-transparent focus:ring-0 p-0" />
              </div>
              <button type="button" onClick={() => removeSection(section.id)}
                className="p-1.5 rounded-lg text-surface-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {section.questions.map((q) => (
                <div key={q.id} className="bg-surface-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <input type="text" value={q.title} onChange={(e) => updateQuestion(section.id, q.id, { title: e.target.value })}
                      placeholder="Question..."
                      className="flex-1 px-3 py-2 rounded-lg border border-surface-200 text-sm focus:border-brand-400 outline-none bg-white" />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <select value={q.type} onChange={(e) => updateQuestion(section.id, q.id, { type: e.target.value as any })}
                      className="px-3 py-1.5 rounded-lg border border-surface-200 text-sm outline-none bg-white">
                      {questionTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <label className="flex items-center gap-1.5 text-sm text-surface-600 cursor-pointer">
                      <input type="checkbox" checked={q.required} onChange={(e) => updateQuestion(section.id, q.id, { required: e.target.checked })}
                        className="rounded border-surface-300 text-brand-600 focus:ring-brand-2000" />
                      Required
                    </label>
                    <button type="button" onClick={() => removeQuestion(section.id, q.id)}
                      className="p-1 rounded text-surface-400 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {q.type === "multiple_choice" && (
                    <div className="space-y-1.5 pr-4">
                      {q.options?.map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-2">
                          <input type="text" value={opt} onChange={(e) => updateOption(section.id, q.id, oIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 rounded-lg border border-surface-200 text-sm outline-none bg-white" />
                          <button type="button" onClick={() => removeOption(section.id, q.id, oIdx)}
                            className="text-surface-400 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addOption(section.id, q.id)}
                        className="text-xs text-brand-600 hover:text-brand-700 font-medium">
                        + Add Option
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button type="button" onClick={() => addQuestion(section.id)}
              className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium">
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>
        ))}

        <button type="button" onClick={addSection}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-surface-200 text-sm text-surface-500 hover:border-brand-300 hover:text-brand-600 transition-colors">
          + Add New Section
        </button>

        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className="btn-primary">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Template"}
          </button>
        </div>
      </form>
    </div>
  );
}
