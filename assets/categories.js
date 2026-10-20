// Shared category list -- the Hub's own `category` field values (see
// job-radar-hub/db/queries.py's query_listings). Single source of truth
// for jobs.html's category filter dropdown and functions/jobs/[slug].js's
// slug resolution, so the two can never drift out of sync.
export const CATEGORIES = ["ai_ml","b2b","banking","beauty","climate","consulting","consumer","crypto","devtools","ecommerce","education","enterprise","fashion","fintech","fmcg","government","healthcare","healthtech","industrials","insurance","marketplace","mobility","other","overheid","pharma","real_estate_and_construction","resilience","saas","semiconductor","sportswear","staffing","tech","telecom"];

// Display names for page titles, headings and the category dropdown.
// Anything missing falls back to the raw value, title-cased.
export const CATEGORY_LABELS = {
  ai_ml: "AI & ML", b2b: "B2B", banking: "Banking", beauty: "Beauty",
  climate: "Climate tech", consulting: "Consulting", consumer: "Consumer",
  crypto: "Crypto", devtools: "Developer tools", ecommerce: "E-commerce",
  education: "Education", enterprise: "Enterprise", fashion: "Fashion",
  fintech: "Fintech", fmcg: "FMCG", government: "Government",
  healthcare: "Healthcare", healthtech: "Health tech", industrials: "Industrials",
  insurance: "Insurance", marketplace: "Marketplace", mobility: "Mobility",
  other: "Other", overheid: "Overheid", pharma: "Pharma",
  real_estate_and_construction: "Real estate & construction",
  resilience: "Resilience", saas: "SaaS", semiconductor: "Semiconductor",
  sportswear: "Sportswear", staffing: "Staffing", tech: "Tech", telecom: "Telecom",
};
