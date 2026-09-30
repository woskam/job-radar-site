// Shared "popular locations" list -- cities with a meaningful live job
// count (checked against the Hub's real data 2026-09-30, threshold >=40
// active listings) plus Remote. Single source of truth for the location
// chip lists on index.html and jobs.html, and the basis sitemap.xml's
// /jobs/{slug} entries were generated from (see functions/jobs/[slug].js
// for how a slug resolves back to a Hub location_contains query).
export const LOCATIONS = [
  { name: "Remote", slug: "remote" },
  { name: "San Francisco", slug: "san-francisco" },
  { name: "New York", slug: "new-york" },
  { name: "Berlin", slug: "berlin" },
  { name: "London", slug: "london" },
  { name: "Amsterdam", slug: "amsterdam" },
  { name: "Munich", slug: "munich" },
  { name: "Paris", slug: "paris" },
  { name: "Seattle", slug: "seattle" },
  { name: "Singapore", slug: "singapore" },
  { name: "Chicago", slug: "chicago" },
  { name: "Bengaluru", slug: "bengaluru" },
  { name: "Toronto", slug: "toronto" },
  { name: "Dublin", slug: "dublin" },
  { name: "Hamburg", slug: "hamburg" },
  { name: "Austin", slug: "austin" },
  { name: "Tokyo", slug: "tokyo" },
  { name: "Utrecht", slug: "utrecht" },
  { name: "Warsaw", slug: "warsaw" },
  { name: "Madrid", slug: "madrid" },
  { name: "Los Angeles", slug: "los-angeles" },
  { name: "Sydney", slug: "sydney" },
  { name: "Boston", slug: "boston" },
  { name: "Denver", slug: "denver" },
  { name: "Rotterdam", slug: "rotterdam" },
  { name: "Barcelona", slug: "barcelona" },
  { name: "Stockholm", slug: "stockholm" },
  { name: "Lisbon", slug: "lisbon" },
  { name: "Vienna", slug: "vienna" },
  { name: "Dubai", slug: "dubai" },
];
