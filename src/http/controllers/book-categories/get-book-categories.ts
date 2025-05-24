import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetBookCategoriesUseCase } from '@/use-cases/factories/make-get-book-categories-use-case'

export async function getBookCategories(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getBooksUseCase = makeGetBookCategoriesUseCase()

    const { bookCategories } = await getBooksUseCase.execute()

    return reply.status(200).send({ bookCategories })
  } catch (err) {}
}
