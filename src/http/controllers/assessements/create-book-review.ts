import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeCreateBookReviewUseCase } from '@/use-cases/factories/make-create-book-review-use-case'
import { createBookReviewBodySchema } from './create-book-review-schema'

export async function createBookReview(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { score, comment, bookId } = createBookReviewBodySchema.parse(
    request.body
  )

  const createBookReviewUseCase = makeCreateBookReviewUseCase()

  const { assessement } = await createBookReviewUseCase.execute({
    score,
    comment,
    userId: request.user.sub,
    bookId,
  })

  return reply.status(201).send({ assessement })
}
