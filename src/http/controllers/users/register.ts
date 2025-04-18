import type { FastifyRequest, FastifyReply } from 'fastify'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { PasswordConfirmationMismatchError } from '@/use-cases/errors/password-confirmation-mismatch-error'
import { registerBodySchema } from './register-schema'
import { generateToken } from '@/utils/generate-token'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const {
    username,
    name,
    email,
    password,
    passwordConfirmation,
    favoriteCategories,
    favoriteWriters,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    const { user } = await registerUseCase.execute({
      username,
      name,
      email,
      password,
      passwordConfirmation,
      favoriteCategories,
      favoriteWriters,
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

    return reply.status(201).send({
      token,
      refreshToken,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    if (err instanceof PasswordConfirmationMismatchError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
