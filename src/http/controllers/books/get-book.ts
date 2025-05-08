import type { FastifyRequest, FastifyReply } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetBookUseCase } from '@/use-cases/factories/make-get-book-use-case'
import { getBookParamSchema } from './get-book-schema'

export async function getBook(request: FastifyRequest, reply: FastifyReply) {
  const { bookId } = getBookParamSchema.parse(request.params)

  try {
    const getBookUseCase = makeGetBookUseCase()

    const { book } = await getBookUseCase.execute({ bookId })

    return reply.status(200).send({ book })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }
  }
}
