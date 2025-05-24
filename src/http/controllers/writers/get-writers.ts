import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetWritersUseCase } from '@/use-cases/factories/make-get-writers-use-case'

export async function getWriters(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getWritersCase = makeGetWritersUseCase()

    const { writers } = await getWritersCase.execute()

    return reply.status(200).send({ writers })
  } catch (err) {}
}
