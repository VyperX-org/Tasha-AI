/**
 * Tasha Growth Engine
 * Advanced hybrid AI & Knowledge Engine for VyperX
 * Handles both website-specific questions and generic marketing/conversational queries.
 */

import { KNOWLEDGE_BASE, KnowledgeTopic, VYPERX_GENERAL_INFO } from './knowledge-base';
import { normalize, tokenize } from './flows/utils';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface TashaResponse {
  response: string;
  suggestions?: string[];
  reasoning_details?: string;
}

const SYSTEM_PROMPT = `You are Tasha, the elite AI Growth Partner at VyperX (https://vyperx.in/).
VyperX is a full-service growth agency based in Rajarhat, Kolkata, India.
Contact: contact@vyperx.in | +91 70447 00987 | https://vyperx.in/#contact

CORE SERVICES & PRICING:
1. UGC Content Creation & Video Editing: Starts at ₹5,999. Custom scripts, creator matching, A/B hook testing, performance-oriented editing for Meta ads & Reels.
2. High-Converting Websites: Starts at ₹45,000. Shopify 2.0, WooCommerce, custom Next.js, sub-2s speed, mobile-first, CRO, frictionless checkout.
3. Social Media Management: ₹15,000 to ₹35,000 / month. 30-day content calendar, graphics, viral reel scripts, and daily community management (handling comments and DMs).
4. Performance Marketing (Meta Ads): Tiered scaling from ₹50K/mo test phase up to ₹5L+/mo scaling systems. Server-side CAPI tracking, creative testing, ROAS scaling.

MONTHLY PROCESS (GROWTH RHYTHM):
- Week 1: Onboarding & Strategy (brand deep-dive, competitor audit, roadmap)
- Weeks 1–2: Content Calendar (30-day plan, scripts, ad angles for approval)
- Weeks 2–3: Content Production (UGC filming, graphic design, editing)
- Weeks 3–4: Publishing & Ads Live (scheduling & Meta ad campaigns launched)
- Ongoing: Daily community management (replying to comments & DMs)
- Month-End: Performance reporting (revenue, ROAS, conversions review)

CLIENT RESULTS:
- Srinita's Fashion & Clothing: +320% increase in lead engagement via fashion UGC videos & social strategy.
- Devaki Memorial School: Complete digital presence and website architecture.

INSTRUCTIONS:
- Tone: Professional, confident, friendly, growth-minded, energetic.
- Answer questions accurately using VyperX facts above.
- Answer generic questions (definitions of ROAS, CAC, CTR, CRO, e-commerce scaling tips, digital marketing advice, greetings, small talk, jokes) expertly and warmly.
- For platform-related questions (Meta, Instagram, Shopify, Google Ads, creative software), provide thorough platform-specific guidance.
- If relevant to business inquiries, mention they can click the Phone icon in the chat header to open the Growth Form or visit https://vyperx.in/#contact.
- Do NOT add repetitive sales pitches to casual greetings or jokes.`;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Score a topic against the user's query and conversation history
 */
function scoreTopic(topic: KnowledgeTopic, query: string, tokens: string[]): number {
  let score = 0;
  const q = normalize(query);

  // 1. Check regex patterns (Highest priority)
  if (topic.patterns) {
    for (const pattern of topic.patterns) {
      if (pattern.test(query) || pattern.test(q)) {
        score += 120;
        break;
      }
    }
  }

  // 2. Check keyword matches with word boundaries
  for (const kw of topic.keywords) {
    const kwNorm = normalize(kw);
    if (q === kwNorm) {
      score += 100;
    } else {
      const escaped = escapeRegex(kwNorm);
      const regex = new RegExp(`(?:^|\\s)${escaped}(?:\\s|$)`, 'i');
      if (regex.test(q)) {
        const kwWordCount = kwNorm.split(' ').length;
        score += 30 * kwWordCount;
      }
    }
  }

  // 3. Check individual token intersections
  for (const token of tokens) {
    if (token.length <= 2) continue; // skip short words like 'is', 'to', 'in'
    for (const kw of topic.keywords) {
      const kwTokens = tokenize(kw);
      if (kwTokens.includes(token)) {
        score += 4;
      }
    }
  }

  return score;
}

/**
 * Build contextual CTA if appropriate
 */
function formatResponse(content: string, includeCTA?: boolean): string {
  if (!includeCTA) {
    return content;
  }

  const cta = `\n\n💡 **Ready to take the next step?**
• Click the **Phone icon** at the top right to submit your brand details.
• Or book a direct strategy call: [vyperx.in/#contact](${VYPERX_GENERAL_INFO.contactUrl})`;

  return `${content}${cta}`;
}

