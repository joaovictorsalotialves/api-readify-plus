import type { FastifyInstance } from 'fastify'

import { getBookCategories } from '@/http/controllers/book-categories/get-book-categories'

import { getBookCategoriesDoc } from './docs/get-book-categories'

export async function bookCategoriesRoutes(app: FastifyInstance) {
  app.get('/book-categories', getBookCategoriesDoc, getBookCategories)
}
