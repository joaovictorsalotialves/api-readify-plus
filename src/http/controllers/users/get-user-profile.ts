import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      user: {
        ...user,
        passwordRecoveryCode: undefined,
        passwordHash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }
  }
}
