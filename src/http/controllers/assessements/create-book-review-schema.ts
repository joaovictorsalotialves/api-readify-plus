import z from 'zod'

export const createBookReviewBodySchema = z.object({
  score: z.coerce.number(),
  comment: z.string(),
  bookId: z.string().uuid(),
})
