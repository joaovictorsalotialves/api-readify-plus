import { editReadingSettingBodySchema } from '@/http/controllers/users/edit-reading-setting-schema'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { z } from 'zod'

export const getReadingSettingDoc = {
  onRequest: [verifyJWT],
  schema: {
    summary: 'Get reading setting',
    tags: ['reading setting'],
    response: {
      204: z.object({
        readingSetting: z.object({
          id: z.string(),
          fontFamily: z.string(),
          fontSize: z.coerce.number(),
          fontSpacing: z.string(),
          screenBrightness: z.coerce.number(),
          theme: z.string(),
          userId: z.string(),
        }),
      }),
      401: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
  },
}
