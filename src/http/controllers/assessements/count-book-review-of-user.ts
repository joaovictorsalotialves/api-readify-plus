import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeCountBookReviewOfUserUseCase } from '@/use-cases/factories/make-count-book-review-use-case'

export async function countBookReviewOfUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const countBookReviewOfUserUseCase = makeCountBookReviewOfUserUseCase()

    const { count } = await countBookReviewOfUserUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ count })
  } catch (err) {}
}
