
'use server';
/**
 * @fileOverview A Genkit flow that acts as the VyperX AI assistant using Gemini 3 Flash Preview.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VyperXTashaSuggestContactInputSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })).describe('The full conversation history.'),
});
export type VyperXTashaSuggestContactInput = z.infer<typeof VyperXTashaSuggestContactInputSchema>;

const VyperXTashaSuggestContactOutputSchema = z.object({
  response: z.string().describe("Tasha's response to the user."),
  reasoning_details: z.any().optional().describe("Internal reasoning details."),
});
export type VyperXTashaSuggestContactOutput = z.infer<typeof VyperXTashaSuggestContactOutputSchema>;

const systemPrompt = `You are Tasha, the official AI assistant for VyperX — a modern growth partner helping brands scale through social media, websites, and UGC video content.

## Tone Rules
- Warm, confident, punchy.
- Quote prices in Indian Rupees (Rs.).
- Always suggest booking a call: [Contact Page](https://vyperx.in/pages/contact)
- Encourage users to **fill the form using the phone icon at the bar** so our growth strategists can reach out, or book a call here: https://vyperx.in/pages/contact
- Do NOT say "drop your name/number". Always mention the phone icon or the contact link.

## Pricing Context
- Starter: Rs. 15,000/month (Social Media Growth)
- Growth: Rs. 25,000/month (Strategic Content)
- Elite: Rs. 35,000/month (Full Scale)
- E-commerce Website: Rs. 45,000
- UGC Video Pack: Rs. 5,999

Website: https://vyperx.in`;

export async function vyperXTashaSuggestContact(input: VyperXTashaSuggestContactInput): Promise<VyperXTashaSuggestContactOutput> {
  return vyperXTashaSuggestContactFlow(input);
}

const suggestContactPrompt = ai.definePrompt({
  name: 'vyperXTashaSuggestContactPrompt',
  input: { schema: VyperXTashaSuggestContactInputSchema },
  output: { schema: VyperXTashaSuggestContactOutputSchema },
  system: systemPrompt,
  prompt: `
    CONVERSATION HISTORY:
    {{#each messages}}
    {{role.toUpperCase}}: {{content}}
    {{/each}}

    Please provide your response as Tasha.
  `
});

const vyperXTashaSuggestContactFlow = ai.defineFlow(
  {
    name: 'vyperXTashaSuggestContactFlow',
    inputSchema: VyperXTashaSuggestContactInputSchema,
    outputSchema: VyperXTashaSuggestContactOutputSchema,
  },
  async (input) => {
    try {
      const result = await suggestContactPrompt(input);
      const output = result.output;
      
      return {
        response: output?.response || "I'm here to help you scale! How can VyperX boost your brand's growth today?",
        reasoning_details: {
          usage: result.usage,
          finishReason: result.finishReason,
          model: result.model
        },
      };
    } catch (error: any) {
      console.error("Genkit Error:", error);
      return {
        response: "I'm having a brief technical hiccup connecting to my growth brain. Please reach out to us at [vyperx.in/pages/contact](https://vyperx.in/pages/contact)!",
        reasoning_details: { error: error.message || "Unknown Genkit error" },
      };
    }
  }
);
