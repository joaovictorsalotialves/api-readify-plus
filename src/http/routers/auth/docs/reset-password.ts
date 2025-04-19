import { resetPasswordBodySchema } from '@/http/controllers/auth/reset-password-schema'
import { z } from 'zod'

export const resetPasswordDoc = {
  schema: {
    summary: 'Reset password',
    tags: ['auth'],
    body: resetPasswordBodySchema,
    response: {
      200: z.object({ token: z.string(), refreshToken: z.string() }),
      404: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
  },
}
