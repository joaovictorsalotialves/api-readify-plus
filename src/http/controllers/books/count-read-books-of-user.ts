import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeCountReadBooksOfUserUseCase } from '@/use-cases/factories/make-count-read-books-of-user-use-case'

export async function countReadBooksOfUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const countReadBooksOfUserUseCase = makeCountReadBooksOfUserUseCase()

    const { count } = await countReadBooksOfUserUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ count })
  } catch (err) {}
}
