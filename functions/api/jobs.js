// Server-side proxy for the /jobs.html browse page -- job-radar-hub's
// GET /jobs is tokengated, and the token must never reach the browser, so
// this Function holds it (Cloudflare Pages secret env var, set via
// `wrangler pages secret put HUB_API_KEY`, never committed) and forwards
// the request. Same "Function calls another service server-side" shape as
// functions/_middleware.js (GA4) and the Hub's own CORS-enabled
// /alerts/subscribe (used directly by client JS instead, since that one's
// public with no key to protect).
const HUB_URL = "https://hub.12getajob.com";

// Only pass through params job-radar-hub's /jobs actually understands --
// never forward the caller's query string verbatim, so this can't become
// an arbitrary-param pass-through to the Hub.
const ALLOWED_PARAMS = ["title_contains", "location_contains", "category", "segment", "company", "limit", "offset"];

export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const hubUrl = new URL("/jobs", HUB_URL);
  for (const key of ALLOWED_PARAMS) {
    const value = searchParams.get(key);
    if (value) hubUrl.searchParams.set(key, value);
  }

  let hubResponse;
  try {
    hubResponse = await fetch(hubUrl.toString(), {
      headers: { Authorization: `Bearer ${context.env.HUB_API_KEY}` },
    });
  } catch {
    return new Response(JSON.stringify({ error: "could not reach the jobs service, try again shortly" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const text = await hubResponse.text();
  return new Response(text, {
    status: hubResponse.status,
    headers: { "Content-Type": "application/json" },
  });
}
