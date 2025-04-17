import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeEditUserProfileUseCase } from '@/use-cases/factories/make-edit-user-use-case'

export async function editUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editUserProfileBodySchema = z.object({
    username: z.string(),
    name: z.string(),
    email: z.string().email(),
  })

  const { username, name, email } = editUserProfileBodySchema.parse(
    request.body
  )

  try {
    const registerUseCase = makeEditUserProfileUseCase()

    const { user } = await registerUseCase.execute({
      userId: request.user.sub,
      username,
      name,
      email,
    })

    return reply.status(200).send({
      user: {
        ...user,
        passwordHash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
