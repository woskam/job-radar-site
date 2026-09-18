# job-radar-site

The public landing page for [Job Radar](https://github.com/woskam/job-radar) (the
open-source, self-hosted job-search pipeline) and
[Job Radar Hub](https://github.com/woskam/job-radar-hub) (the public read API of the
listings it finds). Plain static HTML/CSS/JS -- no build step, no framework, deployed to
Cloudflare Pages.

## Why it's built the way it is

Beyond the usual "make a nice page", this site is deliberately built to be **readable by
AI agents, not just browsers**:

- `llms.txt` -- a plain-Markdown index, the emerging convention for LLM-readable site summaries.
- `openapi.json` -- a machine-readable spec for the Job Radar Hub API.
- `.well-known/api-catalog` -- an [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) linkset
  tying all of the above together, modelled on the same pattern
  [specification.website](https://specification.website/mcp/) uses for its own MCP/agent
  discoverability.
- `robots.txt` -- explicitly allows the major AI crawlers (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, CCBot, ...), not just the default `*`.

**Deliberately not included yet**: an MCP server-card (`/.well-known/mcp/server-card.json`)
or `Link: rel="mcp"` response headers. Those would announce an MCP server that doesn't
exist yet -- add them once the Hub actually has one, not before.

### Analytics: why there are two mechanisms, not one

`assets/analytics.js` is the usual client-side `gtag.js` snippet -- but that only ever
runs inside a JS-executing browser. Most of the traffic this site cares about measuring
(agents, crawlers, a script fetching `llms.txt`/`openapi.json` directly) never executes
JavaScript, so a client-side snippet alone would make that traffic invisible.
`functions/_middleware.js` is a Cloudflare Pages Function that runs server-side on
**every** request and sends the same event via GA4's
[Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4) --
that sees non-browser traffic too. Cloudflare Pages' own built-in Analytics tab is also
free and already sees all traffic with zero setup; the two GA mechanisms here exist
specifically so that data lands in the same GA4 property as everything else, if you
already use GA elsewhere.

## Setting the real GA4 / Search Console values

Both analytics mechanisms, and Search Console verification, ship with clearly-marked
placeholders so the site works (and deploys) fine before you have real IDs:

- `assets/config.js` -- `GA_MEASUREMENT_ID` and `GA_API_SECRET` (GA4 admin -> Data Streams
  -> your stream; the API secret is under "Measurement Protocol API secrets" on that
  same screen -- click Create).
- `index.html` -- the `<meta name="google-site-verification" ...>` tag's `content`
  attribute (Search Console -> Add property -> HTML tag verification method).

Edit those, then redeploy (see below) -- nothing else needs to change.

## Local preview

```bash
python3 -m http.server 8000
```

## Deploying

```bash
npx wrangler pages deploy . --project-name=job-radar
```

Needs `CLOUDFLARE_API_TOKEN` set in the environment (a token scoped to "Cloudflare
Pages: Edit" is enough -- Cloudflare dashboard -> My Profile -> API Tokens -> Create
Token). First deploy creates the Pages project; every deploy after that just ships a new
version to the same `*.pages.dev` URL (or a custom domain, once one is attached to the
project in the Cloudflare dashboard).
