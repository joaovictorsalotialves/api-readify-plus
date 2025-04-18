import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeSendEmailToRecoverPasswordUseCase } from '@/use-cases/factories/make-send-email-to-recovery-password-use-case'
import { generateToken } from '@/utils/generate-token'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function sendEmailToRecoverPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sendEmailToRecoverPasswordBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = sendEmailToRecoverPasswordBodySchema.parse(request.body)

  try {
    const sendEmailToRecoverPasswordUseCase =
      makeSendEmailToRecoverPasswordUseCase()

    const { user } = await sendEmailToRecoverPasswordUseCase.execute({
      email,
    })

    const recoveryPasswordToken = await generateToken(
      reply,
      {},
      {
        sub: user.id,
      }
    )

    return reply.status(200).send({
      recoveryPasswordToken,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
