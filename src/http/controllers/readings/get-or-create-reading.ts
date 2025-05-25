import type { FastifyRequest, FastifyReply } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrCreateReadingUseCase } from '@/use-cases/factories/make-get-or-create-reading-use-case'
import { getOrCreateReadingParamsSchema } from './get-or-create-reading-schema'

export async function getOrCreateReading(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { bookId } = getOrCreateReadingParamsSchema.parse(request.params)

  try {
    const getOrCreateReadingUseCase = makeGetOrCreateReadingUseCase()

    const { reading } = await getOrCreateReadingUseCase.execute({
      userId: request.user.sub,
      bookId,
    })

    return reply.status(200).send({ reading })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    throw err
  }
}
