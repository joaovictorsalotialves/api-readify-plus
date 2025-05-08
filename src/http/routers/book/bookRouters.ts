import type { FastifyInstance } from 'fastify'

import { searchBook } from '@/http/controllers/books/search-books'
import { getBook } from '@/http/controllers/books/get-book'

import { getBookDoc } from './docs/get-book'
import { searchBooksDoc } from './docs/search-books'

export async function booksRoutes(app: FastifyInstance) {
  app.get('/books', searchBooksDoc, searchBook)
  app.get('/books/:bookId', getBookDoc, getBook)
}
