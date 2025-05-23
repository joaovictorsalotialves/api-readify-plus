import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const likeBookReviewDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Like book review',
    tags: ['book review'],
    response: {
      204: z.object({}),
      401: z.object({ message: z.string() }),
    },
  },
}
