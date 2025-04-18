import type { FastifyRequest, FastifyReply } from 'fastify'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeEditUserProfileUseCase } from '@/use-cases/factories/make-edit-user-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { editUserProfileBodySchema } from './edit-user-profile-schema'

export async function editUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, name, email } = editUserProfileBodySchema.parse(
    request.body
  )

  try {
    const editUserProfileUseCase = makeEditUserProfileUseCase()

    const { user } = await editUserProfileUseCase.execute({
      userId: request.user.sub,
      username,
      name,
      email,
    })

    return reply.status(200).send({
      user: {
        ...user,
        passwordHash: undefined,
        passwordRecoveryCode: undefined,
      },
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    throw err
  }
}
