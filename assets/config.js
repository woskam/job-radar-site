// Shared config for client-side analytics (assets/analytics.js). Only the
// GA4 Measurement ID lives here -- this file is served as a public static
// asset, so nothing secret can go in it. The Measurement Protocol API
// secret used by functions/_middleware.js is read from the GA_API_SECRET
// Cloudflare Pages environment variable instead (Pages project -> Settings
// -> Environment variables, add as a secret) -- never from a file in this
// repo.
//
// GA_MEASUREMENT_ID: GA4 admin -> Data Streams -> your stream -> "Measurement ID" (G-XXXXXXXXXX)
export const GA_MEASUREMENT_ID = "G-7RZW9W8N1T";
