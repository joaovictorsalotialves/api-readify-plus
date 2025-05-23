import z from 'zod'

export const likeBookReviewBodySchema = z.object({
  assessementId: z.string().uuid(),
})
