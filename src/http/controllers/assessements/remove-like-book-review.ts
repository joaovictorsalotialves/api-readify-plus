import type { FastifyRequest, FastifyReply } from 'fastify'

import { removeLikeBookReviewBodySchema } from './remove-like-book-review-schema'
import { makeRemoveLikeBookReviewUseCase } from '@/use-cases/factories/make-remove-like-book-review-use-case'

export async function removeLikeBookReview(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { assessementId } = removeLikeBookReviewBodySchema.parse(request.body)

  const removeLikeBookReviewUseCase = makeRemoveLikeBookReviewUseCase()

  await removeLikeBookReviewUseCase.execute({
    assessementId,
    userId: request.user.sub,
  })

  return reply.status(204).send()
}
