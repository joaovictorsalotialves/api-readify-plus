import { makeGetMostPopularBooksUseCase } from '@/use-cases/factories/make-get-most-popular-books-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getMostPopularBooks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getMostPopularBooksUseCase = makeGetMostPopularBooksUseCase()

    const { books } = await getMostPopularBooksUseCase.execute()

    return reply.status(200).send({ books })
  } catch (err) {
    console.log(err)
  }
}
