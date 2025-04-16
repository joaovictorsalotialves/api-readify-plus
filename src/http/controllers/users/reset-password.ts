import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeResetPasswordUseCase } from '@/use-cases/factories/make-reset-password-use-case'
import { generateTokens } from '@/utils/generate-tokens'

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

  const { token, refreshToken } = await generateTokens(reply, {
    sub: user.id,
  })

  return reply.status(200).send({
    token,
    refreshToken,
  })
}
