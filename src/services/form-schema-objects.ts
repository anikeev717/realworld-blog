import { z } from 'zod';

export const articleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title length needs to be at least 3 characters!')
    .max(100, 'Title length limit is 100 characters'),
  description: z
    .string()
    .trim()
    .min(3, 'Short description length needs to be at least 3 characters!')
    .max(250, 'Short description length limit is 250 characters'),
  body: z
    .string()
    .trim()
    .min(3, 'Text of article length needs to be at least 5 characters!')
    .max(5000, 'Text limit length is 5000 characters'),

  tags: z
    .object({ name: z.string().trim() })
    .refine((data) => data.name.length > 2, {
      message: 'Tag length needs to be at least 3 characters!',
      path: ['name'],
    })
    .array()
    .max(5, 'Tags count limit is 5 items! You must delete extra tags!'),
});
