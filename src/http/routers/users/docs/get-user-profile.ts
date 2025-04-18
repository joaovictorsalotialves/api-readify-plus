import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const getUserProfileDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Get user profile',
    tags: ['user'],
    response: {
      200: z.object({
        user: z.object({
          id: z.string(),
          name: z.string(),
          username: z.string(),
          email: z.string(),
          createdAt: z.date(),
        }),
      }),
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
  },
}
