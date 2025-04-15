import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeSendEmailToRecoveryPasswordUseCase } from '@/use-cases/factories/make-send-email-to-recovery-password'

export async function sendEmailToRecoverPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sendEmailToRecoveryPasswordBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = sendEmailToRecoveryPasswordBodySchema.parse(request.body)

  try {
    const sendEmailToRecoveryPasswordUseCase =
      makeSendEmailToRecoveryPasswordUseCase()

    const { user } = await sendEmailToRecoveryPasswordUseCase.execute({
      email,
    })

    const recoveryPasswordToken = await reply.jwtSign(
      {},
      { sign: { sub: user.id } }
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
