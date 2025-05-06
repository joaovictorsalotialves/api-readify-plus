import type { FastifyRequest, FastifyReply } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeEditReadingSettingUseCase } from '@/use-cases/factories/make-edit-reading-setting'
import {
  editReadingSettingBodySchema,
  editReadingSettingParamSchema,
} from './edit-reading-setting-schema'

export async function editReadingSetting(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = editReadingSettingParamSchema.parse(request.params)

  const { fontFamily, fontSize, fontSpacing, screenBrightness, theme } =
    editReadingSettingBodySchema.parse(request.body)

  try {
    const editReadingSettingUseCase = makeEditReadingSettingUseCase()

    const { readingSetting } = await editReadingSettingUseCase.execute({
      id,
      fontFamily,
      fontSize,
      fontSpacing,
      screenBrightness,
      theme,
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
