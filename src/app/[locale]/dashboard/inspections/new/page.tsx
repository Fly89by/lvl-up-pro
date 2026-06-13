"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Camera, MapPin, Send, Star, Sparkles } from "lucide-react";
import type { Template, TemplateSection, TemplateQuestion } from "@/lib/db/types";

export default function NewInspectionPage() {
  const router = useRouter();
  const supabase = createClient();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"select" | "fill" | "review">("select");
  const [saving, setSaving] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase.from("users").select("org_id, role").eq("id", user.id).single();
      if (!profile) return;

      const [tRes, bRes] = await Promise.all([
        supabase.from("templates").select("*").or(`org_id.eq.${profile.org_id},is_public.eq.true`).eq("is_active", true),
        supabase.from("branches").select("*").eq("org_id", profile.org_id).eq("is_active", true),
      ]);
      if (tRes.data) setTemplates(tRes.data as unknown as Template[]);
      if (bRes.data) setBranches(bRes.data);
    }
    load();
  }, []);

  function startInspection() {
    if (!selectedTemplate || !selectedBranch) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
    setStep("fill");
  }

  function setAnswer(questionId: string, value: any) {
    setAnswers({ ...answers, [questionId]: value });
  }

  function handlePhoto(questionId: string) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const { data } = await supabase.storage.from("inspection-media").upload(`temp/${Date.now()}_${file.name}`, file);
      if (data) setPhotos({ ...photos, [questionId]: data.path });
    };
    input.click();
  }

  async function submitInspection() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return;

    const totalQuestions = selectedTemplate!.sections.reduce((sum, s) => sum + s.questions.length, 0);
    const answered = Object.keys(answers).length;
    const yesNoAnswers = Object.entries(answers).filter(([k, v]) => typeof v === "boolean");
    const ratingAnswers = Object.entries(answers).filter(([k, v]) => typeof v === "number");
    const yesCount = yesNoAnswers.filter(([, v]) => v === true).length;
    const avgRating = ratingAnswers.length > 0
      ? ratingAnswers.reduce((sum, [, v]) => sum + (v as number), 0) / ratingAnswers.length * 20
      : 0;
    const yesScore = yesNoAnswers.length > 0 ? (yesCount / yesNoAnswers.length) * 100 : 0;
    const score = Math.round((yesScore + avgRating) / (yesNoAnswers.length > 0 && ratingAnswers.length > 0 ? 2 : 1));

    await supabase.from("inspections").insert({
      org_id: profile.org_id,
      branch_id: selectedBranch,
      template_id: selectedTemplate!.id,
      inspector_id: user.id,
      status: "submitted",
      score,
      lat: location?.lat || null,
      lng: location?.lng || null,
      notes: notes || null,
      submitted_at: new Date().toISOString(),
    });

    setSaving(false);
    router.push("/dashboard/inspections");
    router.refresh();
  }

  if (step === "select") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-surface-900 animate-fade-in-up">New Inspection</h1>
            <p className="text-surface-500 text-sm mt-1">Select template and branch to start inspection</p></div>
          <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-surface-500 hover:text-surface-700">
            <ArrowRight className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-6 space-y-5 glass-card">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Branch</label>
            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 outline-none">
              <option value="">Select branch...</option>
              {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Inspection Template</label>
            <div className="grid gap-2">
              {templates.map((t) => (
                <button key={t.id} type="button" onClick={() => setSelectedTemplate(t)}
                  className={`text-right w-full p-4 rounded-xl border transition-all ${
                    selectedTemplate?.id === t.id
                      ? "border-brand-400 bg-brand-50"
                      : "border-surface-200 hover:border-brand-200"
                  }`}>
                  <p className="text-sm font-medium text-surface-900">{t.title}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{t.sections?.length || 0} sections</p>
                </button>
              ))}
            </div>
          </div>
          <button onClick={startInspection} disabled={!selectedTemplate || !selectedBranch}
            className="w-full py-2.5 btn-primary disabled:opacity-50">
            Start Inspection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-surface-900 animate-fade-in-up">{selectedTemplate?.title}</h1>
          <p className="text-surface-500 text-sm mt-1">
            {branches.find((b) => b.id === selectedBranch)?.name}
            {location && " • Location set"}
          </p>
        </div>

      {answers && Object.keys(answers).length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-brand-50 rounded-2xl border border-purple-100 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-surface-700">AI Insights</span>
          </div>
          <p className="text-xs text-surface-600">Continue filling the inspection. AI will analyze your answers and provide recommendations on review.</p>
        </div>
      )}
        {step === "fill" && (
          <button onClick={() => setStep("review")} className="btn-primary">
            Review <Send className="w-4 h-4" />
          </button>
        )}
      </div>

      {step === "fill" && selectedTemplate?.sections.map((section: TemplateSection) => (
        <div key={section.id} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-6 space-y-4 glass-card">
          <h2 className="text-sm font-bold text-surface-900">{section.title}</h2>
          {section.questions.map((q: TemplateQuestion) => (
            <div key={q.id} className="space-y-2">
              <p className="text-sm text-surface-700">
                {q.title}
                {q.required && <span className="text-red-500 mr-1">*</span>}
              </p>

              {q.type === "yes_no" && (
                <div className="flex gap-2">
                  <button type="button" onClick={() => setAnswer(q.id, true)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      answers[q.id] === true ? "bg-emerald-500 text-white" : "bg-surface-100 text-surface-600 hover:bg-emerald-50"
                    }                    `}>Yes</button>
                  <button type="button" onClick={() => setAnswer(q.id, false)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      answers[q.id] === false ? "bg-red-500 text-white" : "bg-surface-100 text-surface-600 hover:bg-red-50"
                    }`}>No</button>
                </div>
              )}

              {q.type === "rating" && (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setAnswer(q.id, n)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        answers[q.id] >= n ? "bg-amber-400 text-white" : "bg-surface-100 text-surface-400"
                      }`}>
                      <Star className="w-4 h-4" fill={answers[q.id] >= n ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              )}

              {q.type === "text" && (
                <textarea value={answers[q.id] || ""} onChange={(e) => setAnswer(q.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-surface-200 text-sm outline-none focus:border-brand-400"
                  rows={2} placeholder="Write a note..." />
              )}

              {q.type === "multiple_choice" && (
                <div className="space-y-1.5">
                  {q.options?.map((opt, idx) => (
                    <button key={idx} type="button" onClick={() => setAnswer(q.id, opt)}
                      className={`block w-full text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                        answers[q.id] === opt ? "bg-brand-50 text-brand-700 border border-brand-300" : "bg-surface-50 text-surface-600 hover:bg-surface-100"
                      }`}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {q.type === "photo" && (
                <button type="button" onClick={() => handlePhoto(q.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-200 text-sm text-surface-600 hover:bg-surface-50">
                  <Camera className="w-4 h-4" />
                  {photos[q.id] ? "Photo taken" : "Take Photo"}
                </button>
              )}
            </div>
          ))}
        </div>
      ))}

      {step === "fill" && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-6 glass-card">
          <label className="block text-sm font-medium text-surface-700 mb-1.5">General Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-surface-200 text-sm outline-none focus:border-brand-400" rows={2} />
        </div>
      )}

      {step === "review" && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-6 space-y-4 glass-card">
          <h2 className="text-sm font-bold text-surface-900">Inspection Review</h2>
          <div className="space-y-2 text-sm text-surface-600">
            <p>Branch: {branches.find((b) => b.id === selectedBranch)?.name}</p>
            <p>Template: {selectedTemplate?.title}</p>
            <p>Answered {Object.keys(answers).length} question{Object.keys(answers).length > 1 ? 's' : ''}</p>
            {location && <p className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>}
          </div>
          <button onClick={submitInspection} disabled={saving}
              className="w-full py-2.5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50">
            {saving ? "Sending..." : "Submit Inspection"}
          </button>
        </div>
      )}
    </div>
  );
}
