import { z } from 'zod'

export const removeFavoriteBookBodySchema = z.object({
  bookId: z.string().uuid(),
})
