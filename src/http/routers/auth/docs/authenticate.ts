import { authenticateBodySchema } from '@/http/controllers/auth/authenticate-schema'
import { z } from 'zod'

export const authenticateDoc = {
  schema: {
    summary: 'Authenticate',
    tags: ['auth'],
    body: authenticateBodySchema,
    response: {
      200: z.object({ token: z.string(), refreshToken: z.string() }),
      400: z.object({ message: z.string() }),
    },
  },
}
