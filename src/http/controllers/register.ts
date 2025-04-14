import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    favoriteCategories: z.array(z.string()).min(2),
    favoriteWriters: z.array(z.string()).min(2),
  })

  const {
    username,
    name,
    email,
    password,
    favoriteCategories,
    favoriteWriters,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      username,
      name,
      email,
      password,
      favoriteCategories: favoriteCategories ?? [],
      favoriteWriters: favoriteWriters ?? [],
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
