import { editUserProfileBodySchema } from '@/http/controllers/users/edit-user-profile-schema'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const editUserProfileDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Edit user profile',
    tags: ['user'],
    body: editUserProfileBodySchema,
    response: {
      201: z.object({ token: z.string(), refreshToken: z.string() }),
      409: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
  },
}
