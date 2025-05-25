import type { FastifyRequest, FastifyReply } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSaveReadingProgressUseCase } from '@/use-cases/factories/make-save-reading-progress-use-case'
import {
  saveReadingProgressBodySchema,
  saveReadingProgressParamsSchema,
} from './save-reading-progress-schema'

export async function saveReadingProgress(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { readingId } = saveReadingProgressParamsSchema.parse(request.params)
  const { lastPageRead, duration } = saveReadingProgressBodySchema.parse(
    request.body
  )

  try {
    const saveReadingProgressUseCase = makeSaveReadingProgressUseCase()

    const { reading } = await saveReadingProgressUseCase.execute({
      readingId,
      lastPageRead,
      duration,
    })

    return reply.status(200).send({ reading })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
