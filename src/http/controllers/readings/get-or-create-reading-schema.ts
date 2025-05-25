import { z } from 'zod'

export const getOrCreateReadingParamsSchema = z.object({
  bookId: z.string().uuid(),
})
