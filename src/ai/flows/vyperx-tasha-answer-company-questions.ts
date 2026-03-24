
'use server';
/**
 * @fileOverview A Genkit flow for Tasha to answer company-related questions using Gemini 3 Flash Preview.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VyperXTashaAnswerCompanyQuestionsInputSchema = z.object({
  question: z.string().describe("The user's question about VyperX services, pricing, or operations."),
});
export type VyperXTashaAnswerCompanyQuestionsInput = z.infer<typeof VyperXTashaAnswerCompanyQuestionsInputSchema>;

const VyperXTashaAnswerCompanyQuestionsOutputSchema = z.object({
  answer: z.string().describe("Tasha's accurate and concise answer to the user's question."),
});
export type VyperXTashaAnswerCompanyQuestionsOutput = z.infer<typeof VyperXTashaAnswerCompanyQuestionsOutputSchema>;

const systemPrompt = `You are Tasha, the official AI assistant for VyperX — a modern growth partner.

## Core Services & Pricing
- Starter: Rs. 15,000/month
- Growth: Rs. 25,000/month
- Elite: Rs. 35,000/month
- E-commerce Website: Rs. 45,000
- UGC Video Pack: Rs. 5,999

## Rules
- Use Indian Rupees (Rs.).
- Be warm and confident.
- Encourage users to **fill the form using the phone icon at the bar** so our growth strategists can reach out.
- Do NOT say "drop your name/number". Always mention the phone icon or the contact link.
- Always link to: [Contact Page](https://vyperx.in/pages/contact) at the end.`;

export async function vyperXTashaAnswerCompanyQuestions(
  input: VyperXTashaAnswerCompanyQuestionsInput
): Promise<VyperXTashaAnswerCompanyQuestionsOutput> {
  return vyperXTashaAnswerCompanyQuestionsFlow(input);
}

const companyPrompt = ai.definePrompt({
  name: 'vyperXTashaAnswerCompanyQuestionsPrompt',
  input: { schema: VyperXTashaAnswerCompanyQuestionsInputSchema },
  output: { schema: VyperXTashaAnswerCompanyQuestionsOutputSchema },
  system: systemPrompt,
  prompt: `USER QUESTION: {{{question}}}`
});

const vyperXTashaAnswerCompanyQuestionsFlow = ai.defineFlow(
  {
    name: 'vyperXTashaAnswerCompanyQuestionsFlow',
    inputSchema: VyperXTashaAnswerCompanyQuestionsInputSchema,
    outputSchema: VyperXTashaAnswerCompanyQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await companyPrompt(input);
    return output!;
  }
);
