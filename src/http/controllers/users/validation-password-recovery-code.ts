import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeValidationPasswordRecoveryUseCase } from '@/use-cases/factories/make-validation-password-recovery-code-use-case'
import { generateToken } from '@/utils/generate-token'
import { InvalidPasswordRecoveryCodeError } from '@/use-cases/errors/invalid-password-recovery-code-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { validateRecoveryPasswordCodeBodySchema } from './validation-password-recovery-code-schema'

export async function validationRecoverPasswordCode(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify()

  const { sub } = request.user

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
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    if (error instanceof InvalidPasswordRecoveryCodeError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
