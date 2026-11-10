/**
 * VyperX - Growth Systems Knowledge Base
 * Official Knowledge Repository for Tasha AI
 * Sourced directly from https://vyperx.in/ and growth system operations.
 */

export interface KnowledgeTopic {
  id: string;
  category: 'company' | 'service' | 'pricing' | 'process' | 'platform' | 'results' | 'generic' | 'faq' | 'smalltalk';
  keywords: string[];
  patterns?: RegExp[];
  title: string;
  content: string;
  suggestions?: string[];
  includeCTA?: boolean;
}

export const VYPERX_GENERAL_INFO = {
  name: "VyperX",
  fullName: "VyperX - Growth Systems",
  tagline: "Full-Service Growth Agency & Growth Partner for Ambitious Brands",
  websiteUrl: "https://vyperx.in/",
  contactUrl: "https://vyperx.in/#contact",
  formUrl: "https://vyperx-forms.netlify.app/tasha",
  email: "contact@vyperx.in",
  phone: "+91 70447 00987",
  location: "Rajarhat / Newtown, Kolkata, West Bengal, India",
  coreValues: [
    "Move Fast — rapid execution, continuous testing, fast creative turnarounds",
    "Client Obsessed — focused on measurable revenue, conversions, and ROI",
    "Team First — dedicated growth strategists and creatives working as your internal team",
    "Creative Edge — scroll-stopping hooks, high-converting scripts, and authentic UGC"
  ],
  corePillars: [
    "UGC & Performance Content Creation",
    "High-Converting Websites & E-Commerce Stores",
    "Social Media Management & Community Growth",
    "Performance Marketing & Meta Ad Systems"
  ]
};

