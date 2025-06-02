import z from 'zod'

export const removeBookReviewBodySchema = z.object({
  userId: z.string().uuid(),
  assessementId: z.string().uuid(),
})
