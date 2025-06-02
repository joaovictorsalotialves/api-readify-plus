import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeLikeBookReviewUseCase } from '@/use-cases/factories/make-like-book-review-use-case'
import { removeBookReviewBodySchema } from './remove-book-review-schema'
import { makeRemoveBookReviewUseCase } from '@/use-cases/factories/make-remove-book-review-use-case'

export async function removeBookReview(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { assessementId, userId } = removeBookReviewBodySchema.parse(
    request.body
  )

  const removeBookReviewUseCase = makeRemoveBookReviewUseCase()

  await removeBookReviewUseCase.execute({
    assessementId,
    userId,
  })

  return reply.status(204).send({})
}
