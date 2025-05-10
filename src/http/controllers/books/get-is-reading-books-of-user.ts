import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetIsReadingBooksOfUserUseCase } from '@/use-cases/factories/make-get-is-reading-books-use-case'

export async function getIsReadingBooksOfUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getIsReadingBooksOfUserUseCase = makeGetIsReadingBooksOfUserUseCase()

    const { books } = await getIsReadingBooksOfUserUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ books })
  } catch (err) {}
}
