import { z } from 'zod'

export const addFavoriteBookBodySchema = z.object({
  bookId: z.string().uuid(),
})
