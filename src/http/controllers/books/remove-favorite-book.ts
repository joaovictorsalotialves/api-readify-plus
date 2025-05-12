import type { FastifyRequest, FastifyReply } from 'fastify'

import { removeFavoriteBookBodySchema } from './remove-favorite-book-schema'
import { makeRemoveFavoriteBookUseCase } from '@/use-cases/factories/make-remove-favorite-book-use-case'

export async function removeFavoriteBook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { bookId } = removeFavoriteBookBodySchema.parse(request.body)

  try {
    const removeFavoriteBookUseCase = makeRemoveFavoriteBookUseCase()

    await removeFavoriteBookUseCase.execute({
      bookId,
      userId: request.user.sub,
    })

    return reply.status(204).send()
  } catch (err) {}
}
