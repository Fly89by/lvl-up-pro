"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message === "Invalid login credentials"
        ? "Invalid email or password"
        : authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg gradient-brand" />
            <span className="text-lg font-bold text-zinc-900">LVL Up</span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900">Sign In</h1>
          <p className="text-zinc-500 mt-1">Access your account</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-100 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white gradient-brand rounded-xl px-6 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-brand-600 hover:text-brand-700 font-medium">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}