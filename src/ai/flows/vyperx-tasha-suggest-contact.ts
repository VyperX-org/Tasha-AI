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

/* ------------------ NORMALIZER ------------------ */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------ INTENT DETECTION ------------------ */

function detectIntents(messages: { role: string; content: string }[]) {
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content || "";

  const q = normalize(lastUserMessage);

  const intents = new Set<string>();

  // ✅ greetings
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    intents.add("greeting");
  }

  // ✅ pricing
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("pricing") ||
    q.includes("plan")
  ) {
    intents.add("pricing");
  }

  // ✅ website
  if (
    q.includes("website") ||
    q.includes("store") ||
    q.includes("shopify") ||
    q.includes("ecommerce")
  ) {
    intents.add("website");
  }

  // ✅ ugc
  if (
    q.includes("ugc") ||
    q.includes("video") ||
    q.includes("content")
  ) {
    intents.add("ugc");
  }

  // ✅ social media
  if (
    q.includes("social") ||
    q.includes("instagram") ||
    q.includes("posting")
  ) {
    intents.add("social");
  }

  // ✅ ads
  if (
    q.includes("ads") ||
    q.includes("marketing")
  ) {
    intents.add("ads");
  }

  // ✅ fallback
  if (intents.size === 0) {
    intents.add("general");
  }

  return Array.from(intents);
}

/* ------------------ RESPONSE GENERATOR ------------------ */

function generateResponse(intents: string[]): string {
  const responses: string[] = [];

  for (const intent of intents) {
    switch (intent) {
      case "greeting":
        responses.push(
          `Hey, I’m Tasha — your VyperX growth partner.

I help brands generate leads and scale revenue using content, ads, and conversion-focused websites.`
        );
        break;

      case "pricing":
        responses.push(
          `Our plans start from Rs. 15,000/month and scale depending on your growth stage.`
        );
        break;

      case "website":
        responses.push(
          `We build high-converting e-commerce websites starting at Rs. 45,000 designed to turn visitors into customers.`
        );
        break;

      case "ugc":
        responses.push(
          `Our UGC video packs start at Rs. 5,999 and are built to create high-performing ad content.`
        );
        break;

      case "social":
        responses.push(
          `We offer social media plans from Rs. 15,000 to Rs. 35,000/month focused on consistency, engagement, and growth.`
        );
        break;

      case "ads":
        responses.push(
          `Our performance marketing systems help you generate leads and scale revenue through structured ad campaigns.`
        );
        break;

      case "general":
        responses.push(
          `We help brands grow through social media, ads, websites, and content systems tailored for results.`
        );
        break;
    }
  }

  return responses.join("\n\n");
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

  // 🔥 safety: ensure valid input
  const parsed = VyperXTashaSuggestContactInputSchema.parse(input);

  const intents = detectIntents(parsed.messages);

  const baseResponse = generateResponse(intents);

  return {
    response: addCTA(baseResponse),
  };
}