import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetRecommendBooksUseCase } from '@/use-cases/factories/make-get-recommend-books-use-case'

export async function getRecommendBooks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getRecommendBooksUseCase = makeGetRecommendBooksUseCase()

  const { books } = await getRecommendBooksUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ books })
}
