import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeEditPasswordUseCase } from '@/use-cases/factories/make-edit-password-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { PasswordConfirmationMismatchError } from '@/use-cases/errors/password-confirmation-mismatch-error'
import { editPasswordBodySchema } from './edit-password-schema'

export async function editPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { currentPassword, password, passwordConfirmation } =
    editPasswordBodySchema.parse(request.body)

  try {
    const editPasswordUseCase = makeEditPasswordUseCase()

    await editPasswordUseCase.execute({
      userId: request.user.sub,
      currentPassword,
      password,
      passwordConfirmation,
    })

    return reply.status(204).send()
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
