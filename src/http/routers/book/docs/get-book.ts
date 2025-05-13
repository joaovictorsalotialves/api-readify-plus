import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const getBookDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Get book',
    tags: ['book'],
    response: {
      200: z.object({
        book: z.object({
          id: z.string().uuid(),
          title: z.string(),
          urlCover: z.string(),
          bookPath: z.string(),
          synopsis: z.string(),
          publisher: z.string(),
          numberPage: z.coerce.number(),
          language: z.string(),
          ISBN: z.string(),
          visits: z.coerce.number(),
          writerId: z.string().uuid(),
          bookCategoryId: z.string().uuid(),
        }),
      }),
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
  },
}
