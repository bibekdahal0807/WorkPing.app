"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Star } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
     GitHub OAuth Login
  ------------------------------*/
  const handleGitHubLogin = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);
    if (error) setError(error.message);
  };

  /* -----------------------------
     Email + Password Login
  ------------------------------*/
  const handleEmailLogin = async () => {
    if (loading) return;

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Attempting login with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      console.log('Login response:', { data, error });

      if (error) {
        console.error('Login error:', error);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        console.log('Login successful, redirecting...');
        router.push("/dashboard");
      } else {
        console.error('No session created');
        setError('Login failed - no session created');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Logo */}
      <div className="absolute top-0 left-0 z-10 p-4">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-black tracking-tighter text-[#4318FF]">
            WORKPING
          </span>
        </Link>
      </div>

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

        {/* LEFT — LOGIN FORM */}
        <div className="flex items-center justify-center px-8 lg:px-16">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">
              Login to your account
            </h1>

            {/* GitHub Login */}
            <div className="relative mb-6">
              <span className="absolute -top-3 right-0 rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#10B981] border border-[#D1FAE5]">
                Recommended
              </span>

              <button
                type="button"
                onClick={handleGitHubLogin}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-60"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.55-3.87-1.55-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.72-1.56-2.56-.3-5.25-1.3-5.25-5.77 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.52.12-3.16 0 0 .98-.32 3.2 1.2a11 11 0 0 1 5.82 0c2.22-1.52 3.2-1.2 3.2-1.2.64 1.64.24 2.86.12 3.16.75.82 1.2 1.85 1.2 3.12 0 4.48-2.7 5.47-5.28 5.76.41.36.77 1.07.77 2.15v3.18c0 .3.21.66.78.55 4.57-1.53 7.86-5.85 7.86-10.95C23.5 5.74 18.27.5 12 .5z" />
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-8 flex items-center">
              <div className="flex-grow border-t border-slate-100" />
              <span className="mx-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                OR
              </span>
              <div className="flex-grow border-t border-slate-100" />
            </div>

            {/* Email / Password */}
            <form onSubmit={(e) => { e.preventDefault(); handleEmailLogin(); }} className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-100"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-100"
              />
            </form>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button className="text-sm font-medium text-slate-500 hover:text-slate-800">
                Forgot your password?
              </button>

              <button
                type="button"
                onClick={handleEmailLogin}
                disabled={loading}
                className="w-full bg-[#1E293B] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-60 active:scale-95"
              >
                {loading ? "Logging in..." : <>Login <ArrowRightIcon /></>}
              </button>

              {error && (
                <p className="text-sm text-red-600 text-center mt-2">
                  {error}
                </p>
              )}

              <p className="mt-6 text-sm text-slate-500 text-center">
                Create a new account?{" "}
                <Link href="/signup" className="text-[#4318FF] font-semibold">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — TESTIMONIAL (UNCHANGED) */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-[#4318FF] text-white px-20">
          <div className="max-w-md w-full">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black text-2xl font-black">
              W
            </div>

            <h2 className="text-4xl font-bold mb-4">
              Built from a real problem
            </h2>

            <div className="bg-[#5B2FFF] p-8 rounded-2xl">
              <p className="text-lg italic mb-8">
                "I built this because I was tired of rewriting client updates every week and worrying if I forgot something important. This tool turns real work into clear updates—nothing more, nothing less."
              </p>

              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src="https://github.com/shadcn.png"
                    alt="Bibek"
                    fill
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-bold">Bibek Dahal</p>
                  <p className="text-sm opacity-70">
                    Founder, Lead Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
