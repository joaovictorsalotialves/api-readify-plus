import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const removeLikeBookReviewDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Remove like book review',
    tags: ['book review'],
    response: {
      204: z.object({}),
      401: z.object({ message: z.string() }),
    },
  },
}
