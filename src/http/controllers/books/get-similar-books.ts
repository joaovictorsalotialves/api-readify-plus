import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetSimilarBooksUseCase } from '@/use-cases/factories/make-get-similar-books-use-case'
import { getSimilarBooksParamSchema } from './get-similar-books-schema'

export async function getSimilarBooks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { bookId } = getSimilarBooksParamSchema.parse(request.params)

  try {
    const getSimilarBooksUseCase = makeGetSimilarBooksUseCase()

    const { books } = await getSimilarBooksUseCase.execute({
      bookId,
    })

    return reply.status(200).send({ books })
  } catch {}
}
