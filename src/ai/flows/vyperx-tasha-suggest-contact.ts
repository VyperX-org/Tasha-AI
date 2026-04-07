'use server';

import { z } from 'zod';

/* ------------------ SCHEMAS ------------------ */

const VyperXTashaSuggestContactInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
});
export type VyperXTashaSuggestContactInput = z.infer<
  typeof VyperXTashaSuggestContactInputSchema
>;

const VyperXTashaSuggestContactOutputSchema = z.object({
  response: z.string(),
});
export type VyperXTashaSuggestContactOutput = z.infer<
  typeof VyperXTashaSuggestContactOutputSchema
>;

/* ------------------ INTENT DETECTION ------------------ */

function detectIntent(messages: { role: string; content: string }[]) {
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === 'user')?.content || "";

  const q = lastUserMessage.toLowerCase();

  if (q.includes("price") || q.includes("cost")) return "pricing";
  if (q.includes("website") || q.includes("store")) return "website";
  if (q.includes("ugc") || q.includes("video")) return "ugc";
  if (q.includes("social") || q.includes("instagram")) return "social";
  if (q.includes("ads") || q.includes("marketing")) return "ads";

  return "general";
}

/* ------------------ RESPONSE GENERATOR ------------------ */

function generateResponse(intent: string): string {
  switch (intent) {
    case "pricing":
      return `Our plans start from Rs. 15,000/month and scale depending on your growth stage.

This is designed to help you get consistent growth and better results.`;

    case "website":
      return `We build high-converting e-commerce websites starting at Rs. 45,000 designed to turn visitors into customers.`;

    case "ugc":
      return `Our UGC video packs start at Rs. 5,999 and are built to create high-performing ad content.`;

    case "social":
      return `We offer social media plans from Rs. 15,000 to Rs. 35,000/month focused on consistency, engagement, and growth.`;

    case "ads":
      return `Our performance marketing systems help you generate leads and scale revenue through structured ad campaigns.`;

    default:
      return `We help brands grow through social media, ads, websites, and content systems tailored for results.`;
  }
}

/* ------------------ CTA BUILDER ------------------ */

function addCTA(base: string): string {
  return `${base}

Best next step is to fill the form using the phone icon so our growth strategists can reach out.

Or book a call here:
https://vyperx.in/pages/contact`;
}

/* ------------------ MAIN FUNCTION ------------------ */

export async function vyperXTashaSuggestContact(
  input: VyperXTashaSuggestContactInput
): Promise<VyperXTashaSuggestContactOutput> {
  const intent = detectIntent(input.messages);

  const baseResponse = generateResponse(intent);

  return {
    response: addCTA(baseResponse),
  };
}