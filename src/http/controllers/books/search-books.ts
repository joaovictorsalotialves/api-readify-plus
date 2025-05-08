import type { FastifyRequest, FastifyReply } from 'fastify'

import { searchBooksQuerySchema } from './search-books-schema'
import { makeSearchBooksUseCase } from '@/use-cases/factories/make-search-books-use-case'

export async function searchBook(request: FastifyRequest, reply: FastifyReply) {
  const { title, categoryId, writerId, page } = searchBooksQuerySchema.parse(
    request.query
  )

  try {
    const searchBookUseCase = makeSearchBooksUseCase()

    const { books } = await searchBookUseCase.execute({
      query: { title, categoryId, writerId },
      page,
    })

    return reply.status(200).send({ books })
  } catch (err) {}
}
