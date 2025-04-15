import type { FastifyReply } from 'fastify'

interface Payload {
  sub: string
}

export async function generateTokens(
  reply: FastifyReply,
  { sub }: Payload
): Promise<{ token: string; refreshToken: string }> {
  const token = await reply.jwtSign({}, { sign: { sub: sub } })
  const refreshToken = await reply.jwtSign(
    {},
    { sign: { sub: sub, expiresIn: '7d' } }
  )

  return { token, refreshToken }
}
