// Hand-written intro text for the city landing pages (/jobs/{slug}),
// rendered below the job list by functions/jobs/[slug].js. Based on what
// the Hub's live listings for each city looked like in October 2026 (top
// companies, category mix), plus general local context. Company names
// and themes drift as hiring changes, so re-check these against the live
// pages now and then. Deliberately no exact job counts: those would go
// stale within a day.
//
// Style: plain, specific, written like a person who looked at the list.
// No em dashes. A slug with no entry here simply renders no text section.
export const CITY_CONTENT = {
  "san-francisco": [
    "San Francisco is still where the AI companies do most of their hiring. In October 2026 the busiest employers here were Databricks, Anthropic, Stripe and Perplexity, with Figma and the satellite maker Astranis close behind. A lot of the list is developer tools and infrastructure, so engineering roles dominate, but sales and recruiting jobs show up more often than you might expect.",
    "Most of these companies want you in the office a few days a week, and the posting usually says so near the bottom. California requires salary ranges in job ads, so nearly every listing has one. That makes comparing offers a lot easier than in most cities.",
  ],
  "new-york": [
    "At the top, New York's list looks a lot like San Francisco's. Anthropic, Stripe, Figma and Scale AI are all hiring here. But the city has its own homegrown companies too: Braze and Via are both headquartered in New York and post new roles all the time. Fintech is bigger here than almost anywhere else on the site, which makes sense with the banks just around the corner.",
    "You'll notice more sales, partnerships and account management roles than on the West Coast. New York City also requires salary ranges in job ads, so pay is listed on nearly every posting.",
  ],
  "berlin": [
    "Berlin has the most startup-heavy list of any European city on the site. Climate tech leads, mostly thanks to 1KOMMA5°, which installs solar panels and heat pumps across Germany and is hiring to keep up. After that come fintech and health startups like Patient21 and Cloover, plus Axel Springer, one of the few large traditional employers that shows up here.",
    "English is fine in most Berlin startups, at least on the engineering side. Customer-facing jobs are a different story, and plenty of them ask for German at C1. Check the requirements before you spend an evening on a cover letter.",
  ],
  "london": [
    "London's list is shorter than Berlin's but more mixed. AI companies are well represented, with Anthropic, Databricks, Nebius and the defence startup Helsing all hiring, and Stripe has a big team here as well. Fintech is the other main theme, which won't surprise anyone who has spent time in the City or Shoreditch.",
    "If you need a visa, look for employers that are licensed sponsors. Most of the larger names on this page are. Smaller startups often aren't, and that's better to find out before the second interview than after.",
  ],
  "amsterdam": [
    "Amsterdam's list has two sides. One half is international tech companies with an office here, the other half is Dutch employers that mostly work in Dutch. On the tech side, Nebius posts the most Amsterdam jobs, many of them around its AI cloud, with Databricks and JetBrains not far behind. On the Dutch side you'll see a lot of UWV, plus HEMA and EY.",
    "The international companies hire in English and many of them sponsor visas for people moving from outside the EU. Government jobs like the ones at UWV almost always expect fluent Dutch, even when the work itself sounds technical. If you don't speak Dutch, try the exclude box above with words like \"medewerker\" or \"adviseur\" to thin the list out quickly.",
  ],
  "munich": [
    "Munich's list is shaped by a handful of companies. Helsing, the defence AI company, is headquartered here and posts more Munich jobs than anyone else. The Exploration Company, which is building a reusable space capsule, comes second. Add Roland Berger, JetBrains and the procurement startup Tacto and you've covered most of what's on offer.",
    "So expect a lot of engineering, and a fair share of it in defence and aerospace. Some of those roles need a security clearance or a specific citizenship, and the posting doesn't always say so up front. If that could be an issue for you, ask in the first call.",
  ],
  "paris": [
    "Paris is mostly Mistral at the moment. The AI lab posts more jobs here than the next four companies put together. After that it's the French startup names you'd expect: Alan for health insurance, Doctolib, Qonto for business banking and Pennylane for accounting software.",
    "French is the working language at most of these companies, even the ones that write their job ads in English. Engineering teams are often more relaxed about it, but for sales, support or anything legal, assume you'll need to be comfortable in French.",
  ],
  "seattle": [
    "The two companies everyone links to Seattle, Amazon and Microsoft, barely appear in this list. What you get instead are the Seattle offices of Anthropic, Stripe and Databricks, which together make up most of the postings, plus Pinterest and the drone maker BRINC.",
    "Washington requires salary ranges in job ads, so pay is listed on almost everything. The state also has no income tax, which changes the math if you're weighing an offer here against one in California.",
  ],
  "singapore": [
    "Singapore is the Asia-Pacific base for a lot of the companies on this site, so many of these jobs are regional roles at Stripe, Databricks, Nebius and ServiceNow. Banking is the biggest single category, and almost all of it comes from HSBC.",
    "Plenty of these positions cover the whole region rather than Singapore alone, so expect travel to come up in interviews. If you're moving from abroad you'll need an Employment Pass, and the salary threshold for it is high enough that junior roles rarely sponsor one.",
  ],
  "chicago": [
    "Chicago has fewer tech listings than the coasts, but there's real variety in them. Stripe posts the most here, and Braze, Flexport, Databricks, Uber and Intercom all have local teams. Sales and customer success make up a big part of the list, alongside engineering.",
    "Illinois started requiring pay ranges in job ads in 2025, so most postings now show a salary. Many of the roles are hybrid, and the posting usually tells you how many office days to expect.",
  ],
  "bengaluru": [
    "Most Bengaluru listings here are engineering jobs at companies based somewhere else. Databricks, Stripe and eBay all have large teams in the city. Razorpay is the big local name. You'll also see a lot of postings from Weekday, a recruiting platform that posts on behalf of startups, so the actual employer can be a bit vague until you click through.",
    "The thing everyone warns you about here is the commute. If a posting names an area like Whitefield or Outer Ring Road, check it against where you live before you apply.",
  ],
  "toronto": [
    "Toronto is a mix of homegrown AI and US companies with Canadian offices. Cohere, the language model company, is based here and hires across research and engineering. Stripe, eBay and Braze all have teams in the city, and HelloFresh runs its Canadian business from Toronto, which is where most of the non-tech roles on this page come from.",
    "Ontario requires pay ranges in job postings since the start of 2026, so you'll see more salaries listed than you used to.",
  ],
  "dublin": [
    "Dublin is where a lot of US tech companies put their European headquarters, and you can see it in the list. Stripe, founded by two Irish brothers, posts the most. MongoDB, Notion and Sony Interactive Entertainment are hiring here too, and Intercom, which started in Dublin, still has a large team in the city.",
    "The catch is housing. Salaries are good by European standards, but rent takes a big bite, so it's worth asking about relocation support early on.",
  ],
  "hamburg": [
    "Hamburg's list is dominated by two local companies. About You, the online fashion retailer, posts more than anyone else, and 1KOMMA5°, the solar and heat pump company, isn't far behind. Both are headquartered here. Statista, the data company, is another Hamburg original.",
    "That mix means lots of e-commerce, product and climate roles, and fewer pure infrastructure jobs than in Berlin or Munich. German is asked for more often than in Berlin, especially outside engineering.",
  ],
  "austin": [
    "Austin is a mix of software and hardware. On the software side, Braze, MongoDB and Vercel all hire here. On the hardware side there's NXP, which runs chip fabs in the city, and Skyways, a startup building cargo drones.",
    "Texas has no state income tax, which comes up a lot when people talk about moving here. It also doesn't require salary ranges in job ads, so you'll see fewer numbers than on California or Washington listings.",
  ],
  "tokyo": [
    "The Tokyo list is almost entirely international companies building out their Japan teams: Databricks, ServiceNow, Netflix, Notion, Anthropic and Snowflake. Many of the roles are in sales, solutions engineering and customer success, aimed at selling to Japanese enterprises.",
    "That's also why most of them ask for business-level Japanese, often alongside English. A few engineering roles don't, but they're the exception.",
  ],
  "utrecht": [
    "Utrecht is the most Dutch list on the site. A large share comes from government: the Ministry of Defence, the Belastingdienst and the Rijksvastgoedbedrijf all have big offices in or near the city. On the commercial side, both bol.com and ASN Bank are headquartered here, and HEMA has a lot of openings.",
    "Nearly all the government jobs are in Dutch and expect a high level of it. The main exception is bol.com, which has plenty of tech and data roles in English. If that's what you're after, search for \"engineer\" or \"data\" to skip the rest.",
  ],
  "warsaw": [
    "Warsaw has become a big engineering base for foreign companies, and the list reflects that. JetBrains posts the most here, followed by ICEYE, the Finnish satellite company, and then Netflix, Printify and Flix.",
    "Most of these roles are in English and a lot of them are pure engineering. B2B contracts are common in Poland, so if a posting gives a rate instead of a salary, that's probably why. It changes how tax and paid leave work, so ask which kind of contract it is.",
  ],
  "madrid": [
    "Madrid has a smaller list here, and a fairly international one. JetBrains is the biggest poster, followed by companies like Aircall and Alan that run their Spanish operations from the city, and ING, which has a large business in Spain.",
    "Salaries are lower than in Northern Europe, but so is the cost of living once you're outside the centre. Spanish usually matters for anything customer-facing. Engineering teams are more mixed.",
  ],
  "los-angeles": [
    "In Los Angeles the entertainment industry shows up even in a tech job list. Netflix posts by far the most, Sony Interactive Entertainment and the gaming company Xsolla are here too, and Reddit has an office in the city. Flexport adds a few logistics roles.",
    "California's pay transparency law applies, so salary ranges are listed. Do check where the office actually is, though. LA is big enough that \"Los Angeles\" can mean an hour and a half in traffic.",
  ],
  "sydney": [
    "Sydney is mostly regional offices of global companies, with Uber, Stripe, Databricks, Netflix and ServiceNow all hiring. SafetyCulture, the workplace inspection software company, is the biggest local name and posts more here than anyone else.",
    "Many of these jobs cover Australia and New Zealand, sometimes the wider Asia-Pacific region, so check the time zones you'd be working across. Visa sponsorship happens, but usually for senior or hard-to-fill roles.",
  ],
  "boston": [
    "Boston has an unusual mix. New Balance, which is headquartered here, posts the most jobs. Then there's biotech, led by Ginkgo Bioworks, and a run of younger AI startups like 7AI and Code Metal, next to the local offices of Anthropic and MongoDB.",
    "The biotech roles often want a PhD or lab experience, so read the requirements closely. Massachusetts has required salary ranges in job ads since late 2025.",
  ],
  "denver": [
    "Denver is a small list here, but a varied one. VF Corp, the company behind The North Face and Vans, has its headquarters in the area. Quindar, which makes software for operating satellites, is the most active startup, and Blissway and Candid Health also hire here.",
    "Colorado was one of the first states to require salary ranges in job ads, so you'll find pay listed on nearly everything.",
  ],
  "rotterdam": [
    "Rotterdam's listings lean towards retail and consumer brands. HEMA and MediaMarkt post a lot here: store jobs, but MediaMarkt also has plenty of finance, marketing and planning roles at its Dutch head office. Unilever hires interns here, and NN Group has data and engineering openings. There's some government work too, mostly from the Dienst Justitiële Inrichtingen, which runs the Dutch prison system.",
    "Most of the store and government jobs are in Dutch. If you're looking for work in English, Unilever and NN Group are the likeliest places to start.",
  ],
  "barcelona": [
    "On this site, Barcelona is a fintech city. SumUp, N26 and Vivid Money all hire here, along with Alan, Printify and Helsing. Many of these companies use Barcelona as a second engineering base next to their main office elsewhere in Europe.",
    "The work is mostly in English. Salaries are below what the same companies pay in Berlin or London, which is worth bringing up early if you're relocating.",
  ],
  "stockholm": [
    "Health tech leads in Stockholm right now. Neko Health, the body-scan company co-founded by Spotify's Daniel Ek, posts the most jobs, and Tandem Health, which makes AI tools for doctors, is right behind. Klarna and Spotify are both headquartered here and keep hiring.",
    "Swedish tech companies mostly work in English, so you can get a long way without Swedish. Housing is the hard part. Rental queues in Stockholm can take years, so ask whether the company helps with that.",
  ],
  "lisbon": [
    "Lisbon is one of the smaller lists here, mostly European companies with Portuguese offices. Flix posts the most, followed by Pleo, ICEYE, Printify, and the consultancies Roland Berger and EY.",
    "English is fine at most of them. Pay is lower than in Northern Europe, and so are many costs, although rent in Lisbon has gone up a lot in the last few years.",
  ],
  "vienna": [
    "Vienna has the shortest list on the site, so it's worth checking back now and then. Gropyus, which builds timber housing from factory-made parts, posts the most. ServiceNow and Sentry both have engineering teams here, and GoStudent, the tutoring platform, started in Vienna.",
    "Outside tech, German helps a lot. Austrian law also requires job ads to state the minimum salary, usually with a note that you could be paid more depending on experience.",
  ],
  "dubai": [
    "Dubai's list is short and mostly finance. Ziina, a local payments startup, posts the most. HSBC has a regional presence here, and a few tech companies like Cohere, Braze and Xsolla are building teams for the Middle East.",
    "There's no income tax in the UAE, and offers often include housing or flight allowances, so add those up when you compare. Most roles are on-site.",
  ],
};
