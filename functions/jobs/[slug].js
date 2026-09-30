// Programmatic landing pages -- /jobs/{slug} -- server-rendered on every
// request (a Cloudflare Pages Function, same shape as ../api/jobs.js),
// not a periodically-regenerated static file like companies.html. That
// matters for crawlers: whoever fetches /jobs/amsterdam gets real,
// current job listings in the raw HTML, not an empty shell waiting for
// client-side JS. See ../../jobs.html for the equivalent client-rendered
// interactive search this links out to for "see more".
//
// No schema.org/JobPosting structured data yet, and job cards still link
// to the original ATS posting (job.url) rather than a URL of our own --
// both are deliberately separate, later steps.
import { CATEGORIES } from "../../assets/categories.js";

const HUB_URL = "https://hub.12getajob.com";
// The Hub's /jobs "count" field is just len(results) for this page, not a
// true total match count (see job-radar-hub/app.py's jobs() view) -- so
// the only honest way to say "how many" is to request its actual max
// page size and treat hitting that cap as a lower bound ("200+"), rather
// than trust a smaller page's count as if it were the full total.
const PAGE_SIZE = 200;

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function resolveSlug(slug) {
  const normalized = decodeURIComponent(slug).toLowerCase();
  const spaced = normalized.replace(/-/g, " ");

  if (normalized === "remote") {
    return { kind: "remote", locationMode: "remote", label: "Remote" };
  }
  // Title Case for display (categories and locations alike) -- the Hub's
  // own LIKE-based location_contains handles matching against the many
  // real-world location spellings ("Berlin", "Berlin, Germany", ...).
  const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

  const category = CATEGORIES.find((c) => c.toLowerCase() === normalized);
  if (category) {
    return { kind: "category", category, label: titleCase(category.replace(/_/g, " ")) };
  }
  return { kind: "location", locationMode: spaced, label: titleCase(spaced) };
}

function renderPage({ slug, resolved, jobs, siteOrigin }) {
  const atCap = jobs.length === PAGE_SIZE;
  const countLabel = atCap ? `${PAGE_SIZE}+` : String(jobs.length);
  const title = resolved.kind === "remote"
    ? "Remote jobs | 12GetAJob"
    : resolved.kind === "category"
      ? `${resolved.label} jobs | 12GetAJob`
      : `Jobs in ${resolved.label} | 12GetAJob`;
  const description = resolved.kind === "remote"
    ? "Live remote job listings, updated continuously -- save this search as a daily email alert."
    : resolved.kind === "category"
      ? `Live ${resolved.label} job listings, updated continuously -- save this search as a daily email alert.`
      : `Live job listings in ${resolved.label}, updated continuously -- save this search as a daily email alert.`;
  const canonical = `${siteOrigin}/jobs/${slug}`;

  const searchParams = new URLSearchParams();
  if (resolved.kind === "remote") searchParams.set("location_mode", "remote");
  else if (resolved.kind === "category") searchParams.set("category", resolved.category);
  else searchParams.set("location_mode", resolved.locationMode);
  const searchUrl = `/jobs?${searchParams.toString()}`;

  const cards = jobs.map((job) => {
    const badges = [job.category, job.segment].filter(Boolean)
      .map((b) => `<span class="badge">${escapeHtml(b)}</span>`).join("");
    return `
        <div class="job-card">
          <h3><a href="${escapeHtml(job.url)}" target="_blank" rel="noopener">${escapeHtml(job.title || "(untitled)")}</a></h3>
          <div class="meta">${escapeHtml(job.company || "")}${job.location ? " &middot; " + escapeHtml(job.location) : ""}</div>
          <div class="badges">${badges}</div>
        </div>`;
  }).join("\n");

  const seeMore = atCap
    ? `<p><a href="${searchUrl}">Browse all ${countLabel} results in the interactive search &rarr;</a></p>`
    : `<p><a href="${searchUrl}">Refine this search &rarr;</a></p>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#1e5a8a" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#6fb3e8" media="(prefers-color-scheme: dark)">
  <meta name="color-scheme" content="light dark">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="/assets/style.css?v=2">
  <script type="module" src="/assets/analytics.js"></script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <main id="main-content">
    <div class="hero">
      <div class="hero-inner">
        <header class="site-header" role="banner">
          <a href="/">12GetAJob</a>
          <nav>
            <a href="/jobs">Jobs</a>
            <a href="/companies">Companies</a>
            <a href="/alerts">Alerts</a>
            <a href="/developers">For developers</a>
          </nav>
        </header>

        <h1>${escapeHtml(title.replace(" | 12GetAJob", ""))}</h1>
        <p class="tagline">${countLabel} open role${jobs.length === 1 ? "" : "s"}, updated continuously. <a href="${searchUrl}">Save this search as a daily email alert &rarr;</a></p>
      </div>
    </div>

    <div class="wrap">
      <div id="results">${cards}
      </div>

      ${seeMore}

      <footer role="contentinfo">
        <a href="https://github.com/woskam/job-radar">job-radar</a> &middot;
        <a href="https://github.com/woskam/job-radar-hub">job-radar-hub</a> &middot;
        <a href="https://github.com/woskam/job-radar-site">this site's source</a> &middot;
        <a href="/privacy">privacy</a>
      </footer>
    </div>
  </main>
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { params, env, request } = context;
  const slug = params.slug;
  if (!slug || Array.isArray(slug)) return new Response("Not found", { status: 404 });

  const resolved = resolveSlug(slug);

  const hubUrl = new URL("/jobs", HUB_URL);
  hubUrl.searchParams.set("limit", String(PAGE_SIZE));
  if (resolved.kind === "category") hubUrl.searchParams.set("category", resolved.category);
  else hubUrl.searchParams.set("location_contains", resolved.locationMode);

  let hubResponse;
  try {
    hubResponse = await fetch(hubUrl.toString(), {
      headers: { Authorization: `Bearer ${env.HUB_API_KEY}` },
    });
  } catch {
    return new Response("Could not reach the jobs service, try again shortly.", { status: 502 });
  }
  if (!hubResponse.ok) {
    return new Response("Could not reach the jobs service, try again shortly.", { status: 502 });
  }

  const data = await hubResponse.json();
  if (!data.results || data.results.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const siteOrigin = new URL(request.url).origin;
  const html = renderPage({ slug, resolved, jobs: data.results, siteOrigin });
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
