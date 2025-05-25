import { z } from 'zod'

export const saveReadingProgressParamsSchema = z.object({
  readingId: z.string().uuid(),
})

export const saveReadingProgressBodySchema = z.object({
  lastPageRead: z.coerce.number(),
  duration: z.coerce.number(),
})
