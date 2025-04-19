import { z } from 'zod'

export const refreshDoc = {
  schema: {
    summary: 'Refresh Token',
    tags: ['auth'],
    response: {
      200: z.object({ token: z.string(), refreshToken: z.string() }),
      401: z.object({ message: z.string() }),
    },
  },
}
