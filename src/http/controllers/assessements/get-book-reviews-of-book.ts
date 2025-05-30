import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetBookReviewsUseCase } from '@/use-cases/factories/make-get-book-reviews-of-book-use-case'
import { getBookReviewsOfBookParamsSchema } from './get-book-reviews-of-book-schema'

export async function getBookReviewsOfBook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { bookId } = getBookReviewsOfBookParamsSchema.parse(request.params)

  const getBookReviewsUseCase = makeGetBookReviewsUseCase()

  const { assessement } = await getBookReviewsUseCase.execute({
    bookId,
  })

  return reply.status(201).send({ assessement })
}
