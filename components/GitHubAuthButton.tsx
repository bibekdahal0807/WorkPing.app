"use client";

import { supabase } from "@/lib/supabaseClient";

export default function GitHubAuthButton({
  label,
  redirectTo,
}: {
  label: string;
  redirectTo: string;
}) {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`,
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium hover:bg-gray-50"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.55-3.87-1.55-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.72-1.56-2.56-.3-5.25-1.3-5.25-5.77 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.52.12-3.16 0 0 .98-.32 3.2 1.2a11 11 0 0 1 5.82 0c2.22-1.52 3.2-1.2 3.2-1.2.64 1.64.24 2.86.12 3.16.75.82 1.2 1.85 1.2 3.12 0 4.48-2.7 5.47-5.28 5.76.41.36.77 1.07.77 2.15v3.18c0 .3.21.66.78.55 4.57-1.53 7.86-5.85 7.86-10.95C23.5 5.74 18.27.5 12 .5z" />
      </svg>
      {label}
    </button>
  );
}
