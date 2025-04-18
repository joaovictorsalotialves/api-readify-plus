import { registerBodySchema } from '@/http/controllers/users/register-schema'
import { z } from 'zod'

export const registerDoc = {
  schema: {
    summary: 'Register user',
    tags: ['user'],
    body: registerBodySchema,
    response: {
      201: z.object({ token: z.string(), refreshToken: z.string() }),
      409: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
  },
}
