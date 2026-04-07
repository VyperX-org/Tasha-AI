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
];


function findBestMatch(query: string): KBItem | null {
  const q = query.toLowerCase();

  let bestMatch: KBItem | null = null;
  let bestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;

    for (const keyword of item.keywords) {
      if (q.includes(keyword)) {
        score += 2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
}

function buildResponse(base: string): string {
  return `${base}

This is designed to help you grow faster and generate better results.

Best next step is to fill the form using the phone icon or book a call here:
https://vyperx.in/pages/contact`;
}


export async function vyperXTashaAnswerCompanyQuestions(
  input: VyperXTashaAnswerCompanyQuestionsInput
): Promise<VyperXTashaAnswerCompanyQuestionsOutput> {
  const { question } = input;

  const match = findBestMatch(question);

  if (!match) {
    return {
      answer: `We help brands grow through social media, performance marketing, websites, and UGC content systems.

      Best next step is to fill the form using the phone icon or book a call here:
      https://vyperx.in/pages/contact`,
    };
  }

  return {
    answer: buildResponse(match.response),
  };
}