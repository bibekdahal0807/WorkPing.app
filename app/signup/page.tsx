"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Profile will be created on dashboard visit
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Signup failed. Please try again.");
      setLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo read:user",
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Logo */}
      <div className="absolute top-0 left-0 z-10 p-4">
        <Link href="/">
          <span className="text-2xl font-black tracking-tighter text-[#4318FF]">
            WORKPING
          </span>
        </Link>
      </div>

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

        {/* LEFT */}
        <div className="flex items-center justify-center px-8 lg:px-16">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">
              Create your account
            </h1>

            {/* GitHub Signup */}
            <button
              onClick={handleGitHubSignup}
              disabled={loading}
              className="w-full bg-[#1E293B] text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-60 active:scale-95 flex items-center justify-center gap-3 mb-6"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.55-3.87-1.55-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.72-1.56-2.56-.3-5.25-1.3-5.25-5.77 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.52.12-3.16 0 0 .98-.32 3.2 1.2a11 11 0 0 1 5.82 0c2.22-1.52 3.2-1.2 3.2-1.2.64 1.64.24 2.86.12 3.16.75.82 1.2 1.85 1.2 3.12 0 4.48-2.7 5.47-5.28 5.76.41.36.77 1.07.77 2.15v3.18c0 .3.21.66.78.55 4.57-1.53 7.86-5.85 7.86-10.95C23.5 5.74 18.27.5 12 .5z" />
              </svg>
              {loading ? "Creating account..." : "Continue with GitHub"}
            </button>

            {/* Divider */}
            <div className="relative mb-6 flex items-center">
              <div className="flex-grow border-t border-slate-100" />
              <span className="mx-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                OR
              </span>
              <div className="flex-grow border-t border-slate-100" />
            </div>

            <div className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-100"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-100"
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-slate-600 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-all disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign up with Email"}
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-600 text-center">
                {error}
              </p>
            )}

            <p className="mt-6 text-sm text-slate-500 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-[#4318FF] font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT (same visual block style as login) */}
        <div className="hidden lg:flex items-center justify-center bg-[#4318FF] text-white px-20">
          <div className="max-w-md">
            {/* Icon */}
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Start generating client updates from real work
            </h2>

            {/* Body */}
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Connect GitHub and turn your commits and pull requests into clear, honest client updates.
              <br /><br />
              No spam. No fake progress. You stay in control.
            </p>

            {/* Trust indicators */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Works with private repositories</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>You can disconnect anytime</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
