import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const searchBooksDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Search books',
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
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
  },
}
