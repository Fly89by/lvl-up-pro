"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (authError) {
      setError(authError.message === "User already registered"
        ? "This email is already registered"
        : authError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const orgSlug = orgName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 30) || `org-${Date.now()}`;

      const { data: org } = await supabase.from("organizations").insert({
        name: orgName || "My Organization",
        slug: orgSlug,
        plan_type: "free",
        billing_status: "trialing",
      }).select().single();

      if (org) {
        await supabase.from("users").insert({
          id: data.user.id,
          org_id: org.id,
          email,
          full_name: name,
          role: "org_admin",
          language: "en",
        });
      }

      router.push("/login?registered=true");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 via-white to-brand-50/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-9 h-9 rounded-xl gradient-brand transition-transform duration-200 group-hover:scale-105" />
            <span className="text-lg font-bold text-surface-900">LVL Up</span>
          </Link>
          <h1 className="text-2xl font-bold text-surface-900">Create Account</h1>
          <p className="text-surface-500 mt-1">Start improving your branch performance</p>
        </div>

        <form onSubmit={handleRegister} className="glass-card rounded-2xl p-8 space-y-5 animate-fade-in-up">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Organization Name</label>
            <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all duration-200 bg-white/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all duration-200 bg-white/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all duration-200 bg-white/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required minLength={6}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all duration-200 bg-white/50" />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-red-100">{error}</div>
          )}

          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-surface-500">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-600 hover:text-brand-700 font-medium transition-colors">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
