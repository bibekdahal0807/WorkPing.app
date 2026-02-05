import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { githubFetch } from "@/lib/github";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get("repo");

  if (!repo) {
    return NextResponse.json({ error: "Missing repo" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.provider_token;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pulls = await githubFetch(
    `https://api.github.com/repos/${repo}/pulls?state=closed&per_page=50`,
    token
  );

  const merged = pulls.filter((p: any) => p.merged_at);

  return NextResponse.json(merged);
}
