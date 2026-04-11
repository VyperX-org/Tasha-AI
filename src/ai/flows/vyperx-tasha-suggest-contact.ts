'use server';
import { normalize, tokenize } from "./utils";


import { z } from 'zod';

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

function detectIntents(messages: { role: string; content: string }[]) {
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content || "";

  const q = normalize(lastUserMessage);
  const words = tokenize(lastUserMessage);

  const intents = new Set<string>();

  // ✅ greetings (FIXED)
  if (["hi", "hello", "hey"].some(w => words.includes(w))) {
    intents.add("greeting");
  }

  // ✅ pricing (expanded)
  if (["price", "cost", "pricing", "plan", "budget", "fees"].some(k => q.includes(k))) {
    intents.add("pricing");
  }

  // ✅ website
  if (["website", "store", "shopify", "ecommerce"].some(k => q.includes(k))) {
    intents.add("website");
  }

  // ✅ ugc (FIXED)
  if (
    q.includes("ugc") ||
    q.includes("video ad") ||
    q.includes("ugc video")
  ) {
    intents.add("ugc");
  }

  // ✅ social
  if (["social", "instagram", "posting"].some(k => q.includes(k))) {
    intents.add("social");
  }

  // ✅ ads
  if (["ads", "marketing", "facebook ads", "google ads"].some(k => q.includes(k))) {
    intents.add("ads");
  }

  // ✅ fallback
  if (intents.size === 0) {
    intents.add("general");
  }

  return Array.from(intents);
}

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

function addCTA(base: string): string {
  return `${base}

Best next step is to fill the form using the phone icon so our growth strategists can reach out.

Or book a call here:
https://vyperx.in/#contact`;
}

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