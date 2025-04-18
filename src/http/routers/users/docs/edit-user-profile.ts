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
      200: z.object({
        user: z.object({
          id: z.string(),
          name: z.string(),
          username: z.string(),
          email: z.string(),
          createdAt: z.date(),
        }),
      }),
      409: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
  },
}
