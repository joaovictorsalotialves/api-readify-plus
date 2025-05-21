import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const getBooksDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Get books',
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
            visits: z.coerce.number(),
            writer: z.object({
              id: z.string().uuid(),
              name: z.string(),
            }),
            category: z.object({
              id: z.string().uuid(),
              name: z.string(),
            }),
          })
        ),
      }),
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
  },
}
