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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg gradient-brand" />
            <span className="text-lg font-bold text-zinc-900">LVL Up</span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900">Create Account</h1>
          <p className="text-zinc-500 mt-1">Start improving your branch performance</p>
        </div>

        <form onSubmit={handleRegister} className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-100 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Organization Name</label>
            <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required minLength={6}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none" />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</div>
          )}

          <button type="submit" disabled={loading}
            className="w-full text-white gradient-brand rounded-xl px-6 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-600 hover:text-brand-700 font-medium">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}