import { z } from 'zod'

export const getBookParamSchema = z.object({
  bookId: z.string().uuid(),
})
