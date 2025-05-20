import type { FastifyInstance } from 'fastify'

import { countBookReviewOfUser } from '@/http/controllers/assessements/count-book-review-of-user'
import { countBookReviewOfUserDoc } from './docs/count-book-review-of-user'

export async function assessementRoutes(app: FastifyInstance) {
  app.get(
    '/book-reviews/count',
    countBookReviewOfUserDoc,
    countBookReviewOfUser
  )
}
