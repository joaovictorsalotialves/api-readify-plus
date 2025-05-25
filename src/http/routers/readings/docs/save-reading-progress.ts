import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const saveReadingProgressDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Save reading progress',
    tags: ['Reading'],
    response: {
      200: z.object({
        reading: z.object({
          id: z.string().uuid(),
          startTime: z.date(),
          endTime: z.date().nullable(),
          duration: z.coerce.number(),
          lastPageRead: z.coerce.number(),
          userId: z.string().uuid(),
          bookId: z.string().uuid(),
        }),
      }),
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
  },
}
