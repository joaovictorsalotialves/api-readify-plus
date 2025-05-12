import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeAddFavoriteBookUseCase } from '@/use-cases/factories/make-add-favorite-book-use-case'
import { addFavoriteBookBodySchema } from './add-favorite-book-schema'

export async function addFavoriteBook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { bookId } = addFavoriteBookBodySchema.parse(request.body)

  try {
    const addFavoriteBookUseCase = makeAddFavoriteBookUseCase()

    await addFavoriteBookUseCase.execute({
      bookId,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {}
}
