// Shared config for both client-side (assets/analytics.js) and server-side
// (functions/_middleware.js) analytics -- a plain ES module, imported by
// both, so there's exactly one place to update. Placeholders on purpose --
// the site works fine with these left as-is (GA simply has nowhere real to
// send events), swap in the real values later and redeploy, nothing else
// needs to change.
//
// GA_MEASUREMENT_ID: GA4 admin -> Data Streams -> your stream -> "Measurement ID" (G-XXXXXXXXXX)
// GA_API_SECRET: GA4 admin -> Data Streams -> your stream -> Measurement Protocol API secrets -> Create
export const GA_MEASUREMENT_ID = "G-PLACEHOLDER";
export const GA_API_SECRET = "PLACEHOLDER";
