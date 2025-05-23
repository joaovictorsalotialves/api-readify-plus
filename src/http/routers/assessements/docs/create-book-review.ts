import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const createBookReviewDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Create book review',
    tags: ['book review'],
    response: {
      201: z.object({
        assessement: z.object({
          id: z.string().uuid(),
          score: z.coerce.number(),
          comment: z.string(),
          likes: z.coerce.number(),
          bookId: z.string().uuid(),
          userId: z.string().uuid(),
        }),
      }),
      401: z.object({ message: z.string() }),
    },
  },
}
