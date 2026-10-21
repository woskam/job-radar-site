// Hand-written text for the city + category pages (/jobs/{city}/{category}),
// rendered below the job list by functions/jobs/[city]/[category].js, keyed
// "city/category" as in assets/combos.js. Based on each combination's live
// listings in October 2026 (who's hiring, what kind of roles), so re-check
// now and then. Deliberately no exact job counts.
//
// `mentions` lists every company the text names, so that
// scripts/generate-combos.mjs can warn when one of them no longer shows
// up in the live listings and the text needs a refresh. Keep it in sync
// when editing the text.
//
// Same style as city-content.js: plain, specific, no em dashes. Doesn't
// repeat the city page's text; the page links there instead. A combination
// without an entry (e.g. a new one from the next generate-combos.mjs run)
// still renders for visitors, but is noindexed and left out of the sitemap
// until it has text.
export const COMBO_CONTENT = {
  "san-francisco/devtools": {
    mentions: ["Vercel", "Cursor", "Databricks", "Figma", "Sentry", "MongoDB"],
    text: [
      "Developer tools is the biggest category in San Francisco on this site, and it's led by two companies that build for programmers directly: Vercel, the hosting platform behind Next.js, and Cursor, the AI code editor. Databricks and Figma are the other big names, with Sentry and MongoDB adding a few more.",
      "Don't assume it's all engineering. Plenty of the roles are in product, design, account management and growth, at companies whose customers happen to be developers. If you've sold or marketed to technical buyers before, that experience counts for a lot here.",
    ],
  },
  "san-francisco/ai_ml": {
    mentions: ["Perplexity", "Scale AI", "Cohere", "ElevenLabs"],
    text: [
      "Two companies make up most of this list: Perplexity, the AI search engine, and Scale AI, which supplies training data and evaluations to the big model labs. Cohere and ElevenLabs have smaller teams in the city as well.",
      "Expect titles like Member of Technical Staff, which is how a lot of AI companies label their engineers. There are research internships for next summer too, and a fair number of finance, operations and growth roles for people who want to work in AI without training models.",
    ],
  },
  "san-francisco/saas": {
    mentions: ["Braze", "Intercom", "Zeta Global"],
    text: [
      "SaaS in San Francisco mostly means software that helps businesses talk to their customers. Braze, which brands use to message their users, has the most openings, followed by Intercom, the customer service platform, and the marketing company Zeta Global.",
      "The roles lean commercial: account executives, sales engineers, solutions architects. Many are senior, so this list is more useful if you've already done a few years in B2B software than if you're just starting out.",
    ],
  },
  "san-francisco/healthcare": {
    mentions: ["Candid Health", "Nourish", "Metriport", "Latent", "Vitalize"],
    text: [
      "Healthcare in San Francisco on this site is almost all young startups, not hospitals. Candid Health, which automates medical billing, is the busiest, alongside Nourish, which connects patients with dietitians, and Metriport, which builds open-source tools for sharing medical records. Latent, which automates insurance approvals for medication, and Vitalize, which helps hospitals with staffing, are hiring too.",
      "Most openings are for engineers and product people who want to fix the plumbing of American healthcare: billing, insurance, records. A few are remote within the US, which is more than you'll find in most other San Francisco categories.",
    ],
  },
  "new-york/devtools": {
    mentions: ["Figma", "Databricks", "Vercel", "MongoDB"],
    text: [
      "New York has a bigger developer tools scene than people expect. Figma has a large office here and posts the most, followed by Databricks and Vercel. MongoDB, which started in New York and still has its headquarters here, rounds it out.",
      "Sales and solutions roles are common, since a lot of these companies sell to the banks and media companies based in the city. There's still plenty of engineering too, including infrastructure and AI platform work.",
    ],
  },
  "new-york/fintech": {
    mentions: ["Stripe", "Titan", "Axle", "ARQ", "Shepherd", "Forter"],
    text: [
      "Stripe makes up about half of New York's fintech list, but the other half is worth a look. There's a long tail of smaller companies here, including Titan, Axle, ARQ, Shepherd and Forter, most of them startups with small teams.",
      "Product, sales and account executive roles outnumber pure engineering. You'll also see compliance jobs, like AML and BSA officers, which makes sense in a city with this many banks and regulators.",
    ],
  },
  "new-york/ai_ml": {
    mentions: ["Scale AI", "Parloa", "Peec AI", "Synthesia"],
    text: [
      "Scale AI posts the most AI jobs in New York, and after that the list gets interesting. Several of the other companies are European AI startups building out a US office here, like Parloa and Peec AI from Berlin and Synthesia from London.",
      "So a lot of the roles are early go-to-market jobs: first sales leads, solutions people, partnership managers. If you like building something from scratch inside a company that already has traction, these are good ones to look at.",
    ],
  },
  "new-york/healthcare": {
    mentions: ["Nourish", "Finni Health", "Candid Health", "Claim Health"],
    text: [
      "New York's healthcare list mixes tech jobs with hands-on care. Nourish, the dietitian platform, posts the most, and Finni Health, which supports autism therapy practices, has a lot of Behavior Technician openings. Candid Health is hiring for its billing software, along with smaller startups like Claim Health.",
      "So read the titles carefully. Some of these are clinical roles that need a certification, others are regular engineering, operations or partnership jobs, and a few are remote.",
    ],
  },
  "new-york/banking": {
    mentions: ["American Express", "HSBC", "JPMorgan", "ING"],
    text: [
      "This is the most traditional list in New York: American Express, HSBC and JPMorgan, plus a few roles at ING. Unlike most of the site, there are no startups here at all.",
      "Titles follow the banks' own ranks, so Vice President and Executive Director are mid-to-senior roles, not the C-suite. Expect more process and more interview rounds than at a fintech, and check whether the role is in Manhattan or at an office outside the city.",
    ],
  },
  "berlin/climate": {
    mentions: ["1KOMMA5", "Enpal", "Cloover", "autarc", "ib vogt", "trawa", "Galvany"],
    text: [
      "Berlin is the strongest city on the site for climate jobs. 1KOMMA5° and Enpal, two of Germany's biggest home solar and heat pump companies, account for a lot of it, and there's a long list of smaller startups behind them: Cloover, which finances energy upgrades, autarc, which builds software for heat pump installers, the solar developer ib vogt, trawa and Galvany.",
      "Many roles are in sales, operations and project management rather than engineering, and German comes up often because the customers are German homeowners. There are also plenty of internships and working student jobs, which makes this a decent place to start a climate career.",
    ],
  },
  "berlin/fintech": {
    mentions: ["Shine", "Scalable Capital", "SumUp", "PAIR Finance", "Smartbroker+", "getquin", "finanzen.net", "Zasta"],
    text: [
      "Berlin's fintech list is long and spread out, with no single company dominating. Shine, Scalable Capital, SumUp and PAIR Finance are among the busiest, along with investing apps like Smartbroker+ and getquin, the finance portal finanzen.net and the tax startup Zasta.",
      "A lot of these companies serve German customers, so some roles ask for German at C1, and a few say so right in the title. The engineering and product jobs are usually in English. There's also a noticeable number of AI roles and internships, which says something about where Berlin fintech is heading.",
    ],
  },
  "berlin/saas": {
    mentions: ["think-cell", "Statista", "Buena", "voiio", "Sharpist"],
    text: [
      "SaaS is where Berlin's B2B startups show up. think-cell, which makes the slide software consultants live in, has been in Berlin for years, and Statista has a team here too. Then there are younger companies like Buena for property management, voiio for employee family benefits and Sharpist for coaching.",
      "The mix leans towards sales, with lots of SDR and account executive roles, plus a fair amount of engineering. Language requirements vary a lot. Some teams sell across Europe and want Spanish or French, others sell in Germany and need German.",
    ],
  },
  "berlin/ai_ml": {
    mentions: ["Nebius", "Parloa", "Voize", "Merantix", "Stark"],
    text: [
      "Berlin's AI jobs are spread across dozens of companies, which makes it one of the best cities on the site if you want to work in AI outside the big labs. Nebius has a team here, and so do Parloa, which builds voice AI for customer service, and Voize, which lets nurses document care by speaking. Merantix runs an AI campus and starts companies of its own, and Stark builds autonomous drones for defence.",
      "Most roles are for engineers, from applied AI to classic platform work, but there are also solution engineers, sales and growth jobs. Founders associate roles pop up here too, if you want to join something very early.",
    ],
  },
  "berlin/healthtech": {
    mentions: ["Patient21", "Doctolib", "Redcare Pharmacy", "AMBOSS"],
    text: [
      "Health tech in Berlin covers a lot of ground. Patient21 runs its own medical and dental practices and posts the most, Doctolib has a large German team here, and Redcare Pharmacy hires for its online pharmacy. AMBOSS, the medical knowledge platform most German med students know, is a Berlin company too.",
      "Some of the jobs are in clinics or customer service and need German. Others are standard tech and business roles. If you come from healthcare yourself, this list has more openings for people with a medical background than most.",
    ],
  },
  "berlin/marketplace": {
    mentions: ["GetYourGuide", "HelloFresh", "Auto1", "idealo", "Scout24"],
    text: [
      "Some of Berlin's best-known companies are marketplaces, and they're all here. GetYourGuide, the booking platform for tours and activities, posts the most, followed by HelloFresh, the used car platform Auto1 and the price comparison site idealo. Scout24, the company behind ImmoScout24, adds a few more.",
      "These are bigger, more settled companies than most of Berlin's startups, so you'll see lots of manager and senior titles, especially in marketing, performance and category management. Working student jobs show up too, mostly in marketing and social media.",
    ],
  },
  "berlin/mobility": {
    mentions: ["Flix", "CarOnSale", "MILES", "Blacklane", "Distribusion"],
    text: [
      "Flix, the company behind FlixBus and FlixTrain, posts the most mobility jobs in Berlin. After that there's CarOnSale, an online auction for used cars, the car sharing company MILES, the chauffeur service Blacklane and Distribusion, which sells bus and train tickets through other platforms.",
      "Mobility is an operations-heavy business, and the titles show it: operations associates, safety roles, regional sales managers. Those often need German. The tech and partnership roles are usually in English.",
    ],
  },
  "berlin/devtools": {
    mentions: ["n8n", "NetBird", "Databricks", "Vercel", "Figma", "Snowflake"],
    text: [
      "Berlin's developer tools list is small, but it has two local success stories. n8n, the workflow automation tool, is headquartered here and hiring across the board, and NetBird, which builds open-source networking for remote teams, is growing too. The rest are the Berlin offices of Databricks, Vercel, Figma and Snowflake.",
      "Several roles are open to anyone in Europe, not only in Berlin, so check the location line. Forward deployed and solutions engineering roles are common, for people who like working directly with customers.",
    ],
  },
  "london/ai_ml": {
    mentions: ["Nebius", "Helsing", "Synthesia", "Scale AI", "Cohere", "ElevenLabs"],
    text: [
      "London has one of the broadest AI lists on the site. Nebius and Helsing post the most, Synthesia, the AI video company, is a London original, and Scale AI, Cohere and ElevenLabs all have teams here.",
      "Engineering dominates, from infrastructure to applied work on search and agents, but there are sales and partnership roles too. Helsing's jobs are defence work, and some of those need UK security clearance, so check before you apply.",
    ],
  },
  "london/devtools": {
    mentions: ["Databricks", "Snowflake", "Figma", "Vercel", "MongoDB"],
    text: [
      "London's developer tools jobs are mostly at the European offices of big US companies. Databricks posts the most, then Snowflake, Figma, Vercel and MongoDB.",
      "Because London is usually where these companies run Europe from, a lot of the roles are commercial: account executives, solution engineers and partner managers, often covering the whole region. Recruiting roles show up too, which is usually a sign a team is growing.",
    ],
  },
  "london/fintech": {
    mentions: ["Stripe", "SumUp", "Pleo", "Pliant", "Bunch", "CUBE", "ClaimSorted"],
    text: [
      "Fintech in London is a mix of Stripe, which has a big office here, and a lot of smaller companies. SumUp, Pleo and Pliant hire here, as do younger startups like Bunch, CUBE and ClaimSorted.",
      "Expect sales and account management roles alongside engineering, and a fair amount of compliance work. Titles like Consumer Duty Specialist are a UK thing, tied to the FCA's rules on treating customers fairly.",
    ],
  },
  "london/saas": {
    mentions: ["Intercom", "Braze", "Contentful", "Zeta Global", "Awin"],
    text: [
      "London's SaaS list is mostly European sales teams. Intercom has a big office here, and Braze, Contentful and Zeta Global all run commercial teams from the city. Awin, the affiliate marketing network, adds some roles of its own.",
      "Most openings are for account executives and other sales roles, often covering a specific market. A few ask for Dutch, German or another language, which is worth knowing if you speak one, since those roles tend to get fewer applicants.",
    ],
  },
  "london/banking": {
    mentions: ["Klarna", "HSBC", "American Express", "JPMorgan"],
    text: [
      "Banking jobs in London on this site come from a short list: Klarna, HSBC, American Express and JPMorgan. HSBC is headquartered here, and JPMorgan runs a big part of its European business from Canary Wharf.",
      "The roles skew senior and specialist: quant strategies, electronic trading, indirect tax, data science. If you're earlier in your career, the graduate programmes on the banks' own sites are usually a better route than these listings.",
    ],
  },
  "london/consulting": {
    mentions: ["BCG", "EY", "Accenture", "Roland Berger"],
    text: [
      "London's consulting jobs come from BCG, EY, Accenture and Roland Berger. Many of the EY roles are at EY-Parthenon, its strategy consulting arm, with a focus on financial services.",
      "These are mostly experienced hires at manager or director level. Graduate recruitment at these firms runs on its own yearly cycle, so if you're just starting out, their campus pages are the place to look.",
    ],
  },
  "london/healthcare": {
    mentions: ["Mytos", "Adaptyv", "Anima", "Healthtech 1"],
    text: [
      "This is a small and unusual list. Mytos builds automated labs for making cell therapies, Adaptyv runs a protein testing lab, and Anima and Healthtech 1 build software for clinics and GP practices.",
      "Several roles are about setting up UK operations, like Head of UK Operations or Head of UK Lab Operations, so these companies are early in London. A science background will help for most of them.",
    ],
  },
  "london/marketplace": {
    mentions: ["Airbnb", "Too Good To Go", "HelloFresh", "Malt"],
    text: [
      "Marketplace jobs in London come from a few well-known names: Airbnb, Too Good To Go, HelloFresh and Malt, the freelancer platform.",
      "It's a short list with a mix of engineering, product analytics and growth roles. Market Manager jobs, where you run a company's UK business more or less end to end, are a nice way into a marketplace if you come from operations or sales.",
    ],
  },
  "amsterdam/overheid": {
    mentions: ["UWV", "Gemeente Amsterdam", "Politie", "Ministerie van Defensie", "Belastingdienst"],
    text: [
      "Most government jobs in Amsterdam come from UWV, which runs unemployment benefits and work programmes, and from the Gemeente Amsterdam itself. The police, Defensie and the Belastingdienst add a few more.",
      "Almost everything here is in Dutch, and many postings say outright that C1 Dutch is required. The range is wide, from IT security and data engineering to warehouse work, inspectors and policy advisers. Government jobs also come with fixed salary scales, so the posting usually tells you exactly what you'll earn.",
    ],
  },
  "amsterdam/ecommerce": {
    mentions: ["HEMA", "Douglas", "MediaMarkt", "IKEA", "Wehkamp"],
    text: [
      "E-commerce in Amsterdam on this site is mostly retail. HEMA posts the most, and Douglas, MediaMarkt, IKEA and Wehkamp all have openings in the city.",
      "The majority are store jobs, like sales staff, cashiers and merchandisers, and they're in Dutch. There are a few office and tech roles mixed in, so try searching for \"engineer\" if that's what you're after.",
    ],
  },
  "amsterdam/consulting": {
    mentions: ["EY", "BCG", "Roland Berger", "Accenture", "PwC"],
    text: [
      "Amsterdam's consulting list is EY, BCG and Roland Berger, with the odd role at Accenture and PwC. A lot of the EY jobs are in technology strategy and transformation, often for banks.",
      "Most of these are at senior consultant level or above. Check the language line: some teams work in English for international clients, others are clear that they want Dutch speakers.",
    ],
  },
  "amsterdam/devtools": {
    mentions: ["Databricks", "Snowflake", "MongoDB", "Dash0"],
    text: [
      "Developer tools jobs in Amsterdam are mostly about data. Databricks has a big Benelux team here and posts the most, Snowflake and MongoDB have smaller ones, and Dash0, a young observability company, is hiring too.",
      "Almost all of it is customer-facing: account executives and solutions architects, many tied to specific industries like health insurance or financial services. If you have a data engineering background and like talking to customers, this is a good list.",
    ],
  },
  "amsterdam/banking": {
    mentions: ["ING", "bunq", "Citibank", "Knab"],
    text: [
      "Banking in Amsterdam is a mix of old and new. ING, the biggest Dutch bank, has its headquarters here, and so does bunq, the app-only bank. Citibank has a team in the city as well, and Knab adds a few roles.",
      "At bunq the working language is English and people come from all over. ING roles vary, some are English-only and some need Dutch. There are also internships, especially on the capital markets side.",
    ],
  },
  "munich/saas": {
    mentions: ["DataGuard", "Capmo", "Apaleo", "Secfix"],
    text: [
      "Munich has a solid group of B2B software startups. DataGuard, which helps companies with privacy and security compliance, posts the most, followed by Capmo, which builds software for construction projects, and Apaleo, a hotel management platform. Secfix, another compliance startup, rounds it out.",
      "The roles are mostly sales, solutions and engineering, and some are remote within Germany or Europe. Several of these teams sell across Europe, so a second language like French can be a real advantage.",
    ],
  },
  "munich/climate": {
    mentions: ["Marvel Fusion", "carbmee", "Octopus Energy"],
    text: [
      "Munich's climate list is small but unusual. Most of it is Marvel Fusion, which is working on laser-driven fusion power, so you'll see roles like fuel scientist and materials scientist that don't show up anywhere else on the site. carbmee, which helps companies track the carbon in their supply chains, and Octopus Energy hire here too.",
      "For the Marvel Fusion roles a physics or materials science background is usually expected. There are a few internships as well, for people coming from the business side.",
    ],
  },
  "paris/fintech": {
    mentions: ["Qonto", "Pennylane", "Shine", "Trade Republic", "SumUp", "Stripe"],
    text: [
      "Paris fintech is mostly about banking and accounting for small businesses. Qonto, Pennylane and Shine all build tools for freelancers and SMEs, and together they make up most of this list. Trade Republic, SumUp and Stripe have a handful of roles too.",
      "Operations jobs are common, including compliance work like AML analysis and debt collection, alongside product and engineering. Most need French. You'll also see apprenticeships, which in France are a normal way to combine study and work.",
    ],
  },
  "paris/saas": {
    mentions: ["Brevo", "Matera", "Insider One", "Braze"],
    text: [
      "Brevo, the email and marketing platform that used to be called Sendinblue, posts the most SaaS jobs in Paris. Matera, which helps apartment owners run their building without a traditional property manager, comes next, and Insider One and Braze have sales teams here.",
      "Many roles are business development and account management, and some are looking for specific languages, from Spanish to Hebrew. Creative and design roles show up too, which you don't always see in B2B software.",
    ],
  },
  "paris/marketplace": {
    mentions: ["Malt", "Vestiaire Collective", "HelloFresh", "Airbnb", "Too Good To Go"],
    text: [
      "Paris has two homegrown marketplaces at the top of this list: Malt, where companies hire freelancers, and Vestiaire Collective, for second-hand luxury fashion. HelloFresh, Airbnb and Too Good To Go have smaller teams here.",
      "There are a lot of internships, called stage in the postings, which is how many people start out in France. The full-time roles cover marketing, category management and analytics.",
    ],
  },
  "paris/devtools": {
    mentions: ["Databricks", "MongoDB", "Snowflake", "Figma"],
    text: [
      "Developer tools jobs in Paris are mostly the French teams of US companies: Databricks first, then MongoDB, Snowflake and Figma.",
      "Nearly all of them are customer-facing, account executives and solutions architects who sell to French enterprises, banks and insurers. Fluent French is effectively required, even when the posting is written in English.",
    ],
  },
  "paris/consulting": {
    mentions: ["EY", "Roland Berger", "Accenture", "BCG"],
    text: [
      "Consulting in Paris means EY, Roland Berger, Accenture and BCG. EY has the most openings, and many of its postings are already for 2027 start dates.",
      "The postings follow the French format, with the minimum years of experience in the title and F/H after the job name. Junior consultant roles exist too, and French is expected for nearly all of them.",
    ],
  },
  "singapore/devtools": {
    mentions: ["Databricks", "Cursor", "MongoDB", "Elastic", "Snowflake"],
    text: [
      "In Singapore, developer tools jobs are regional jobs. Databricks posts the most, and Cursor, MongoDB, Elastic and Snowflake all run parts of their Asia-Pacific business from here.",
      "Look closely at the territory in each title. Many roles cover one market like Vietnam, Thailand or Greater China, and some expect you to speak the local language. Public sector solution engineering is a niche worth noticing too.",
    ],
  },
  "chicago/devtools": {
    mentions: ["Databricks", "MongoDB", "Snowflake", "Temporal"],
    text: [
      "Chicago's developer tools list comes from four companies: Databricks, MongoDB, Snowflake and Temporal. Most of them use Chicago as a base for selling to the big enterprises in the Midwest.",
      "That's why the roles lean towards solutions engineering, account management and partnerships, with the odd legal or programme management role. If you've done technical sales before, this is a good list.",
    ],
  },
  "bengaluru/fintech": {
    mentions: ["Stripe", "Razorpay", "Tide", "AiPrise", "Prodigal"],
    text: [
      "Stripe has a large engineering and operations team in Bengaluru, and it makes up about half of this list. Razorpay, the Indian payments company, is the main local name, with Tide, AiPrise and Prodigal adding more.",
      "Besides engineering there's a lot of operations and finance work here: verification, accounting and data analyst roles that support teams around the world. Those can be a good way into a global company without a computer science degree.",
    ],
  },
  "bengaluru/consulting": {
    mentions: ["EY", "Accenture", "PwC"],
    text: [
      "Consulting jobs in Bengaluru come from EY, Accenture and PwC, and most of them are technical. Expect DevOps, cloud and development roles, many of them in the firms' global capability centres that serve clients abroad.",
      "The titles can be hard to read, with internal codes and team names mixed in. GCC stands for global capability centre, and the useful part is usually in the middle, for example \"SRE / DevOps Engineer (Azure)\".",
    ],
  },
  "toronto/devtools": {
    mentions: ["MongoDB", "Sentry", "Databricks", "Snowflake"],
    text: [
      "Toronto is an engineering city for developer tools companies. MongoDB posts the most, Sentry has a sizeable team here, and Databricks and Snowflake hire too.",
      "Unlike most cities on the site, many of these are actual software engineering jobs, on things like storage and streaming, rather than sales. Solutions architects are in demand as well, especially for financial services clients.",
    ],
  },
  "hamburg/healthtech": {
    mentions: ["Patient21", "Avi Medical", "Redcare Pharmacy"],
    text: [
      "Health tech in Hamburg is more about clinics than code. Patient21 and Avi Medical both run medical practices in the city, and many of their openings are for dental assistants, reception staff and other clinic roles. Redcare Pharmacy is the other big name.",
      "That means German is required for most of these jobs, and a healthcare qualification often is too. The handful of tech and partnership roles are the exception.",
    ],
  },
  "austin/devtools": {
    mentions: ["MongoDB", "Vercel", "Databricks", "Cursor"],
    text: [
      "MongoDB has a big office in Austin and posts the most developer tools jobs here, with Vercel close behind. Databricks and Cursor have a few openings too.",
      "There's a good mix of infrastructure and reliability engineering alongside the usual sales roles. Senior titles are common, so this list suits people with some experience behind them.",
    ],
  },
  "austin/industrials": {
    mentions: ["Skyways", "American Housing Corp", "9 Mothers"],
    text: [
      "Austin's industrial list is about building physical things. Skyways makes cargo drones, American Housing Corp builds row houses in its own Austin factory, and 9 Mothers makes AI-guided turrets that defend against small drones.",
      "Nearly all of these are hardware engineering roles: radar, reliability, manufacturing and optomechanical engineers. If you come from aerospace or manufacturing and want to try a startup, this is a good place to look.",
    ],
  },
  "tokyo/devtools": {
    mentions: ["Databricks", "Snowflake", "Elastic", "MongoDB", "Figma"],
    text: [
      "Developer tools jobs in Tokyo come mostly from Databricks and Snowflake, with Elastic, MongoDB and Figma adding a few. These are Japan sales and support teams, selling to large Japanese companies, including telecom operators.",
      "Business-level Japanese is expected for nearly all of them. Solutions architect and customer success roles are common, and people who combine the technical side with fluent Japanese are hard to find, which works in your favour if you're one of them.",
    ],
  },
  "utrecht/overheid": {
    mentions: ["Ministerie van Defensie", "Belastingdienst", "Openbaar Ministerie", "Rijkswaterstaat", "KVK"],
    text: [
      "Utrecht is the busiest city on the site for Dutch government jobs. Defensie posts the most, and the Belastingdienst, the Openbaar Ministerie and Rijkswaterstaat all have big offices in the city. KVK even has its head office here.",
      "The range is wide: IT and systems management, policy advice, finance, legal and management support. Nearly all of it needs Dutch. Defensie jobs often need a security screening, so expect the hiring process to take a bit longer.",
    ],
  },
  "utrecht/ecommerce": {
    mentions: ["bol.com", "HEMA", "MediaMarkt", "Douglas", "IKEA"],
    text: [
      "bol.com, the biggest online shop in the Netherlands, is headquartered in Utrecht and posts the most e-commerce jobs here. HEMA is next, with MediaMarkt, Douglas and IKEA adding a few.",
      "A lot of the bol.com openings are internships, from marketing and promotions to supply chain, which makes this one of the better lists for students. The buyer and category roles are interesting too, if you like retail but don't want to work in a store.",
    ],
  },
  "madrid/fintech": {
    mentions: ["Shine", "N26", "Pleo", "Taxfix", "SumUp"],
    text: [
      "Madrid's fintech jobs come from European companies with Spanish teams. Shine posts the most, followed by N26, Pleo, Taxfix and SumUp.",
      "Many roles are about the Spanish market itself, like Spanish-speaking account executives and partnership managers, and there are some people and recruiting roles too. It's a short list, so setting up an alert is easier than checking back every day.",
    ],
  },
  "sydney/devtools": {
    mentions: ["Databricks", "MongoDB", "Snowflake", "Figma", "Vercel"],
    text: [
      "Developer tools jobs in Sydney are the Australian teams of Databricks, MongoDB, Snowflake, Figma and Vercel.",
      "They're mostly technical customer roles: solution engineers, support engineers and forward deployed engineers who work closely with clients. Because of the time zone, many of these teams also cover New Zealand and parts of Asia.",
    ],
  },
  "sydney/saas": {
    mentions: ["Braze", "Intercom", "Insider One"],
    text: [
      "Braze, Intercom and Insider One all run their Australian sales from Sydney, and that's what this list is: account executives, relationship managers and solutions consultants.",
      "Several roles are aimed at specific customer groups, like financial services or mid-market companies, so read the title to see who you'd be selling to.",
    ],
  },
  "boston/devtools": {
    mentions: ["MongoDB", "Databricks", "n8n", "Dash0"],
    text: [
      "Boston's developer tools jobs come from MongoDB and Databricks, plus a few from n8n and Dash0. Most are sales and solutions roles covering the East Coast.",
      "The same companies often post similar roles in New York, so if you're open to either city, it's worth checking both lists.",
    ],
  },
  "denver/devtools": {
    mentions: ["Databricks", "MongoDB", "Snowflake"],
    text: [
      "Denver's developer tools list is Databricks, MongoDB and Snowflake. The roles are a mix of sales, solutions architecture and support functions like legal, project management and accounting.",
      "It's a small list, so setting up an alert for it is easier than checking back every few days.",
    ],
  },
  "rotterdam/ecommerce": {
    mentions: ["HEMA", "MediaMarkt", "Douglas"],
    text: [
      "In Rotterdam, e-commerce means HEMA, MediaMarkt and Douglas. MediaMarkt's Dutch head office is in the city, so alongside the store jobs you'll find marketing, finance and sales management roles.",
      "The store jobs, like cashiers, sales staff and team leaders, are all in Dutch, and many are part-time or weekend work. Good to know if you're studying in Rotterdam and looking for something next to it.",
    ],
  },
  "barcelona/fintech": {
    mentions: ["SumUp", "Vivid Money", "N26", "Qonto", "Stripe", "Pennylane"],
    text: [
      "Barcelona's fintech list comes from a group of European companies with big teams here: SumUp, Vivid Money, N26 and Qonto, plus a few roles at Stripe and Pennylane.",
      "A surprising number of these jobs are for German speakers, in customer support, KYC and sales, because Barcelona is where these companies serve German customers from. If you speak German, Spanish and English, you're in a good spot.",
    ],
  },
};
