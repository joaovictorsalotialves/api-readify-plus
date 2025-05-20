import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const countBookReviewOfUserDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Count book review of user',
    tags: ['book review'],
    response: {
      200: z.object({
        count: z.number(),
      }),
      401: z.object({ message: z.string() }),
    },
  },
}
