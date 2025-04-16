import { generateToken } from '@/utils/generate-token'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const { sub } = request.user

  const token = await generateToken(
    reply,
    {},
    {
      sub,
    }
  )

  const refreshToken = await generateToken(
    reply,
    {},
    {
      sub,
      expiresIn: '7d',
    }
  )

  return reply.status(200).send({
    token,
    refreshToken,
  })
}
