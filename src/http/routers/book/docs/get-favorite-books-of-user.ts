import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const getFavoriteBooksOfUserDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Get favorite books of user',
    tags: ['book'],
    response: {
      200: z.object({
        books: z.array(
          z.object({
            id: z.string().uuid(),
            title: z.string(),
            urlCover: z.string(),
            bookPath: z.string(),
            synopsis: z.string(),
            publisher: z.string(),
            numberPage: z.coerce.number(),
            language: z.string(),
            ISBN: z.string(),
            writerId: z.string().uuid(),
            bookCategoryId: z.string().uuid(),
          })
        ),
      }),
      401: z.object({ message: z.string() }),
    },
  },
}
