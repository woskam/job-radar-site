#!/usr/bin/env node
// Run before every deploy that touches index.html, alerts.html, or
// companies.html: _headers' CSP allowlists those three pages' inline
// <script> blocks by content hash instead of 'unsafe-inline' (see
// _headers' own comment for why), so editing one without recomputing its
// hash here doesn't error -- it just silently breaks the page for every
// visitor, CSP blocks the now-mismatched script with no visible failure
// except "nothing on the page works". This caught exactly that after the
// location-chips DocumentFragment change shipped without a hash bump.
//
// Usage: node scripts/verify-csp-hashes.js
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const PAGES = ["index.html", "alerts.html", "companies.html"];

function inlineScriptHashes(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  const hashes = [];
  let m;
  while ((m = re.exec(html))) {
    hashes.push(crypto.createHash("sha256").update(m[1], "utf8").digest("base64"));
  }
  return hashes;
}

const headersPath = path.join(ROOT, "_headers");
const headersContent = fs.readFileSync(headersPath, "utf8");
const allowlisted = new Set(
  [...headersContent.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1])
);

let ok = true;
for (const page of PAGES) {
  const actual = inlineScriptHashes(path.join(ROOT, page));
  for (const hash of actual) {
    if (!allowlisted.has(hash)) {
      ok = false;
      console.error(`MISMATCH: ${page}'s inline <script> hash 'sha256-${hash}' is not in _headers' CSP.`);
      console.error(`  Add it (and remove ${page}'s old hash, if the script count didn't change) to the script-src list in _headers.`);
    }
  }
}

if (ok) {
  console.log(`OK -- all inline <script> hashes in ${PAGES.join(", ")} are allowlisted in _headers.`);
  process.exit(0);
} else {
  process.exit(1);
}
