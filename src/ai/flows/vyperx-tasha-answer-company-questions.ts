'use server';

import { z } from 'zod';
import { getTashaResponse } from '../tasha-engine';

const VyperXTashaAnswerCompanyQuestionsInputSchema = z.object({
  question: z.string(),
});
export type VyperXTashaAnswerCompanyQuestionsInput = z.infer<
  typeof VyperXTashaAnswerCompanyQuestionsInputSchema
>;

const VyperXTashaAnswerCompanyQuestionsOutputSchema = z.object({
  answer: z.string(),
  suggestions: z.array(z.string()).optional(),
  reasoning_details: z.string().optional(),
});
export type VyperXTashaAnswerCompanyQuestionsOutput = z.infer<
  typeof VyperXTashaAnswerCompanyQuestionsOutputSchema
>;

export async function vyperXTashaAnswerCompanyQuestions(
  input: VyperXTashaAnswerCompanyQuestionsInput
): Promise<VyperXTashaAnswerCompanyQuestionsOutput> {
  const result = await getTashaResponse([
    { role: 'user', content: input.question }
  ]);

  return {
    answer: result.response,
    suggestions: result.suggestions,
    reasoning_details: result.reasoning_details,
  };
}
