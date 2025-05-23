import z from 'zod'

export const removeLikeBookReviewBodySchema = z.object({
  assessementId: z.string().uuid(),
})
