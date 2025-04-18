import { editPasswordBodySchema } from '@/http/controllers/users/edit-password-schema'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const editPasswordDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Edit password',
    tags: ['user'],
    body: editPasswordBodySchema,
    response: {
      204: z.object({}),
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
  },
}
