import type { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { generateToken } from '@/utils/generate-token'
import { authenticateBodySchema } from './authenticate-schema'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
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
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
