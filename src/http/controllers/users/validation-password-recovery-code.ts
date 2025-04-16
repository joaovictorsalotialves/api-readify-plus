import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeValidationPasswordRecoveryUseCase } from '@/use-cases/factories/make-validation-password-recovery-code-use-case'
import { generateToken } from '@/utils/generate-token'

export async function validationRecoverPasswordCode(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify()

  const { sub } = request.user

  const validateRecoveryPasswordCodeBodySchema = z.object({
    passwordRecoveryCode: z.string().length(6),
  })

  const { passwordRecoveryCode } = validateRecoveryPasswordCodeBodySchema.parse(
    request.body
  )

  try {
    const validationPasswordRecoveryUseCase =
      makeValidationPasswordRecoveryUseCase()

    const { user } = await validationPasswordRecoveryUseCase.execute({
      userId: sub,
      passwordRecoveryCode,
    })

    const resetPasswordToken = await generateToken(
      reply,
      { passwordRecoveryCode: user.passwordRecoveryCode as string },
      {
        sub: user.id,
      }
    )

    return reply.status(200).send({
      resetPasswordToken,
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
