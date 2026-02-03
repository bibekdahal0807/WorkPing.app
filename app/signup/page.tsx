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
  setLoading(true);
  setError(null);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  const user = data.user;
  if (!user) {
    setLoading(false);
    return;
  }

  // ✅ SAFE profile creation (no duplicate errors)
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email: user.email,
      },
      {
        onConflict: "id",
      }
    );

  // 🚫 DO NOT BLOCK USER ON PROFILE ERROR
  if (profileError) {
    console.warn("Profile upsert warning:", profileError.message);
  }

  // ✅ Always continue
  window.location.href = "/dashboard";
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

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-100"
              />

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
              className="w-full bg-[#1E293B] text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-60 active:scale-95 active:bg-slate-900"
            >
              {loading ? "Creating account..." : "Sign up"}
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
