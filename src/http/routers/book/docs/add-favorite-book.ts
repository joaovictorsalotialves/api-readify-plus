import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const addFavoriteBookDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Add favorite book',
    tags: ['book'],
    response: {
      201: z.object({}),
      401: z.object({ message: z.string() }),
    },
  },
}
