// Shared interactive search behaviour for both /jobs (jobs.html) and every
// /jobs/{slug} landing page (functions/jobs/[slug].js) -- same filters,
// live search, pagination, location chips, and "single filter -> its own
// landing page" navigation, so the two never drift into two different
// implementations of the same search. A landing page differs only in
// where its initial filter state comes from (window.__INITIAL_FILTERS__,
// set by the Function before this module loads) and in already having
// real job cards server-rendered before this script ever runs.
import { CATEGORIES, CATEGORY_LABELS } from '/assets/categories.js';
import { COMBOS } from '/assets/combos.js';
import { LOCATIONS } from '/assets/locations.js';
import { COMPANIES } from '/assets/companies.js';

const categorySelect = document.getElementById('category-filter');
for (const c of CATEGORIES) {
  const opt = document.createElement('option');
  opt.value = c; opt.textContent = CATEGORY_LABELS[c] || c;
  categorySelect.appendChild(opt);
}

const locationSelect = document.getElementById('location');
for (const loc of LOCATIONS) {
  if (loc.slug === 'remote') continue; // covered by the separate Remote checkbox
  const opt = document.createElement('option');
  opt.value = loc.name.toLowerCase(); opt.textContent = loc.name;
  locationSelect.appendChild(opt);
}

// Read before building the chips (not just later, at prefill time) --
// a landing page with a location already active needs that to decide
// whether to collapse the chip list below.
// A landing page's own filters (from its URL path) win over query params;
// query params carry anything extra (keywords, company, ...) on top.
const initialSource = {
  ...Object.fromEntries(new URLSearchParams(window.location.search)),
  ...(window.__INITIAL_FILTERS__ || {}),
};
const initial = { get: (k) => initialSource[k] || null };

const chipsEl = document.getElementById('location-chips');
const chipsFragment = document.createDocumentFragment();
for (const loc of LOCATIONS) {
  const a = document.createElement('a');
  a.className = 'chip-link';
  a.href = `/jobs/${loc.slug}`;
  a.textContent = loc.name;
  chipsFragment.appendChild(a);
}
chipsEl.appendChild(chipsFragment);

// A location is already selected (via the landing page's own slug, or a
// location_mode query param) -- the full ~30-chip list is then mostly
// redundant with what's already active, and on mobile it pushes the
// actual results far down the page. Collapse it behind a toggle instead
// of always showing it expanded.
if (initial.get('location_mode')) {
  // .chip-list sets its own `display: flex` -- an author-origin rule,
  // which beats the UA stylesheet's `[hidden] { display: none }`
  // regardless of specificity (origin is resolved before specificity in
  // the cascade), so plain `.hidden = true` silently does nothing here.
  // An inline style always wins over a class rule, hidden or not.
  chipsEl.style.display = 'none';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'chip-link';
  toggle.textContent = 'Show all cities';
  toggle.addEventListener('click', () => {
    chipsEl.style.display = '';
    toggle.remove();
  });
  chipsEl.insertAdjacentElement('beforebegin', toggle);
}

const PAGE_SIZE = 50;
let offset = 0;

const q = document.getElementById('q');
const segmentFilter = document.getElementById('segment-filter');
const locationInput = document.getElementById('location');
const remoteOnly = document.getElementById('remote-only');
const excludeInput = document.getElementById('exclude');
const companyInput = document.getElementById('company');
const companyOptions = document.getElementById('company-options');
const resultsEl = document.getElementById('results');
const countEl = document.getElementById('result-count');
const pageIndicator = document.getElementById('page-indicator');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const alertLink = document.getElementById('alert-link');

// Every filter state maps to a real page URL, so a visitor who filters
// always ends up on a landing page rather than an anonymous dynamic one:
// the most specific page for the location/category part
// (/jobs/{city}/{category} when that combination has a page, see
// assets/combos.js, else /jobs/{city}, /jobs/{category} or /jobs), with
// everything else carried as query params. Those pages' canonical URLs
// leave the query out, so search engines only ever see the clean pages.
function targetUrl() {
  const loc = remoteOnly.checked
    ? 'remote'
    : (LOCATIONS.find((l) => l.name.toLowerCase() === locationInput.value) || {}).slug
      || (locationInput.value ? locationInput.value.replace(/\s+/g, '-') : null);
  const cat = categorySelect.value || null;
  const params = new URLSearchParams();
  let path;
  if (loc && cat && COMBOS.some((c) => c.city === loc && c.category === cat)) path = `/jobs/${loc}/${cat}`;
  else if (loc) {
    path = `/jobs/${loc}`;
    if (cat) params.set('category', cat);
  } else if (cat) path = `/jobs/${cat}`;
  else path = '/jobs';
  if (q.value.trim()) params.set('keywords', q.value.trim());
  if (segmentFilter.value) params.set('segment', segmentFilter.value);
  if (excludeInput.value.trim()) params.set('exclude_keywords', excludeInput.value.trim());
  if (companyInput.value.trim()) params.set('company', companyInput.value.trim());
  const query = params.toString();
  return { path, url: path + (query ? '?' + query : '') };
}

function currentPath() {
  return window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '').toLowerCase() || '/';
}

// Navigates when the filters now belong to a different page; otherwise
// just keeps the current URL's query params in sync (no reload, so typing
// in the keyword box stays a live search).
function goToFilterPage() {
  const { path, url } = targetUrl();
  if (path !== currentPath()) {
    window.location.href = url;
    return true;
  }
  history.replaceState(null, '', url);
  return false;
}

