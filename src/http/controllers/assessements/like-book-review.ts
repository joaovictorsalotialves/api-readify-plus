import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeLikeBookReviewUseCase } from '@/use-cases/factories/make-like-book-review-use-case'
import { likeBookReviewBodySchema } from './like-book-review-schema'

export async function likeBookReview(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { assessementId } = likeBookReviewBodySchema.parse(request.body)

  const likeBookReviewUseCase = makeLikeBookReviewUseCase()

  await likeBookReviewUseCase.execute({
    assessementId,
    userId: request.user.sub,
  })

  return reply.status(204).send()
}
