import { z } from 'zod'

export const getSimilarBooksParamSchema = z.object({
  bookId: z.string().uuid(),
})
