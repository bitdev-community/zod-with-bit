import { z } from 'zod';

export const LetsTalkSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  whyWeShouldTalk: z.string().min(1, 'Reason is required'),
  suggestTime: z.string().min(1, 'Suggested time is required'),
});

export type LetsTalkSchemaType = z.infer<typeof LetsTalkSchema>;
