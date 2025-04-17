import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeEditPasswordUseCase } from '@/use-cases/factories/make-edit-password-use-case'

export async function editPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editPasswordBodySchema = z.object({
    currentPassword: z.string().min(6),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })

  const { currentPassword, password, passwordConfirmation } =
    editPasswordBodySchema.parse(request.body)

  const editPasswordUseCase = makeEditPasswordUseCase()

  await editPasswordUseCase.execute({
    userId: request.user.sub,
    currentPassword,
    password,
    passwordConfirmation,
  })

  return reply.status(204).send()
}
