import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeResetPasswordUseCase } from '@/use-cases/factories/make-reset-password-use-case'
import { generateToken } from '@/utils/generate-token'

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
}
