import { generateTokens } from '@/utils/generate-tokens'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const { sub } = request.user

  const { token, refreshToken } = await generateTokens(reply, {
    sub,
  })

  return reply.status(200).send({
    token,
    refreshToken,
  })
}
