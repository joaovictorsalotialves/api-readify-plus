import type { FastifyInstance } from 'fastify'

import { searchBook } from '@/http/controllers/books/search-books'
import { getBook } from '@/http/controllers/books/get-book'
import { getFavoriteBooksOfUser } from '@/http/controllers/books/get-favorite-books-of-user'
import { getIsReadingBooksOfUser } from '@/http/controllers/books/get-is-reading-books-of-user'
import { getReadBooksOfUser } from '@/http/controllers/books/get-read-books-of-user'
import { countReadBooksOfUser } from '@/http/controllers/books/count-read-books-of-user'
import { addFavoriteBook } from '@/http/controllers/books/add-favorite-book'
import { removeFavoriteBook } from '@/http/controllers/books/remove-favorite-book'

import { getBookDoc } from './docs/get-book'
import { searchBooksDoc } from './docs/search-books'
import { getFavoriteBooksOfUserDoc } from './docs/get-favorite-books-of-user'
import { getIsReadingBooksOfUserDoc } from './docs/get-is-reading-books-of-user'
import { getReadBooksOfUserDoc } from './docs/get-read-books-of-user'
import { countReadBooksOfUserDoc } from './docs/count-read-books-of-user'
import { addFavoriteBookDoc } from './docs/add-favorite-book'
import { removeFavoriteBookDoc } from './docs/remove-favorite-book'

export async function booksRoutes(app: FastifyInstance) {
  app.get('/books', searchBooksDoc, searchBook)
  app.get('/books/:bookId', getBookDoc, getBook)
  app.get('/favorite-books', getFavoriteBooksOfUserDoc, getFavoriteBooksOfUser)
  app.get(
    '/is-reading-books',
    getIsReadingBooksOfUserDoc,
    getIsReadingBooksOfUser
  )
  app.get('/read-books', getReadBooksOfUserDoc, getReadBooksOfUser)
  app.get('/read-books/count', countReadBooksOfUserDoc, countReadBooksOfUser)

  app.post('/add-favorite-book', addFavoriteBookDoc, addFavoriteBook)
  app.delete('/remove-favorite-book', removeFavoriteBookDoc, removeFavoriteBook)
}
