import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetReadBooksOfUserUseCase } from '@/use-cases/factories/make-get-read-books-of-user-use-case'

export async function getReadBooksOfUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getReadBooksOfUserUseCase = makeGetReadBooksOfUserUseCase()

    const { books } = await getReadBooksOfUserUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ books })
  } catch (err) {}
}