/**
 * Intelligent Offline Matcher
 */
function offlineMatch(messages: ChatMessage[]): TashaResponse {
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';
  const query = lastUserMsg.trim();
  const normalizedQuery = normalize(query);
  const tokens = tokenize(query);

  // Quick direct greetings check
  if (/^(hi|hello|hey|yo|namaste|hola|good\s+(morning|afternoon|evening))[\s!.]*$/i.test(query.trim())) {
    const greetingTopic = KNOWLEDGE_BASE.find(k => k.id === 'greeting')!;
    return {
      response: greetingTopic.content,
      suggestions: greetingTopic.suggestions,
      reasoning_details: "Intent: Direct Greeting. Warm welcome with quick service pathways."
    };
  }

  // Score all topics in knowledge base
  const scored = KNOWLEDGE_BASE.map(topic => ({
    topic,
    score: scoreTopic(topic, query, tokens)
  })).filter(item => item.score > 15);

  scored.sort((a, b) => b.score - a.score);

  // If we have strong matches
  if (scored.length > 0 && scored[0].score >= 25) {
    const best = scored[0].topic;

    // Check if there is a secondary relevant topic that wasn't covered (e.g. asked about both website and pricing)
    const combinedTopics: KnowledgeTopic[] = [best];
    if (scored.length > 1 && scored[1].score >= 40) {
      const second = scored[1].topic;
      // Combine if different category and not redundant
      if (second.id !== best.id && second.category !== best.category && !best.content.includes(second.title)) {
        combinedTopics.push(second);
      }
    }

    const combinedContent = combinedTopics.map(t => t.content).join('\n\n---\n\n');
    const needsCTA = combinedTopics.some(t => t.includeCTA);
    
    // Merge suggestions uniquely
    const suggestions = Array.from(
      new Set(combinedTopics.flatMap(t => t.suggestions || []))
    ).slice(0, 4);

    const matchedKeywords = combinedTopics.flatMap(t => 
      t.keywords.filter(k => normalizedQuery.includes(normalize(k)))
    );

    return {
      response: formatResponse(combinedContent, needsCTA),
      suggestions,
      reasoning_details: `Identified topics: ${combinedTopics.map(t => t.title).join(', ')}. Matched keywords: [${matchedKeywords.slice(0, 4).join(', ')}]. Confidence: High.`
    };
  }

  // Smart Contextual Fallback for unrecognized or broad generic questions
  return {
    response: `I hear you! As your **VyperX growth partner**, I specialize in helping ambitious brands scale through:

1. **High-Converting Websites** (Mobile-first, fast Shopify & custom storefronts starting at ₹45,000)
2. **UGC Video Packs** (Performance-tested video creatives starting at ₹5,999)
3. **Social Media Management** (Strategic calendars & active community engagement from ₹15,000 to ₹35,000/mo)
4. **Performance Marketing** (Structured Meta ad acquisition engines focused on ROAS)

Could you tell me a bit more about your business or what specific growth milestone you're working toward right now?

Or if you'd like to talk directly with our growth strategists, click the **Phone icon** at the top right to share your brand details!`,
    suggestions: [
      "Show all pricing plans",
      "How does the growth process work?",
      "Which platforms do you support?",
      "Book a strategy call"
    ],
    reasoning_details: "Intent: Open-ended / General inquiry. Provided brand overview with quick discovery routes."
  };
}

/**
 * Main query entry point
 */
export async function getTashaResponse(messages: ChatMessage[]): Promise<TashaResponse> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;

  if (apiKey) {
    try {
      // Dynamic import to avoid crash if genkit / googleAI isn't configured with an API key
      const { ai } = await import('@/ai/genkit');
      
      const conversationHistory = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
      
      const result = await ai.generate({
        system: SYSTEM_PROMPT,
        prompt: `Here is the current conversation:\n${conversationHistory}\n\nRespond as Tasha to the latest user message. Keep formatting clean with markdown and clear spacing.`,
      });

      if (result && result.text) {
        return {
          response: result.text,
          suggestions: [
            "Tell me about pricing",
            "How does your process work?",
            "Show client case studies",
            "Book a consultation call"
          ],
          reasoning_details: "Generated dynamically via Gemini AI with VyperX Growth System knowledge."
        };
      }
    } catch (err) {
      console.warn("Gemini generation fallback to offline knowledge engine:", err);
    }
  }

  // Offline intelligent knowledge matcher
  return offlineMatch(messages);
}