function onFilterChange() {
  if (!goToFilterPage()) searchFromStart();
}

function currentFilters() {
  return {
    title_contains: q.value.trim(),
    category: categorySelect.value,
    segment: segmentFilter.value,
    location_contains: remoteOnly.checked ? 'remote' : locationInput.value.trim(),
    exclude_keywords: excludeInput.value.trim(),
    company: companyInput.value.trim(),
  };
}

function updateAlertLink() {
  const f = currentFilters();
  const params = new URLSearchParams();
  if (f.title_contains) params.set('keywords', f.title_contains);
  if (f.category) params.set('category', f.category);
  if (f.segment) params.set('segment', f.segment);
  if (remoteOnly.checked) params.set('location_mode', 'remote');
  else if (f.location_contains) params.set('location_mode', f.location_contains);
  if (f.exclude_keywords) params.set('exclude_keywords', f.exclude_keywords);
  if (f.company) params.set('company', f.company);
  alertLink.href = '/alerts' + (params.toString() ? '?' + params.toString() : '');
}

function renderResults(data) {
  resultsEl.innerHTML = '';
  if (!data.results.length) {
    resultsEl.innerHTML = '<p class="tagline">No matching listings right now. Try widening the filters.</p>';
  }
  for (const job of data.results) {
    const card = document.createElement('div');
    card.className = 'job-card';
    const badges = [job.category, job.segment].filter(Boolean)
      .map((b) => `<span class="badge">${b}</span>`).join('');
    card.innerHTML = `
      <h2><a href="${job.url}" target="_blank" rel="noopener">${job.title || '(untitled)'}</a></h2>
      <div class="meta">${job.company || ''}${job.location ? ' &middot; ' + job.location : ''}</div>
      <div class="badges">${badges}</div>
    `;
    resultsEl.appendChild(card);
  }
  countEl.textContent = `${data.count} result${data.count === 1 ? '' : 's'} on this page`;
  pageIndicator.textContent = `Page ${Math.floor(offset / PAGE_SIZE) + 1}`;
  prevBtn.disabled = offset === 0;
  nextBtn.disabled = data.count < PAGE_SIZE;
}

async function search() {
  countEl.textContent = 'Loading…';
  const f = currentFilters();
  const params = new URLSearchParams({ limit: PAGE_SIZE, offset });
  for (const [k, v] of Object.entries(f)) if (v) params.set(k, v);

  try {
    const resp = await fetch('/api/jobs?' + params.toString());
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'request failed');
    renderResults(data);
  } catch {
    countEl.textContent = 'Could not load listings, try again shortly.';
  }
  updateAlertLink();
}

let debounceTimer;
function searchFromStart() {
  offset = 0;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(search, 250);
}

q.addEventListener('input', onFilterChange);
categorySelect.addEventListener('change', onFilterChange);
segmentFilter.addEventListener('change', onFilterChange);
locationInput.addEventListener('change', onFilterChange);
remoteOnly.addEventListener('change', onFilterChange);
excludeInput.addEventListener('input', onFilterChange);
const MAX_COMPANY_SUGGESTIONS = 15;
function updateCompanySuggestions() {
  const value = companyInput.value.trim().toLowerCase();
  companyOptions.innerHTML = '';
  if (value.length < 2) return; // 1000+ companies -- wait for a couple of letters before suggesting any
  const fragment = document.createDocumentFragment();
  let shown = 0;
  for (const name of COMPANIES) {
    if (!name.toLowerCase().includes(value)) continue;
    const opt = document.createElement('option');
    opt.value = name;
    fragment.appendChild(opt);
    if (++shown >= MAX_COMPANY_SUGGESTIONS) break; // COMPANIES is sorted, so this is also alphabetical
  }
  companyOptions.appendChild(fragment);
}
companyInput.addEventListener('input', updateCompanySuggestions);
companyInput.addEventListener('input', onFilterChange);
prevBtn.addEventListener('click', () => { offset = Math.max(0, offset - PAGE_SIZE); search(); });
nextBtn.addEventListener('click', () => { offset += PAGE_SIZE; search(); });

// Prefill from the landing page's slug-derived filter (window.__INITIAL_FILTERS__,
// set by functions/jobs/[slug].js before this module loads) or, on the plain
// /jobs page, from query params (e.g. arriving from a link elsewhere).
// initialSource/initial themselves are declared near the top of this file,
// before the location-chips are built, which also needs to know this.
if (initial.get('keywords')) q.value = initial.get('keywords');
if (initial.get('category')) categorySelect.value = initial.get('category');
if (initial.get('segment')) segmentFilter.value = initial.get('segment');
if (initial.get('location_mode') === 'remote') remoteOnly.checked = true;
else if (initial.get('location_mode')) {
  // A landing page for a city outside LOCATIONS (e.g. /jobs/eindhoven)
  // gets its own option, or the select would silently show "Any location"
  // and the next filter change would navigate away from this city.
  const value = initial.get('location_mode').toLowerCase();
  if (![...locationInput.options].some((o) => o.value === value)) {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value.replace(/\b\w/g, (c) => c.toUpperCase());
    locationInput.appendChild(opt);
  }
  locationInput.value = value;
}
if (initial.get('exclude_keywords')) excludeInput.value = initial.get('exclude_keywords');
if (initial.get('company')) companyInput.value = initial.get('company');

// Plain /jobs reached with filters in the query string (an old link, a
// bookmark): send it on to the landing page those filters belong to.
if (currentPath() === '/jobs' && targetUrl().path !== '/jobs') window.location.replace(targetUrl().url);
else search();
