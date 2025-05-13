import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const removeFavoriteBookDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Remove favorite book',
    tags: ['book'],
    response: {
      204: z.object({}),
      401: z.object({ message: z.string() }),
    },
  },
}
