export async function githubFetch(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("GitHub API Error:", {
      status: res.status,
      statusText: res.statusText,
      body: text
    });
    
    // Condition 7: Rate limit hit
    if (res.status === 403 && res.headers.get('X-RateLimit-Remaining') === '0') {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    
    // Condition 8: GitHub temporary failure
    if ([500, 502, 503].includes(res.status)) {
      throw new Error('GITHUB_UNAVAILABLE');
    }
    
    // Condition 9: Permissions issue
    if ([403, 404].includes(res.status)) {
      throw new Error('GITHUB_PERMISSION_DENIED');
    }
    
    throw new Error(`GitHub API request failed: ${res.status} ${text}`);
  }

  return res.json();
}
