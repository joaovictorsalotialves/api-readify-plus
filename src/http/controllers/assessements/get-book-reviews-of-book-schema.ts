import { z } from 'zod'

export const getBookReviewsOfBookParamsSchema = z.object({
  bookId: z.string().uuid(),
})
