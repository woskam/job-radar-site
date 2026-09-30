// Programmatic landing pages -- /jobs/{slug} -- server-rendered on every
// request (a Cloudflare Pages Function, same shape as ../api/jobs.js),
// not a periodically-regenerated static file like companies.html. That
// matters for crawlers: whoever fetches /jobs/amsterdam gets real,
// current job listings in the raw HTML, not an empty shell waiting for
// client-side JS.
//
// The rendered page is the *same* interactive search as jobs.html (same
// filter bar, chips, pagination, alert link -- all driven by the shared
// assets/jobs-search.js) rather than a dead-end card list: this Function
// only supplies two things jobs.html doesn't need -- real job cards
// already in the initial HTML (server-side fetched, for crawlers and for
// a non-blank first paint) and window.__INITIAL_FILTERS__, telling the
// shared script which filter this slug represents so it starts already
// applied instead of empty. From there the page behaves identically to
// /jobs: the shared script's own fetch quickly replaces these server-
// rendered cards with its own (a brief flash of the same data, standard
// SSR+hydrate trade-off, not worth avoiding with more machinery here).
//
// No schema.org/JobPosting structured data yet, and job cards still link
// to the original ATS posting (job.url) rather than a URL of our own --
// both are deliberately separate, later steps.
import { CATEGORIES } from "../../assets/categories.js";

const HUB_URL = "https://hub.12getajob.com";
const PAGE_SIZE = 50; // matches assets/jobs-search.js's own PAGE_SIZE

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

function initialFiltersFor(resolved) {
  if (resolved.kind === "remote") return { location_mode: "remote" };
  if (resolved.kind === "category") return { category: resolved.category };
  return { location_mode: resolved.locationMode };
}

function renderPage({ resolved, jobs, count, siteOrigin, slug }) {
  const title = resolved.kind === "remote"
    ? "Remote jobs | 12GetAJob"
    : resolved.kind === "category"
      ? `${resolved.label} jobs | 12GetAJob`
      : `Jobs in ${resolved.label} | 12GetAJob`;
  const description = resolved.kind === "remote"
    ? "Live remote job listings, updated continuously -- search, filter, and save it as a daily email alert."
    : resolved.kind === "category"
      ? `Live ${resolved.label} job listings, updated continuously -- search, filter, and save it as a daily email alert.`
      : `Live job listings in ${resolved.label}, updated continuously -- search, filter, and save it as a daily email alert.`;
  const canonical = `${siteOrigin}/jobs/${slug}`;

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
        <p class="tagline">${escapeHtml(description)}</p>

        <div class="filters">
          <input type="search" id="q" placeholder="Job title or keyword&hellip;" aria-label="Job title or keyword">
          <select id="category-filter" aria-label="Category"><option value="">Any category</option></select>
          <select id="segment-filter" aria-label="Segment">
            <option value="">Any segment</option>
            <option value="startup">Startups &amp; scale-ups</option>
          </select>
          <div style="display:flex; gap:8px; flex:1 1 220px;">
            <select id="location" aria-label="Location"><option value="">Any location</option></select>
            <label style="display:flex; align-items:center; gap:6px; font-size:14px; white-space:nowrap;">
              <input type="checkbox" id="remote-only"> Remote
            </label>
          </div>
          <input type="text" id="exclude" placeholder="Exclude keywords (comma-separated)&hellip;" aria-label="Exclude keywords">
        </div>

        <p class="tagline" style="margin:16px 0 4px;">Or browse by location:</p>
        <div id="location-chips" class="chip-list"></div>
      </div>
    </div>

    <div class="wrap">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <p id="result-count" class="tagline" style="margin:0;" aria-live="polite">${count} result${count === 1 ? "" : "s"} on this page</p>
        <a id="alert-link" href="/alerts">Get alerts for this search &rarr;</a>
      </div>

      <div id="results">${cards}
      </div>

      <div class="pagination">
        <button id="prev-page">&larr; Previous</button>
        <span id="page-indicator"></span>
        <button id="next-page">Next &rarr;</button>
      </div>

      <footer class="site-footer" role="contentinfo">
        <div class="site-footer-locations">
          <h4>Locations</h4>
          <div class="site-footer-locations-list">
            <a href="/jobs/remote">Remote</a>
            <a href="/jobs/san-francisco">San Francisco</a>
            <a href="/jobs/new-york">New York</a>
            <a href="/jobs/berlin">Berlin</a>
            <a href="/jobs/london">London</a>
            <a href="/jobs/amsterdam">Amsterdam</a>
            <a href="/jobs/munich">Munich</a>
            <a href="/jobs/paris">Paris</a>
            <a href="/jobs/seattle">Seattle</a>
            <a href="/jobs/singapore">Singapore</a>
            <a href="/jobs/chicago">Chicago</a>
            <a href="/jobs/bengaluru">Bengaluru</a>
            <a href="/jobs/toronto">Toronto</a>
            <a href="/jobs/dublin">Dublin</a>
            <a href="/jobs/hamburg">Hamburg</a>
            <a href="/jobs/austin">Austin</a>
            <a href="/jobs/tokyo">Tokyo</a>
            <a href="/jobs/utrecht">Utrecht</a>
            <a href="/jobs/warsaw">Warsaw</a>
            <a href="/jobs/madrid">Madrid</a>
            <a href="/jobs/los-angeles">Los Angeles</a>
            <a href="/jobs/sydney">Sydney</a>
            <a href="/jobs/boston">Boston</a>
            <a href="/jobs/denver">Denver</a>
            <a href="/jobs/rotterdam">Rotterdam</a>
            <a href="/jobs/barcelona">Barcelona</a>
            <a href="/jobs/stockholm">Stockholm</a>
            <a href="/jobs/lisbon">Lisbon</a>
            <a href="/jobs/vienna">Vienna</a>
            <a href="/jobs/dubai">Dubai</a>
          </div>
        </div>
        <div class="site-footer-grid">
          <div>
            <h4>Product</h4>
            <a href="/jobs">Jobs</a>
            <a href="/companies">Companies</a>
            <a href="/alerts">Alerts</a>
          </div>
          <div>
            <h4>Developers</h4>
            <a href="/developers">For developers</a>
            <a href="/api">API docs</a>
            <a href="https://github.com/woskam/job-radar">job-radar</a>
            <a href="https://github.com/woskam/job-radar-hub">job-radar-hub</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="/privacy">Privacy</a>
          </div>
        </div>
        <div class="site-footer-bottom">
          <span>&copy; 2026 12GetAJob</span>
          <a href="https://github.com/woskam/job-radar-site">This site's source</a>
        </div>
      </footer>
    </div>
  </main>

  <script>window.__INITIAL_FILTERS__ = ${JSON.stringify(initialFiltersFor(resolved))};</script>
  <script type="module" src="/assets/jobs-search.js"></script>
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
  const html = renderPage({ resolved, jobs: data.results, count: data.count, siteOrigin, slug });
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
