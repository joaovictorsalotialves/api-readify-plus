import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const getBookReviewsOfBookDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'get book reviews of book',
    tags: ['book review'],
    response: {
      204: z.object({
        assessements: z.array(
          z.object({
            id: z.string().uuid(),
            score: z.coerce.number(),
            comment: z.string(),
            likes: z.coerce.number(),
            userId: z.string().uuid(),
            bookId: z.string().uuid(),
            user: z.object({
              username: z.string(),
            }),
          })
        ),
      }),
      401: z.object({ message: z.string() }),
    },
  },
}
