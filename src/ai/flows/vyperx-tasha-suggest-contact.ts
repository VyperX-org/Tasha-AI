'use server';

import { z } from 'zod';
import { getTashaResponse, ChatMessage } from '../tasha-engine';

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
  suggestions: z.array(z.string()).optional(),
  reasoning_details: z.string().optional(),
});
export type VyperXTashaSuggestContactOutput = z.infer<
  typeof VyperXTashaSuggestContactOutputSchema
>;

export async function vyperXTashaSuggestContact(
  input: VyperXTashaSuggestContactInput
): Promise<VyperXTashaSuggestContactOutput> {
  const parsed = VyperXTashaSuggestContactInputSchema.parse(input);
  const result = await getTashaResponse(parsed.messages as ChatMessage[]);

  return {
    response: result.response,
    suggestions: result.suggestions,
    reasoning_details: result.reasoning_details,
  };
}
