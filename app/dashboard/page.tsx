"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();

  const [repos, setRepos] = useState<any[]>([]);
  const [repo, setRepo] = useState("");
  const [range, setRange] = useState("7");
  const [commits, setCommits] = useState<any[]>([]);
  const [pulls, setPulls] = useState<any[]>([]);
  const [jsonData, setJsonData] = useState<any>(null);
  const [summary, setSummary] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitEmail, setLimitEmail] = useState("");
  const [limitLoading, setLimitLoading] = useState(false);
  const [limitMessage, setLimitMessage] = useState("");
  const [profile, setProfile] = useState<{
    updates_used: number;
    last_used_at: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      // Condition 1: User NOT authenticated
      if (!data.session) {
        router.push("/login");
        return;
      }
    };

    checkAuth();

    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("updates_used, last_used_at")
        .eq("id", user.id)
        .single();

      if (error) {
        // Condition 2: Profile missing - create silently
        await supabase
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email,
            updates_used: 0,
            last_used_at: null
          });
        
        setProfile({ updates_used: 0, last_used_at: null });
      } else {
        setProfile(data);
      }
    };

    loadProfile();

    fetch("/api/github/repos")
      .then((r) => {
        if (!r.ok) {
          return r.json().then(data => {
            throw new Error(data.error || 'Failed to fetch');
          });
        }
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setError("Failed to load repositories");
        }
      })
      .catch((err) => {
        if (err.message === "GITHUB_NOT_CONNECTED") {
          setError("GITHUB_NOT_CONNECTED");
        } else {
          setError("Failed to load repositories");
        }
      });
  }, [router]);

  const forceGitHubAuth = async () => {
    await supabase.auth.signOut();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo read:user",
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateSummary = async () => {
    // Condition 4: No repository selected
    if (!repo) {
      setError("Please select a repository");
      return;
    }

    // Condition 5: Time range not selected
    if (!range) {
      setError("Please select a time range");
      return;
    }

    // Condition 2: Profile not loaded yet
    if (!profile) {
      setError("Loading profile...");
      return;
    }
    
    // Condition 3: Usage limit exceeded
    if (profile.updates_used >= 1) {
      setShowLimitModal(true);
      return;
    }

    setLoading(true);
    setError(null);
    setCommits([]);
    setPulls([]);
    setJsonData(null);
    setSummary("");

    try {
      // STEP 1: Generate summary (source of truth action)
      const since = new Date(
        Date.now() - Number(range) * 24 * 60 * 60 * 1000
      ).toISOString();

      const [commitsRes, pullsRes] = await Promise.all([
        fetch(`/api/github/commits?repo=${repo}&since=${since}`).then((r) => r.json()),
        fetch(`/api/github/pulls?repo=${repo}`).then((r) => r.json())
      ]);

      // Handle GitHub API errors
      if (commitsRes.error === 'RATE_LIMIT_EXCEEDED' || pullsRes.error === 'RATE_LIMIT_EXCEEDED') {
        setError("GitHub rate limit reached. Please try again later.");
        setLoading(false);
        return;
      }
      
      if (commitsRes.error === 'GITHUB_UNAVAILABLE' || pullsRes.error === 'GITHUB_UNAVAILABLE') {
        setError("GitHub is temporarily unavailable. Please try again shortly.");
        setLoading(false);
        return;
      }
      
      if (commitsRes.error === 'GITHUB_PERMISSION_DENIED' || pullsRes.error === 'GITHUB_PERMISSION_DENIED') {
        setError("WorkPing doesn't have permission to access this repository.");
        setLoading(false);
        return;
      }

      // Condition 6.1: Repository is COMPLETELY EMPTY
      if (commitsRes.status === "empty_repo" && (!Array.isArray(pullsRes) || pullsRes.length === 0)) {
        setError("This repository doesn't have any commits yet. Once work begins, WorkPing will generate updates automatically.");
        setLoading(false);
        return;
      }

      const commits = Array.isArray(commitsRes) ? commitsRes : [];
      const pulls = Array.isArray(pullsRes) ? pullsRes : [];

      // Condition 6.2: No activity in selected range
      if (commits.length === 0 && pulls.length === 0) {
        setError("No commits or merged pull requests were found in the selected time range.");
        setLoading(false);
        return;
      }

      setCommits(commits);
      setPulls(pulls);
      
      const combinedData = {
        repository: repo,
        timeRange: `${range} days`,
        since: since,
        commits: commits,
        pullRequests: pulls,
        summary: {
          totalCommits: commits.length,
          totalPRs: pulls.length,
          generatedAt: new Date().toISOString()
        }
      };
      
      setJsonData(combinedData);
      
      const summaryRes = await fetch('/api/manual-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commits: commits, pulls: pulls })
      });
      const summaryData = await summaryRes.json();
      setSummary(summaryData.text);

      // STEP 4: Update profile ONLY after successful generation
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            updates_used: profile.updates_used + 1,
            last_used_at: new Date().toISOString()
          })
          .eq("id", user.id);

        // STEP 5: Update local state immediately
        if (!error) {
          setProfile({
            updates_used: profile.updates_used + 1,
            last_used_at: new Date().toISOString()
          });
        }
      }

    } catch {
      setError("Failed to generate summary");
      // Do NOT increment usage on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-50">
        {/* Top Bar - Same style as landing page */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* LEFT: Logo - Same as landing page */}
              <div className="flex-shrink-0">
                <button 
                  onClick={() => window.location.reload()}
                  className="text-2xl font-black tracking-tighter text-[#4318FF] hover:opacity-80 transition-opacity"
                >
                  WORKPING
                </button>
              </div>

              {/* RIGHT: Logout */}
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            
            {/* Step A: Context Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Generate client update</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Repository</label>
                  <select
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4318FF] focus:border-[#4318FF] bg-white"
                    onChange={(e) => setRepo(e.target.value)}
                    value={repo}
                  >
                    <option value="">Select repository</option>
                    {repos.map((r) => (
                      <option key={r.id} value={r.full_name}>
                        {r.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time range</label>
                  <select
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4318FF] focus:border-[#4318FF] bg-white"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                  >
                    <option value="7">Last 7 days</option>
                    <option value="14">Last 14 days</option>
                  </select>
                </div>
              </div>

              {/* Step B: Generate Button */}
              <button
                onClick={generateSummary}
                disabled={!repo || !range || loading || !profile}
                className="w-full bg-[#4318FF] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#3600E3] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {loading ? "Generating..." : !repo ? "Select a repository" : !range ? "Select a time range" : "Generate client update"}
              </button>
            </div>

            {/* Error State */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
                {error === "GITHUB_NOT_CONNECTED" && (
                  <button
                    onClick={forceGitHubAuth}
                    className="mt-2 text-sm text-red-700 underline hover:no-underline"
                  >
                    Connect GitHub
                  </button>
                )}
              </div>
            )}

            {/* Step C: Result */}
            {summary && (
              <div className="border-t border-slate-200 pt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">Your client update</h3>
                  <button
                    onClick={copyToClipboard}
                    className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <textarea
                  className="w-full border border-slate-300 rounded-xl p-4 text-sm font-mono leading-relaxed resize-none focus:ring-2 focus:ring-[#4318FF] focus:border-[#4318FF]"
                  style={{ height: `${Math.max(200, summary.split('\n').length * 24 + 50)}px` }}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Your client update will appear here..."
                />
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Step D: Usage Boundary */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              You've used your free updates
            </h3>
            <p className="text-gray-600 mb-6">
              We're validating WorkPing with early users. Join our early access to get unlimited updates.
            </p>
            <div className="space-y-3 mb-6">
              <input
                type="email"
                placeholder="Enter your email for early access"
                value={limitEmail}
                onChange={(e) => setLimitEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button 
                onClick={async () => {
                  if (!limitEmail) return;
                  setLimitLoading(true);
                  setLimitMessage("");
                  try {
                    const { error } = await supabase
                      .from('waitlist')
                      .insert({
                        email: limitEmail.trim(),
                        source: 'dashboard_limit'
                      });
                    if (error) {
                      if (error.code === '23505') {
                        setLimitMessage("You're already on the list! 🎉");
                      } else {
                        setLimitMessage("Something went wrong. Please try again.");
                      }
                    } else {
                      setLimitMessage("Thanks! We'll contact you soon 🚀");
                      setLimitEmail("");
                    }
                  } catch {
                    setLimitMessage("Something went wrong. Please try again.");
                  } finally {
                    setLimitLoading(false);
                  }
                }}
                disabled={limitLoading || !limitEmail}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {limitLoading ? "Requesting..." : "Request Early Access"}
              </button>
              {limitMessage && (
                <p className={`text-xs text-center ${
                  limitMessage.includes('already') || limitMessage.includes('Thanks') 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {limitMessage}
                </p>
              )}
            </div>
            <button
              onClick={() => setShowLimitModal(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">You've used your free update.</h3>
            <p className="text-gray-600 mb-6">Upgrade to continue generating client updates.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}