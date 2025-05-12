import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const countReadBooksOfUserDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Count read books of user',
    tags: ['book'],
    response: {
      200: z.object({
        count: z.number(),
      }),
      401: z.object({ message: z.string() }),
    },
  },
}
