import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST() {
  const supabase = await supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Check current usage
  const { data: profile } = await supabase
    .from("profiles")
    .select("updates_used")
    .eq("id", session.user.id)
    .single();

  const currentUsage = profile?.updates_used || 0;

  if (currentUsage >= 1) {
    return NextResponse.json({ limitReached: true }, { status: 403 });
  }

  // Increment usage
  await supabase
    .from("profiles")
    .upsert({
      id: session.user.id,
      email: session.user.email,
      updates_used: currentUsage + 1
    });

  return NextResponse.json({ success: true });
}