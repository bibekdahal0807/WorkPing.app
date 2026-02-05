import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { githubFetch } from "@/lib/github";

export async function GET() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getSession();

  console.log("SESSION DEBUG:", {
    hasSession: !!data.session,
    hasProviderToken: !!data.session?.provider_token,
    providerTokenStart: data.session?.provider_token?.substring(0, 10)
  });

  if (!data.session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!data.session.provider_token) {
    return NextResponse.json(
      { error: "GITHUB_NOT_CONNECTED" },
      { status: 401 }
    );
  }

  const repos = await githubFetch(
    "https://api.github.com/user/repos?per_page=100&sort=updated",
    data.session.provider_token
  );

  if (!Array.isArray(repos)) {
    return NextResponse.json(
      { error: "Unexpected GitHub response" },
      { status: 500 }
    );
  }

  return NextResponse.json(repos);
}
