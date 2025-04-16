import type { FastifyReply } from 'fastify'

interface Payload {
  passwordRecoveryCode?: string
}

interface Options {
  sub: string
  expiresIn?: string
}

export async function generateToken(
  reply: FastifyReply,
  { passwordRecoveryCode }: Payload,
  { sub, expiresIn }: Options
): Promise<string> {
  const token = await reply.jwtSign(
    { passwordRecoveryCode: passwordRecoveryCode ?? undefined },
    { sign: { sub, expiresIn: expiresIn ?? '10m' } }
  )

  return token
}
