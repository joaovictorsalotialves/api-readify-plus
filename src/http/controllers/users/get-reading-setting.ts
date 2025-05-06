import type { FastifyRequest, FastifyReply } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetReadingSettingUseCase } from '@/use-cases/factories/make-get-reading-setting'

export async function getReadingSetting(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getReadingSettingUseCase = makeGetReadingSettingUseCase()

    const { readingSetting } = await getReadingSettingUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      readingSetting,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }
  }
}
