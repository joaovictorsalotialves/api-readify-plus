import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeSendEmailToRecoverPasswordUseCase } from '@/use-cases/factories/make-send-email-to-recovery-password-use-case'
import { generateToken } from '@/utils/generate-token'

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
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