export const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // ==========================================
  // 1. GREETINGS & SMALL TALK
  // ==========================================
  {
    id: "greeting",
    category: "smalltalk",
    keywords: ["hi", "hello", "hey", "hola", "namaste", "greetings", "good morning", "good afternoon", "good evening"],
    patterns: [/^(hi|hello|hey|namaste|hola)(\s+tasha)?[\s!.]*$/i, /^good\s+(morning|afternoon|evening)/i],
    title: "Greeting & Welcome",
    content: `Hey there! I’m **Tasha**, your VyperX growth partner. 👋

I help ambitious brands scale with consistent high-quality social media content, high-converting websites, UGC video packs, and performance marketing systems.

What’s your main goal right now?
• Getting more qualified leads & sales
• Building or upgrading an e-commerce website
• Scaling social media & UGC content
• Running high-ROAS Meta ads`,
    suggestions: [
      "What services do you offer?",
      "Show me your pricing",
      "How does the growth process work?",
      "Which platforms do you support?"
    ],
    includeCTA: false
  },
  {
    id: "how-are-you",
    category: "smalltalk",
    keywords: ["how are you", "how are you doing", "hows it going", "how is it going", "how are things", "whats up", "what's up"],
    patterns: [/how\s+(are\s+you|is\s+it\s+going)/i, /what'?s\s+up/i],
    title: "How Are You",
    content: `Doing fantastic and energized to help you grow! 🚀

At **VyperX**, we're busy crafting high-converting growth systems, producing UGC videos, and scaling ad campaigns for our partner brands. 

How can I help you take your business to the next level today?`,
    suggestions: [
      "Tell me about VyperX",
      "What are your pricing plans?",
      "Can you audit my website?",
      "How do Meta ads work?"
    ],
    includeCTA: false
  },
  {
    id: "who-are-you",
    category: "smalltalk",
    keywords: ["who are you", "what is your name", "what are you", "who is tasha", "introduce yourself", "are you an ai", "are you a bot"],
    patterns: [/who\s+are\s+you/i, /what\s+is\s+your\s+name/i, /are\s+you\s+(an?\s+)?ai/i],
    title: "Who is Tasha?",
    content: `I’m **Tasha**, the AI Growth Partner at **VyperX** (https://vyperx.in/). 

My mission is to help founders, e-commerce brands, and businesses navigate our growth systems. I can answer questions about our services, break down our pricing and monthly process, explain digital marketing concepts (like ROAS and UGC), and connect you directly with our strategy team!

You can ask me anything about:
1. **VyperX Growth Systems** (Websites, UGC, Ads, Social Media)
2. **Pricing & Packages** (Starting from ₹5,999)
3. **Platform Expertise** (Meta, Shopify, Google Ads, etc.)
4. **General Marketing & Scaling Strategy**`,
    suggestions: [
      "What is VyperX?",
      "Show me your pricing",
      "How do I book a call?",
      "What makes VyperX different?"
    ],
    includeCTA: false
  },
  {
    id: "tell-a-joke",
    category: "smalltalk",
    keywords: ["joke", "tell me a joke", "make me laugh", "funny"],
    patterns: [/tell\s+me\s+a\s+joke/i, /make\s+me\s+laugh/i],
    title: "Marketing Joke",
    content: `Why did the marketer break up with the graphic designer?

*Because they couldn't find common ground on the margins — and the relationship had zero click-through rate!* 😂

Need a boost that actually converts? Let’s talk growth systems!`,
    suggestions: [
      "Show me pricing",
      "What services do you offer?",
      "Tell me about UGC packs"
    ],
    includeCTA: false
  },
  {
    id: "thanks",
    category: "smalltalk",
    keywords: ["thanks", "thank you", "thx", "appreciate it", "awesome", "great help", "super"],
    patterns: [/^thank(s|\s+you)/i, /^thx/i, /^appreciate\s+it/i],
    title: "Gratitude",
    content: `You're very welcome! 😊 Glad I could help. 

Whenever you're ready to take the next step for your brand, remember you can click the **Phone icon** at the top right to submit your details or book a strategy session with our team!`,
    suggestions: [
      "How do I book a call?",
      "Tell me about your pricing",
      "Show case studies"
    ],
    includeCTA: false
  },
  {
    id: "bye",
    category: "smalltalk",
    keywords: ["bye", "goodbye", "see you", "cya", "catch you later", "talk soon"],
    patterns: [/^(bye|goodbye|see\s+ya|cya)/i],
    title: "Farewell",
    content: `Have a wonderful day ahead and happy scaling! 👋

Whenever you want to chat growth, explore UGC, or build high-converting funnels, I'll be right here. You can also reach our team anytime at **contact@vyperx.in** or call **+91 70447 00987**.`,
    suggestions: [
      "Visit vyperx.in",
      "Book a consultation call"
    ],
    includeCTA: false
  },

  // ==========================================
  // 2. VYPERX ABOUT & CORE PHILOSOPHY
  // ==========================================
  {
    id: "about-vyperx",
    category: "company",
    keywords: [
      "about vyperx", "what is vyperx", "tell me about vyperx", "who is vyperx", 
      "what do you do", "what does vyperx do", "company overview", "agency"
    ],
    patterns: [/about\s+vyperx/i, /what\s+is\s+vyperx/i, /what\s+does\s+vyperx\s+do/i],
    title: "About VyperX",
    content: `**VyperX** (https://vyperx.in/) is a full-service growth agency and dedicated **Growth Partner** based in Kolkata, India.

Instead of acting as a traditional agency that sells disconnected services or forcing brands to manage 3–4 separate freelancers, VyperX builds unified **Growth Systems** combining:
1. **UGC Content Creation & Video Editing** (Performance-focused ad creatives)
2. **High-Converting Websites** (Fast, mobile-first Shopify & custom stores)
3. **Performance Marketing (Meta Ads)** (Scalable paid acquisition engines)
4. **Social Media Management** (Strategic consistency & community engagement)

We replace vanity metrics (likes, impressions) with commercial outcomes: **leads, conversion rate, ROAS, and net revenue growth**.`,
    suggestions: [
      "Why choose VyperX over other agencies?",
      "What are your core values?",
      "Show me your pricing",
      "Where are you located?"
    ],
    includeCTA: true
  },
  {
    id: "why-vyperx",
    category: "company",
    keywords: [
      "why vyperx", "why choose vyperx", "difference", "what makes you different", 
      "why should i hire you", "competitors", "advantage", "unique"
    ],
    patterns: [/why\s+(choose\s+)?vyperx/i, /what\s+makes\s+you\s+different/i],
    title: "Why Choose VyperX?",
    content: `Here is why ambitious brands choose **VyperX** over traditional agencies and fragmented freelance setups:

1. **Integrated Growth System, One Roof:** You don't have to hire a copywriter, video editor, Shopify developer, and ad manager separately. We unify the entire pipeline.
2. **Revenue & ROAS Over Vanity Metrics:** We don't report "reach" and "impressions" to hide poor results. We track actual conversions, cost per acquisition (CAC), and return on ad spend.
3. **Dedicated Manager & Weekly Reviews:** Every partner brand gets a dedicated growth manager and weekly performance reviews with transparent data.
4. **Agile & Trend-Driven:** We adapt quickly to changing platform algorithms, test dozens of creative hooks, and prevent creative fatigue before it kills your ROAS.`,
    suggestions: [
      "What is your monthly process?",
      "Show client case studies",
      "What are your pricing plans?"
    ],
    includeCTA: true
  },
  {
    id: "core-values",
    category: "company",
    keywords: ["core values", "values", "principles", "culture", "philosophy"],
    patterns: [/core\s+values/i, /what\s+are\s+your\s+values/i],
    title: "VyperX Core Values",
    content: `At **VyperX**, everything we build is driven by four core values:

• **Move Fast:** Rapid deployment, fast creative iterations, and agility to stay ahead of market trends.
• **Client Obsessed:** We tie our success directly to your revenue, lead flow, and business growth.
• **Team First:** High-level strategists, designers, and video editors working collaboratively for your brand.
• **Creative Edge:** Moving past boring corporate ads to create authentic, scroll-stopping content that converts.`,
    suggestions: [
      "Tell me about VyperX services",
      "Show me client results",
      "Book a discovery call"
    ],
    includeCTA: false
  },
  {
    id: "contact-info",
    category: "company",
    keywords: [
      "contact", "email", "phone", "number", "call", "address", "location", "office", 
      "where are you located", "kolkata", "rajarhat", "reach out", "support", "whatsapp"
    ],
    patterns: [/how\s+to\s+contact/i, /what\s+is\s+your\s+(email|phone|number|address)/i, /where\s+are\s+you\s+located/i],
    title: "Contact Information",
    content: `You can reach the **VyperX** team directly through any of these channels:

• **Email:** [contact@vyperx.in](mailto:contact@vyperx.in)
• **Phone & WhatsApp:** [+91 70447 00987](tel:+917044700987)
• **Location:** Rajarhat / Newtown, Kolkata, West Bengal, India
• **Official Website:** [vyperx.in](https://vyperx.in/)
• **Book a Call:** [vyperx.in/#contact](https://vyperx.in/#contact)

💡 **Quick tip:** You can also click the **Phone icon** at the top right header right now to open our embedded Growth Form and send your requirements in seconds!`,
    suggestions: [
      "Open the growth form",
      "Book a call online",
      "What are your pricing plans?"
    ],
    includeCTA: false
  },

  // ==========================================
  // 3. PRICING & PACKAGES
  // ==========================================
  {
    id: "pricing-overview",
    category: "pricing",
    keywords: [
      "price", "cost", "pricing", "plans", "packages", "rates", "how much", 
      "fees", "charges", "budget", "inr", "rs"
    ],
    patterns: [/how\s+much\s+(does\s+it\s+)?cost/i, /what\s+are\s+your\s+price(s|\s+plans)?/i],
    title: "VyperX Pricing & Plans",
    content: `Here is a clear breakdown of our core packages and transparent pricing:

• **Social Media Management:** **₹15,000 to ₹35,000 / month**
  Full monthly content calendar, graphic design (carousels, banners), Reel scripts, and active daily community engagement (comments & DMs).

• **High-Converting Websites:** Starting at **₹45,000** (one-time build)
  Custom or Shopify 2.0 e-commerce storefront, mobile-first design, speed optimization, conversion rate optimization (CRO), and seamless checkout.

• **UGC Video Packs:** Starting at **₹5,999**
  Authentic creator matching, bespoke scriptwriting, A/B hook testing, and professional video editing for Meta Ads & Reels.

• **Performance Marketing (Meta Ads):**
  Tiered management structured according to your monthly ad spend (from ₹50K/mo test phase to ₹5L+/mo scaling systems).

Every plan includes dedicated account management and weekly performance reviews.`,
    suggestions: [
      "Tell me more about UGC video packs",
      "What is included in website development?",
      "What is included in social media plans?",
      "How do I get started?"
    ],
    includeCTA: true
  },
  {
    id: "pricing-social-media",
    category: "pricing",
    keywords: ["social media pricing", "instagram pricing", "social media cost", "15000", "35000"],
    patterns: [/social\s+media\s+(price|pricing|cost)/i],
    title: "Social Media Management Pricing",
    content: `Our **Social Media Management** plans range from **₹15,000 to ₹35,000/month** depending on your posting cadence and growth stage.

**What is included:**
• Monthly content strategy & brand alignment
• Complete 30-day content calendar
• High-engagement graphics & educational carousels
• Viral Reel scripts with trending audio recommendations
• **Daily community management:** Actively replying to comments and direct messages (DMs) to nurture prospective buyers
• Monthly conversion & growth reporting`,
    suggestions: [
      "Do you manage Facebook as well?",
      "Can we combine social media with ads?",
      "Book a consultation call"
    ],
    includeCTA: true
  },
  {
    id: "pricing-website",
    category: "pricing",
    keywords: ["website pricing", "website cost", "shopify cost", "store price", "45000"],
    patterns: [/website\s+(price|pricing|cost)/i, /store\s+(price|pricing|cost)/i],
    title: "Website Development Pricing",
    content: `Our **High-Converting Website Development** starts at **₹45,000**.

**Why our websites are built differently:**
• **Conversion-Focused Architecture:** Every section is mapped to turn cold visitors into paying buyers.
• **Lightning Speed:** Optimized for sub-2-second load times to prevent bounce rate.
• **Mobile-First UX:** Seamless touch-friendly navigation and one-page checkout.
• **Platforms:** Shopify, Shopify 2.0, WooCommerce, or custom Next.js web apps.
• **Integrations:** Meta Pixel, Google Analytics 4, WhatsApp chat, and payment gateways (Razorpay, Cashfree, Stripe, COD).`,
    suggestions: [
      "Can you migrate my existing store?",
      "How long does website delivery take?",
      "Show website case studies"
    ],
    includeCTA: true
  },
  {
    id: "pricing-ugc",
    category: "pricing",
    keywords: ["ugc pricing", "ugc cost", "video pack price", "5999", "video pricing"],
    patterns: [/ugc\s+(price|pricing|cost)/i, /video\s+pack/i],
    title: "UGC Video Pack Pricing",
    content: `Our **UGC (User-Generated Content) Video Packs** start at **₹5,999**.

**What you receive:**
• Vetted creator matching tailored to your product demographic
• Conversion-tested scriptwriting with multiple hook variations
• High-quality filming and native UGC styling
• Professional video editing with trending cuts, captions, and sound design
• Delivered ready-to-run for Meta Ads, Instagram Reels, and YouTube Shorts`,
    suggestions: [
      "Why is UGC better than traditional ads?",
      "How long does UGC production take?",
      "Book UGC package"
    ],
    includeCTA: true
  },

  // ==========================================
  // 4. CORE SERVICES IN DETAIL
  // ==========================================
  {
    id: "service-ugc",
    category: "service",
    keywords: [
      "ugc", "user generated content", "creator video", "ad video", "video ads", 
      "tiktok ads", "reels ads", "video editing", "scripting", "hooks"
    ],
    patterns: [/what\s+is\s+ugc/i, /user\s+generated\s+content/i, /ugc\s+video/i],
    title: "UGC & Video Production",
    content: `**UGC (User Generated Content)** is the #1 ad format driving D2C e-commerce growth today because customers trust real people more than polished studio ads.

**How VyperX handles UGC:**
1. **Creator Matching:** We pair your brand with creators who naturally fit your audience demographic.
2. **Hook Testing (A/B):** We write 3–5 high-impact hooks for every video to capture attention within the first 3 seconds.
3. **Persuasive Scripting:** Problem-Agitate-Solve (PAS) frameworks that highlight customer pain points and showcase your product as the solution.
4. **Platform-Native Video Editing:** Dynamic pacing, bold animated captions, and audio designed specifically for mobile feeds.

Packs start at **₹5,999**.`,
    suggestions: [
      "How many UGC videos are in a pack?",
      "Can I review the scripts first?",
      "Combine UGC with Meta Ads"
    ],
    includeCTA: true
  },
  {
    id: "service-website",
    category: "service",
    keywords: [
      "website", "web design", "web development", "shopify", "store", 
      "ecommerce", "online shop", "redesign", "woocommerce"
    ],
    patterns: [/website\s+development/i, /shopify\s+store/i, /build\s+a\s+website/i],
    title: "High-Converting Websites & E-Commerce",
    content: `At **VyperX**, we don't just build "pretty" websites; we build **conversion machines**. A beautiful site that doesn't convert is just an expensive digital brochure.

**Key features of our website systems:**
• **Shopify 2.0 & Custom Architecture:** Easy-to-manage backend with customized frontend experiences.
• **High-Converting Product Pages:** Clear benefit bullets, customer reviews, urgency triggers, and sticky Add-to-Cart buttons.
• **Frictionless Checkout:** Fast 1-click checkout options and optimized payment gateways.
• **Speed & SEO:** Clean code and image compression delivering fast load times on 4G/5G mobile connections.
• **Full Pixel Integration:** Meta Pixel, Conversions API (CAPI), and GA4 event tracking setup from day one.

Starts at **₹45,000**.`,
    suggestions: [
      "How long does it take to build?",
      "Do you build on Shopify or WordPress?",
      "Can I get a website audit?"
    ],
    includeCTA: true
  },
  {
    id: "service-social-media",
    category: "service",
    keywords: [
      "social media", "instagram", "instagram management", "feed", 
      "reels", "carousels", "posting", "community management", "dms"
    ],
    patterns: [/social\s+media\s+management/i, /instagram\s+growth/i],
    title: "Social Media Management",
    content: `Our **Social Media Growth System** turns your brand's social profiles into an active client acquisition and retention engine.

**Our complete monthly scope:**
• **Strategic Roadmap:** Identifying your brand voice, content pillars, and competitive positioning.
• **30-Day Content Calendar:** Planned post ideas, carousels, and video concepts approved ahead of time.
• **Graphic Design & Reels:** Eye-catching visual assets and trend-adapted video scripts.
• **Community Engagement:** We monitor and respond to comments and inbound DMs so prospective buyers never wait.
• **Performance Analytics:** Measuring audience growth, engagement rates, and referral traffic.

Plans range from **₹15,000 to ₹35,000 / month**.`,
    suggestions: [
      "How many posts per week?",
      "Do you handle DMs and comments?",
      "Show me client results"
    ],
    includeCTA: true
  },
  {
    id: "service-meta-ads",
    category: "service",
    keywords: [
      "meta ads", "facebook ads", "instagram ads", "paid ads", "performance marketing", 
      "media buying", "ad campaigns", "roas", "scaling ads"
    ],
    patterns: [/meta\s+ads/i, /facebook\s+ads/i, /performance\s+marketing/i],
    title: "Performance Marketing & Meta Ads",
    content: `Paid advertising without a system burns cash. VyperX's **Performance Marketing Engine** is designed to scale your revenue predictably.

**Our campaign framework:**
• **Top of Funnel (TOF - Prospecting):** Broad and lookalike targeting testing high-converting UGC angles.
• **Middle of Funnel (MOF - Consideration):** Re-engaging social visitors and video viewers with product demonstrations and social proof.
• **Bottom of Funnel (BOF - Retargeting):** Dynamic product ads (DPA) targeting abandoned carts with specific offers.
• **Server-Side Tracking (CAPI):** Full Meta Conversions API setup to bypass iOS 14+ tracking loss.
• **Creative Iteration:** Constantly rotating new hooks and creatives to combat ad fatigue and maintain profitable ROAS.`,
    suggestions: [
      "What ROAS can I expect?",
      "What minimum budget is needed for ads?",
      "Book an ad strategy session"
    ],
    includeCTA: true
  },

  // ==========================================
  // 5. THE MONTHLY PROCESS & HOW IT WORKS
  // ==========================================
  {
    id: "process-how-it-works",
    category: "process",
    keywords: [
      "process", "how it works", "how do you work", "monthly process", "workflow", 
      "timeline", "steps", "onboarding", "how long", "delivery time"
    ],
    patterns: [/how\s+(does\s+it|do\s+you)\s+work/i, /what\s+is\s+the\s+process/i, /what\s+is\s+your\s+workflow/i],
    title: "The VyperX Monthly Growth Rhythm",
    content: `Here is the structured monthly workflow we execute for our partner brands:

• **Week 1: Onboarding & Strategy**
  We deep dive into your brand, target audience, competitors, and commercial constraints to draft your custom growth roadmap.

• **Weeks 1–2: Content Calendar & Scripting**
  We develop a comprehensive 30-day content calendar including post themes, carousel designs, reel scripts, and ad angles for your approval.

• **Weeks 2–3: Content Production & Editing**
  Our team executes UGC shoots, creates high-impact graphic design, and produces professional video edits.

• **Weeks 3–4: Publishing & Ad Campaigns Live**
  Content goes live according to the approved schedule, and Meta ad campaigns are launched with full tracking.

• **Ongoing: Community Management & Engagement**
  Daily active engagement—handling incoming comments and direct messages (DMs) to nurture prospective buyers.

• **Month-End: Performance Reporting & Optimization**
  Transparent reporting on revenue, leads, conversions, and ROAS, followed by strategic refinements for the upcoming month.`,
    suggestions: [
      "How fast is onboarding?",
      "What do you need from me to start?",
      "Show pricing plans"
    ],
    includeCTA: true
  },
  {
    id: "timeline-turnaround",
    category: "process",
    keywords: ["timeline", "turnaround", "how fast", "how long does it take", "delivery"],
    patterns: [/how\s+long\s+does\s+it\s+take/i, /turnaround\s+time/i],
    title: "Project Timelines",
    content: `Here are our typical turnaround timelines:

• **Social Media Management:** Onboarding takes 3–5 business days; content starts rolling live by Week 2.
• **High-Converting Websites:** Usually completed within **2 to 3 weeks** from content approval to live launch.
• **UGC Video Packs:** Completed within **7 to 10 business days** including script approval, creator filming, and editing.
• **Meta Ad Campaigns:** Account setup, pixel audit, and campaign launch take **5 to 7 days**.`,
    suggestions: [
      "How do we get started?",
      "Show pricing plans",
      "Talk to our team"
    ],
    includeCTA: true
  },

  // ==========================================
  // 6. CLIENTS, CASE STUDIES & RESULTS
  // ==========================================
  {
    id: "case-studies-results",
    category: "results",
    keywords: [
      "case studies", "clients", "portfolio", "results", "experience", "past work", 
      "proof", "srinitas", "devaki", "examples", "success stories", "roi"
    ],
    patterns: [/case\s+stud(y|ies)/i, /past\s+(work|clients|results)/i, /who\s+have\s+you\s+worked\s+with/i],
    title: "Client Case Studies & Verified Results",
    content: `VyperX has partnered with ambitious brands across e-commerce, fashion, education, and local services. Some highlighted successes include:

• **Srinita's Fashion & Clothing (Apparel & Lifestyle):**
  *Challenge:* Low digital engagement and high reliance on traditional sales.
  *Solution:* Rolled out authentic fashion UGC video packs, weekly reel scripting, and a structured social media strategy.
  *Result:* **+320% increase in lead engagement** and dramatic surge in direct customer inquiries.

• **Devaki Memorial School (Education Institution):**
  *Challenge:* Outdated web architecture and lack of automated inquiry collection.
  *Solution:* End-to-end modern website redesign and complete digital presence management.
  *Result:* Streamlined parent onboarding and significantly increased admission inquiries.

• **D2C Brands & Startups:**
  Delivering scalable customer acquisition engines with positive ROAS and reduced customer acquisition costs.`,
    suggestions: [
      "Can you achieve similar results for my brand?",
      "What is your pricing?",
      "Book a discovery call"
    ],
    includeCTA: true
  },

  // ==========================================
  // 7. PLATFORM SPECIFIC QUESTIONS
  // ==========================================
  {
    id: "platform-overview",
    category: "platform",
    keywords: [
      "platforms", "what platforms", "platforms you support", "supported platforms", 
      "channels", "which platforms", "tech stack", "technologies", "ecosystem"
    ],
    patterns: [/(which|what)\s+platforms/i, /platforms\s+(do\s+you\s+)?(support|work\s+with|use|cover)/i, /tech\s+stack/i],
    title: "Platforms & Tech Stack Supported",
    content: `At **VyperX**, we engineer growth across the modern digital ecosystem:

• **Paid Advertising & Acquisition:**
  - **Meta (Instagram & Facebook):** Ads Manager, Advantage+ campaigns, lookalike audiences, custom retargeting.
  - **Google & YouTube:** High-intent Search Ads, Performance Max (PMax), and YouTube video ads.

• **E-Commerce & Storefronts:**
  - **Shopify & Shopify 2.0:** High-converting stores, Liquid customization, app integrations, and CRO.
  - **WooCommerce & WordPress:** Custom web design, landing pages, and maintenance.
  - **Modern Custom Web:** Next.js, React, Tailwind CSS, speed-optimized landing pages.

• **Organic Social & Video:**
  - Instagram Reels, Carousels, Stories, and daily community management (handling comments and DMs).

• **Creative & Video Production:**
  - Adobe Premiere Pro, After Effects, CapCut, Figma, Adobe Photoshop / Illustrator.

• **Tracking & Attribution:**
  - Server-side Meta Conversions API (CAPI), Meta Pixel, Google Tag Manager, GA4.`,
    suggestions: [
      "Do you build on Shopify?",
      "How do Meta Ads work?",
      "Show pricing plans",
      "Book a strategy call"
    ],
    includeCTA: true
  },
  {
    id: "platform-meta",
    category: "platform",
    keywords: [
      "meta", "instagram", "facebook", "reels", "meta ads manager", "advantage+", 
      "pixel", "capi", "conversions api", "dm automation", "instagram algorithm"
    ],
    patterns: [/meta\s+platform/i, /instagram\s+algorithm/i, /how\s+does\s+meta\s+ads\s+work/i],
    title: "Meta Platforms (Instagram & Facebook)",
    content: `**Meta (Instagram & Facebook)** is the core acquisition engine for most consumer brands. Here is how VyperX leverages the platform:

• **Instagram Reels & Feed:** We build content structured for current algorithm signals—watch time, saves, and shares.
• **Meta Ads Manager:** We run structured campaigns using Advantage+ Shopping Campaigns (ASC) alongside manual ABO/CBO testing sets.
• **Meta Pixel & CAPI (Conversions API):** We set up server-side event tracking so your campaigns don't lose data due to iOS privacy restrictions or ad-blockers.
• **Direct Message (DM) & Comment Nurturing:** In our social plans, our team manages active comment and DM responses to turn warm prospects into paying clients.`,
    suggestions: [
      "What is your Meta ads pricing?",
      "Can you audit my Meta pixel?",
      "What is UGC video content?"
    ],
    includeCTA: true
  },
  {
    id: "platform-shopify",
    category: "platform",
    keywords: [
      "shopify", "shopify 2.0", "liquid", "ecommerce platform", "woocommerce", 
      "wordpress", "store migration", "cart abandonment", "checkout"
    ],
    patterns: [/shopify(\s+vs\s+woocommerce)?/i, /which\s+platform\s+do\s+you\s+use/i],
    title: "Shopify & E-Commerce Platforms",
    content: `For e-commerce stores, **Shopify** is our primary platform of choice, although we also support WooCommerce and custom web applications.

**Why we build on Shopify:**
• **World-Class Checkout:** Best-in-class checkout security and conversion rates.
• **Shopify 2.0 Themes:** Modular, lightning-fast, and easy for your team to update without writing code.
• **Zero Server Maintenance:** High server uptime (99.99%) during high-traffic sales events.
• **CRO Optimizations:** We build custom sections, upsell drawers, sticky buy buttons, and mobile-first product galleries.
• **Store Migration:** We can migrate your existing store from WooCommerce, Wix, or WordPress to Shopify seamlessly without losing SEO rankings or order history.`,
    suggestions: [
      "How much is a Shopify store build?",
      "Can you optimize my existing store?",
      "Book an e-commerce audit"
    ],
    includeCTA: true
  },
  {
    id: "platform-google",
    category: "platform",
    keywords: [
      "google ads", "google", "search ads", "pmax", "performance max", 
      "youtube ads", "seo", "search engine optimization"
    ],
    patterns: [/google\s+ads/i, /youtube\s+ads/i, /do\s+you\s+do\s+seo/i],
    title: "Google Ads & SEO",
    content: `Yes! While Meta Ads specialize in generating demand through visual discovery, **Google Ads** captures existing high-intent search demand.

**What we cover on Google:**
• **Google Search Ads:** Capturing people actively searching for your exact product or service.
• **Google Performance Max (PMax) & Shopping:** Showcasing your product catalog across Search, YouTube, Gmail, and Google Display Network.
• **Website Technical SEO:** All websites we build include proper schema markup, Open Graph tags, sitemaps, semantic HTML, and mobile speed optimization.`,
    suggestions: [
      "Should I run Google or Meta ads?",
      "What is your website build price?",
      "Contact the team"
    ],
    includeCTA: true
  },
  {
    id: "platform-creative-tools",
    category: "platform",
    keywords: [
      "editing software", "tools", "capcut", "premiere pro", "after effects", 
      "figma", "canva", "software you use", "video software"
    ],
    patterns: [/what\s+software\s+do\s+you\s+use/i, /what\s+tools/i],
    title: "Creative Tools & Production Tech",
    content: `Our creative department utilizes industry-standard software to deliver top-tier output:

• **Video Production:** Adobe Premiere Pro, After Effects, and CapCut for platform-native dynamic pacing, kinetic typography, and motion graphics.
• **Graphic & UI/UX Design:** Figma for pixel-perfect website prototypes, Adobe Illustrator & Photoshop for high-res brand creatives.
• **Analytics & Tracking:** Meta Pixel, Conversions API, Google Tag Manager, Google Analytics 4, and Shopify Analytics.`,
    suggestions: [
      "Tell me about UGC packs",
      "Tell me about website design",
      "Show pricing"
    ],
    includeCTA: false
  },
  {
    id: "platform-tasha-form",
    category: "platform",
    keywords: [
      "phone icon", "growth form", "how to fill form", "lead form", "form", 
      "how does tasha work", "submit details", "book call"
    ],
    patterns: [/phone\s+icon/i, /how\s+to\s+(fill|use)\s+form/i],
    title: "Using the Phone Icon & Growth Form",
    content: `You can connect with us directly inside this chat! 

• **Click the Phone icon** in the top-right header: It toggles the embedded **VyperX Growth Form** (https://vyperx-forms.netlify.app/tasha).
• Fill in your brand name, goals, and contact number.
• Our growth strategists review your brand and get in touch via WhatsApp or phone call within 24 hours.

Alternatively, you can book a direct strategy call on our website at **https://vyperx.in/#contact**.`,
    suggestions: [
      "Show me pricing first",
      "What services do you offer?",
      "Call +91 70447 00987"
    ],
    includeCTA: false
  },

  // ==========================================
  // 8. GENERIC DIGITAL MARKETING QUESTIONS
  // ==========================================
  {
    id: "concept-roas",
    category: "generic",
    keywords: ["what is roas", "roas", "return on ad spend", "how to calculate roas", "good roas"],
    patterns: [/what\s+is\s+roas/i, /calculate\s+roas/i],
    title: "What is ROAS?",
    content: `**ROAS (Return on Ad Spend)** measures the revenue generated for every rupee or dollar spent on advertising.

• **Formula:** \`ROAS = Total Revenue from Ads / Total Ad Spend\`
• **Example:** If you spend ₹50,000 on Meta ads and generate ₹2,00,000 in sales, your ROAS is **4.0x** (or 400%).

**What is a "good" ROAS?**
It depends on your gross profit margins:
• A brand with 80% margins can be profitable at a 2.0x ROAS.
• A brand with 40% margins might need a 3.5x+ ROAS to cover product and shipping costs.

At **VyperX**, our Performance Marketing systems aim to optimize both your front-end ROAS and your long-term Customer Lifetime Value (LTV).`,
    suggestions: [
      "How does VyperX scale Meta Ads?",
      "What is CAC and LTV?",
      "Show pricing plans"
    ],
    includeCTA: true
  },
  {
    id: "concept-cac-ltv",
    category: "generic",
    keywords: ["what is cac", "cac", "ltv", "customer acquisition cost", "lifetime value", "cac ltv ratio"],
    patterns: [/what\s+is\s+(cac|ltv)/i],
    title: "What are CAC and LTV?",
    content: `**CAC (Customer Acquisition Cost)** and **LTV (Lifetime Value)** are the two most crucial metrics for any scaling brand:

• **CAC:** The total cost of marketing and advertising required to acquire a single paying customer (\`CAC = Ad Spend / Number of New Customers\`).
• **LTV:** The total net profit a customer contributes over the entirety of their relationship with your business.

**The Golden Rule:**
A healthy brand aims for an **LTV:CAC ratio of at least 3:1**. If it costs you ₹500 to acquire a customer, that customer should generate at least ₹1,500 in value over time.

VyperX helps you decrease CAC with high-converting UGC ads and increase conversion rates with optimized web funnels.`,
    suggestions: [
      "Tell me about high-converting websites",
      "Show UGC video packs",
      "Book an ad audit"
    ],
    includeCTA: true
  },
  {
    id: "concept-ctr-cpc",
    category: "generic",
    keywords: ["what is ctr", "ctr", "cpc", "click through rate", "cost per click", "cpm"],
    patterns: [/what\s+is\s+(ctr|cpc|cpm)/i],
    title: "What are CTR and CPC?",
    content: `These are key efficiency metrics used to diagnose ad performance:

• **CTR (Click-Through Rate):** The percentage of people who see your ad and click on it (\`CTR = Clicks / Impressions * 100\`). A strong CTR for Meta ads is usually **1.5% to 3%+**.
• **CPC (Cost Per Click):** The average cost you pay each time someone clicks your ad link.
• **CPM (Cost Per Mille):** The cost to show your ad to 1,000 people.

💡 **How to improve them:** High-impact UGC hooks and bold captions stop users from scrolling, immediately raising your CTR and lowering your CPC!`,
    suggestions: [
      "Tell me about UGC video packs",
      "Show pricing plans",
      "Book a call"
    ],
    includeCTA: false
  },
  {
    id: "concept-cro",
    category: "generic",
    keywords: ["what is cro", "cro", "conversion rate optimization", "bounce rate", "improve conversion rate"],
    patterns: [/what\s+is\s+cro/i, /conversion\s+rate\s+optimization/i],
    title: "What is CRO (Conversion Rate Optimization)?",
    content: `**Conversion Rate Optimization (CRO)** is the process of increasing the percentage of website visitors who make a purchase or submit a lead form.

• **Why it matters:** If you send 10,000 visitors to your store:
  - At a 1% conversion rate = 100 sales.
  - At a 2.5% conversion rate = **250 sales with the exact same ad spend!**

**How VyperX optimizes CRO:**
1. Sub-2-second mobile load speeds
2. Sticky "Add to Cart" & Buy Now buttons
3. Real customer UGC and social proof directly on product pages
4. Removing unnecessary form fields and distractions at checkout`,
    suggestions: [
      "Can VyperX build me a website?",
      "Show website pricing",
      "Book a website audit"
    ],
    includeCTA: true
  },
  {
    id: "advice-scale-ecommerce",
    category: "generic",
    keywords: [
      "how to grow ecommerce", "scale ecommerce", "how to get more sales", "get more sales", "more sales",
      "increase sales", "grow my brand", "how to scale", "marketing strategy", "increase revenue", "boost sales"
    ],
    patterns: [/(how\s+to\s+)?(grow|scale|boost|increase)\s+(my\s+)?(brand|business|store|ecommerce|sales)/i, /get\s+more\s+sales/i],
    title: "How to Scale an E-Commerce Brand",
    content: `To sustainably scale an e-commerce brand today, you need a connected growth engine:

1. **Offer & Unit Economics:** Ensure your gross margins are at least 60–70% to afford paid customer acquisition.
2. **High-Converting Storefront:** A fast, mobile-first website with high AOV (Average Order Value) bundles and frictionless checkout.
3. **UGC Ad Creative Machine:** Running multiple creative angles (unboxing, problem/solution, testimonials) to combat ad fatigue.
4. **Structured Paid Media:** Scaling winning ad sets on Meta Ads while maintaining tight retargeting.
5. **Customer Retention:** Email/SMS flows and active community engagement to boost repeat purchase rates.

That is exactly the full **Growth System** VyperX builds for partner brands!`,
    suggestions: [
      "What plan is best for my brand?",
      "Show pricing plans",
      "Book a strategy call"
    ],
    includeCTA: true
  },

  // ==========================================
  // 9. FAQ & MISCELLANEOUS
  // ==========================================
  {
    id: "faq-guarantee",
    category: "faq",
    keywords: ["guarantee", "guaranteed results", "refund", "promise", "risk"],
    patterns: [/do\s+you\s+guarantee/i, /refund\s+policy/i],
    title: "Do you guarantee results?",
    content: `We believe in transparent, honest partnerships. No credible agency can guarantee exact sales figures because market conditions, product-market fit, and fulfillment all play a role.

**However, what VyperX DOES guarantee:**
• We guarantee dedicated weekly accountability, senior-level creative execution, and full transparent reporting.
• We work on agile monthly tiers rather than locking you into rigid 12-month lock-in contracts.
• Our systems are built around proven conversion frameworks tested on real brands (like Srinitas Clothing's **+320% engagement boost**).`,
    suggestions: [
      "Show case studies",
      "What are your pricing plans?",
      "Book a call"
    ],
    includeCTA: true
  },
  {
    id: "faq-contract-terms",
    category: "faq",
    keywords: ["contract", "lock in", "commitment", "agreement", "monthly", "cancel"],
    patterns: [/is\s+there\s+a\s+contract/i, /lock\s+in/i, /cancellation/i],
    title: "Contracts & Commitments",
    content: `We keep our partnerships flexible and results-driven! 

• **Social Media & Performance Marketing:** We operate on a flexible **month-to-month retainer** basis. You are never locked into long, inflexible annual contracts.
• **Websites & UGC Packs:** Transparent one-time project deliverables with clear milestone approvals.

We aim to earn your continued partnership every single month through measurable performance.`,
    suggestions: [
      "Show pricing plans",
      "How does onboarding work?",
      "Talk to our team"
    ],
    includeCTA: true
  }
];
