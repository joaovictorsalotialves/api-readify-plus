import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeResetPasswordUseCase } from '@/use-cases/factories/make-reset-password-use-case'
import { generateToken } from '@/utils/generate-token'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { PasswordConfirmationMismatchError } from '@/use-cases/errors/password-confirmation-mismatch-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function resetPasswordCode(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify()

  const { sub, passwordRecoveryCode } = request.user

  const resetPasswordBodySchema = z.object({
    password: z.string().length(6),
    passwordConfirmation: z.string().length(6),
  })

  const { password, passwordConfirmation } = resetPasswordBodySchema.parse(
    request.body
  )

  try {
    const resetPasswordUseCase = makeResetPasswordUseCase()

    const { user } = await resetPasswordUseCase.execute({
      userId: sub,
      passwordRecoveryCode: passwordRecoveryCode as string,
      password,
      passwordConfirmation,
    })

    const token = await generateToken(
      reply,
      {},
      {
        sub: user.id,
      }
    )

    const refreshToken = await generateToken(
      reply,
      {},
      {
        sub: user.id,
        expiresIn: '7d',
      }
    )

    return reply.status(200).send({
      token,
      refreshToken,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    if (
      err instanceof InvalidCredentialsError ||
      err instanceof PasswordConfirmationMismatchError
    ) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
