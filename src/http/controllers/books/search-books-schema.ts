import { z } from 'zod'

export const searchBooksQuerySchema = z.object({
  title: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  writerId: z.string().uuid().optional(),
  page: z.coerce.number().default(1),
})
