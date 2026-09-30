// Shared category list -- the Hub's own `category` field values (see
// job-radar-hub/db/queries.py's query_listings). Single source of truth
// for jobs.html's category filter dropdown and functions/jobs/[slug].js's
// slug resolution, so the two can never drift out of sync.
export const CATEGORIES = ["ai_ml","b2b","banking","beauty","climate","consulting","consumer","crypto","devtools","ecommerce","education","enterprise","fashion","fintech","fmcg","government","healthcare","healthtech","industrials","insurance","marketplace","mobility","other","overheid","pharma","real_estate_and_construction","resilience","saas","semiconductor","sportswear","staffing","tech","telecom"];
