import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetBooksUseCase } from '@/use-cases/factories/make-get-books-use-case'

export async function getBooks(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getBooksUseCase = makeGetBooksUseCase()

    const { books } = await getBooksUseCase.execute()

    return reply.status(200).send({ books })
  } catch (err) {}
}
