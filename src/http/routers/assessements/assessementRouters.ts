import type { FastifyInstance } from 'fastify'

import { countBookReviewOfUser } from '@/http/controllers/assessements/count-book-review-of-user'
import { likeBookReview } from '@/http/controllers/assessements/like-book-review'
import { removeLikeBookReview } from '@/http/controllers/assessements/remove-like-book-review'
import { createBookReview } from '@/http/controllers/assessements/create-book-review'
import { getBookReviewsOfBook } from '@/http/controllers/assessements/get-book-reviews-of-book'
import { removeBookReview } from '@/http/controllers/assessements/remove-book-review'

import { countBookReviewOfUserDoc } from './docs/count-book-review-of-user'
import { likeBookReviewDoc } from './docs/like-book-review'
import { removeLikeBookReviewDoc } from './docs/remove-like-book-review'
import { createBookReviewDoc } from './docs/create-book-review'
import { getBookReviewsOfBookDoc } from './docs/get-book-reviews-of-book'
import { removeBookReviewDoc } from './docs/remove-book-review'

export async function assessementRoutes(app: FastifyInstance) {
  app.get(
    '/book-reviews/count',
    countBookReviewOfUserDoc,
    countBookReviewOfUser
  )
  app.get(
    '/book-reviews/:bookId',
    getBookReviewsOfBookDoc,
    getBookReviewsOfBook
  )
  app.post('/book-reviews', createBookReviewDoc, createBookReview)
  app.post('/book-reviews/like', likeBookReviewDoc, likeBookReview)
  app.post(
    '/book-reviews/remove-like',
    removeLikeBookReviewDoc,
    removeLikeBookReview
  )
  app.post('/remove-book-review', removeBookReviewDoc, removeBookReview)
}
