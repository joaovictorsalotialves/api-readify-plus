import type { FastifyInstance } from 'fastify'

import { searchBook } from '@/http/controllers/books/search-books'
import { getBook } from '@/http/controllers/books/get-book'
import { getFavoriteBooksOfUser } from '@/http/controllers/books/get-favorite-books-of-user'
import { getIsReadingBooksOfUser } from '@/http/controllers/books/get-is-reading-books-of-user'

import { getBookDoc } from './docs/get-book'
import { searchBooksDoc } from './docs/search-books'
import { getFavoriteBooksOfUserDoc } from './docs/get-favorite-books-of-user'
import { getIsReadingBooksOfUserDoc } from './docs/get-is-reading-books-of-user'

export async function booksRoutes(app: FastifyInstance) {
  app.get('/books', searchBooksDoc, searchBook)
  app.get('/books/:bookId', getBookDoc, getBook)
  app.get('/favorite-books', getFavoriteBooksOfUserDoc, getFavoriteBooksOfUser)
  app.get(
    '/is-reading-books',
    getIsReadingBooksOfUserDoc,
    getIsReadingBooksOfUser
  )
}
