// Client-side GA4 (gtag.js) -- catches ordinary browser visits. Deliberately
// paired with a server-side event in functions/_middleware.js: gtag.js only
// runs in a JS-executing browser, so it never sees agent/bot/script traffic
// on its own (see README.md for why both are needed).
import { GA_MEASUREMENT_ID } from "./config.js";

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", GA_MEASUREMENT_ID);

const script = document.createElement("script");
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.appendChild(script);
