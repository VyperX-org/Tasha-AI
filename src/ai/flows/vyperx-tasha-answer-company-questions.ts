'use server';

import { z } from 'zod';

const VyperXTashaAnswerCompanyQuestionsInputSchema = z.object({
  question: z.string(),
});
export type VyperXTashaAnswerCompanyQuestionsInput = z.infer<
  typeof VyperXTashaAnswerCompanyQuestionsInputSchema
>;

const VyperXTashaAnswerCompanyQuestionsOutputSchema = z.object({
  answer: z.string(),
});
export type VyperXTashaAnswerCompanyQuestionsOutput = z.infer<
  typeof VyperXTashaAnswerCompanyQuestionsOutputSchema
>;

type KBItem = {
  id: string;
  keywords: string[];
  response: string;
};

const knowledgeBase: KBItem[] = [
  {
    id: "social-media",
    keywords: ["social media", "instagram", "posting", "content"],
    response:
      "We offer social media management plans starting at Rs. 15,000/month and going up to Rs. 35,000/month, designed to improve consistency, engagement, and overall brand growth.",
  },
  {
    id: "greetings",
    keywords: ["hi", "hello"],
    response:
      "Hey, I’m Tasha — your VyperX growth partner.\n\nI help brands generate leads and scale revenue using content, ads, and conversion-focused websites.\n\nWhat’s your main goal right now — more leads, better branding, or higher sales?",
  },
  {
    id: "pricing",
    keywords: ["price", "cost", "pricing", "plans"],
    response:
      "Our pricing starts at Rs. 15,000/month for social media, Rs. 45,000 for e-commerce websites, and Rs. 5,999 for UGC content packs.",
  },
  {
    id: "website",
    keywords: ["website", "store", "shopify", "ecommerce"],
    response:
      "We build conversion-focused e-commerce websites starting at Rs. 45,000, designed to turn visitors into paying customers.",
  },
  {
    id: "ugc",
    keywords: ["ugc", "video", "content creation", "ads content"],
    response:
      "Our UGC video packs start at Rs. 5,999 and are specifically designed to create high-converting content for ads and social media.",
  },
  {
  id: "thanks",
  keywords: ["thanks", "thank you", "thx"],
  response:
    "You're welcome! 😊 Let me know if you need help with anything else."
},
{
  id: "bye",
  keywords: ["bye", "goodbye", "see you"],
  response:
    "Got it! 👋 If you need help later, I’ll be right here."
},
{
  id: "how-are-you",
  keywords: ["how are you", "how's it going"],
  response:
    "Doing great! Ready to help you grow 🚀 What are you looking to improve right now?"
},
{
  id: "who-are-you",
  keywords: ["who are you", "what are you"],
  response:
    "I’m Tasha, your VyperX AI growth partner. I help businesses get more leads, better branding, and higher sales."
},
{
  id: "confused",
  keywords: ["i dont know", "not sure", "confused"],
  response:
    "No worries — tell me a bit about your business, and I’ll suggest the best way to grow 🚀"
},
{
  id: "experience",
  keywords: ["experience", "worked with", "clients"],
  response:
    "We’ve worked with multiple brands across industries, focusing on growth through content, ads, and conversion optimization."
},
{
  id: "timeline",
  keywords: ["how long", "delivery time", "timeline"],
  response:
    "Timelines depend on the service — websites typically take 2–3 weeks, while social media growth is ongoing monthly."
},
{
  id: "results",
  keywords: ["results", "roi", "growth", "outcomes"],
  response:
    "Our goal is measurable growth — better engagement, more leads, and increased conversions. Strategies are tailored to your business."
},
{
  id: "custom",
  keywords: ["custom", "tailored", "personalized"],
  response:
    "Yes — all our strategies are customized based on your business goals, target audience, and industry."
}
];

function findBestMatch(query: string): KBItem[] {
  const normalized = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const matches: KBItem[] = [];

  for (const item of knowledgeBase) {
    let matched = false;

    for (const keyword of item.keywords) {
      const k = keyword.toLowerCase();

      if (normalized.includes(k)) {
        matched = true;
        break;
      }
    }

    if (matched) {
      matches.push(item);
    }
  }

  return matches;
}

function buildResponse(base: string): string {
  return `${base}

This is designed to help you grow faster and generate better results.

Best next step is to fill the form using the phone icon or book a call here:
https://vyperx.in/#contact`;
}

export async function vyperXTashaAnswerCompanyQuestions(
  input: VyperXTashaAnswerCompanyQuestionsInput
): Promise<VyperXTashaAnswerCompanyQuestionsOutput> {
  const { question } = input;

  const matches = findBestMatch(question);

  if (matches.length === 0) {
    return {
      answer: `We help brands grow through social media, performance marketing, websites, and UGC content systems.

      Best next step is to fill the form using the phone icon or book a call here:
      https://vyperx.in/#contact`,
    };
  }

  const responses = matches.slice(0, 2).map(m => m.response);

  return {
    answer: buildResponse([...new Set(responses)].join("\n\n")),
  };
}