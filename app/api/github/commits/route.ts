import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { githubFetch } from "@/lib/github";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get("repo");
  const since = searchParams.get("since");

  if (!repo || !since) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.provider_token;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const commits = await githubFetch(
      `https://api.github.com/repos/${repo}/commits?since=${since}`,
      token
    );

    // Handle empty repo or no recent commits
    if (!Array.isArray(commits) || commits.length === 0) {
      return NextResponse.json({ status: "empty_repo", commits: [] });
    }

    return NextResponse.json(commits);
  } catch (error: any) {
    // Handle 409 (empty repo) or other GitHub errors
    if (error.message?.includes('409')) {
      return NextResponse.json({ status: "empty_repo", commits: [] });
    }
    
    // Pass through specific GitHub errors
    if (['RATE_LIMIT_EXCEEDED', 'GITHUB_UNAVAILABLE', 'GITHUB_PERMISSION_DENIED'].includes(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    throw error;
  }
}