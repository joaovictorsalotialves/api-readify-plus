import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetFavoriteBooksOfUserUseCase } from '@/use-cases/factories/make-get-favorite-books-of-user-use-case'

export async function getFavoriteBooksOfUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getFavoriteBooksOfUserUseCase = makeGetFavoriteBooksOfUserUseCase()

    const { books } = await getFavoriteBooksOfUserUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ books })
  } catch (err) {}
}
