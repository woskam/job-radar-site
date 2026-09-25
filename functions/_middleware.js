// Cloudflare Pages Function, runs on every request to this site -- the
// server-side half of analytics. gtag.js (assets/analytics.js) only fires
// inside a JS-executing browser, so it never sees the traffic this site
// most cares about measuring: agents, crawlers, curl-style HTTP clients
// fetching llms.txt / openapi.json / .well-known/api-catalog. This sees
// every request regardless, via GA4's Measurement Protocol (a plain
// server-to-server HTTP call, no browser involved).
import { GA_MEASUREMENT_ID } from "../assets/config.js";

// Paths worth distinguishing from a generic page_view -- these are exactly
// the files an agent (not a human) is likely to fetch directly.
const DOWNLOAD_EVENT_PATHS = {
  "/llms.txt": "llms_txt_fetch",
  "/openapi.json": "openapi_fetch",
  "/.well-known/api-catalog": "api_catalog_fetch",
  "/robots.txt": "robots_txt_fetch",
  "/sitemap.xml": "sitemap_fetch",
};

function clientIdFrom(request) {
  // Reuse the client-side gtag cookie's id when present, so a browser visit
  // that also triggers this middleware doesn't get double-counted as two
  // different users -- format is "GA1.1.<client_id>.<timestamp>".
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  if (match) return match[1];
  // No cookie (the common case for non-browser traffic) -- a random id is
  // fine here, this is a fire-and-forget hit count, not user-level tracking.
  return crypto.randomUUID();
}

async function sendMeasurementEvent(request, url, apiSecret) {
  if (GA_MEASUREMENT_ID === "G-PLACEHOLDER" || !apiSecret) {
    return; // no GA_API_SECRET Pages env var configured yet -- see assets/config.js
  }
  const eventName = DOWNLOAD_EVENT_PATHS[url.pathname] || "page_view";
  const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${apiSecret}`;
  const body = {
    client_id: clientIdFrom(request),
    events: [{
      name: eventName,
      params: {
        page_location: url.href,
        page_path: url.pathname,
        user_agent: request.headers.get("User-Agent") || "",
      },
    }],
  };
  try {
    await fetch(endpoint, { method: "POST", body: JSON.stringify(body) });
  } catch {
    // Analytics must never break the actual site -- swallow and move on.
  }
}

export async function onRequest(context) {
  const response = await context.next();
  const url = new URL(context.request.url);
  context.waitUntil(sendMeasurementEvent(context.request, url, context.env.GA_API_SECRET));
  return response;
}
