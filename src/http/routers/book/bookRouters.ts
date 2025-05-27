import type { FastifyInstance } from 'fastify'

import { searchBook } from '@/http/controllers/books/search-books'
import { getBook } from '@/http/controllers/books/get-book'
import { getFavoriteBooksOfUser } from '@/http/controllers/books/get-favorite-books-of-user'
import { getIsReadingBooksOfUser } from '@/http/controllers/books/get-is-reading-books-of-user'
import { getReadBooksOfUser } from '@/http/controllers/books/get-read-books-of-user'
import { countReadBooksOfUser } from '@/http/controllers/books/count-read-books-of-user'
import { addFavoriteBook } from '@/http/controllers/books/add-favorite-book'
import { removeFavoriteBook } from '@/http/controllers/books/remove-favorite-book'
import { getBooks } from '@/http/controllers/books/get-books'
import { getRecommendBooks } from '@/http/controllers/books/get-recommend-books'
import { getSimilarBooks } from '@/http/controllers/books/get-similar-books'

import { getBookDoc } from './docs/get-book'
import { searchBooksDoc } from './docs/search-books'
import { getFavoriteBooksOfUserDoc } from './docs/get-favorite-books-of-user'
import { getIsReadingBooksOfUserDoc } from './docs/get-is-reading-books-of-user'
import { getReadBooksOfUserDoc } from './docs/get-read-books-of-user'
import { countReadBooksOfUserDoc } from './docs/count-read-books-of-user'
import { addFavoriteBookDoc } from './docs/add-favorite-book'
import { removeFavoriteBookDoc } from './docs/remove-favorite-book'
import { getMostPopularBooksDoc } from './docs/get-most-popular-books'
import { getMostPopularBooks } from '@/http/controllers/books/get-most-popular-books'
import { getBooksDoc } from './docs/get-books'
import { getRecommendBooksDoc } from './docs/get-recommend-books'
import { getSimilarBooksDoc } from './docs/get-similar-books'

export async function booksRoutes(app: FastifyInstance) {
  app.get('/books', getBooksDoc, getBooks)
  app.get('/books/search', searchBooksDoc, searchBook)
  app.get('/books/:bookId', getBookDoc, getBook)
  app.get('/most-popular-books', getMostPopularBooksDoc, getMostPopularBooks)
  app.get('/favorite-books', getFavoriteBooksOfUserDoc, getFavoriteBooksOfUser)
  app.get(
    '/is-reading-books',
    getIsReadingBooksOfUserDoc,
    getIsReadingBooksOfUser
  )
  app.get('/read-books', getReadBooksOfUserDoc, getReadBooksOfUser)
  app.get('/recommend-books', getRecommendBooksDoc, getRecommendBooks)
  app.get('/similar-books/:bookId', getSimilarBooksDoc, getSimilarBooks)
  app.get('/read-books/count', countReadBooksOfUserDoc, countReadBooksOfUser)

  app.post('/add-favorite-book', addFavoriteBookDoc, addFavoriteBook)
  app.post('/remove-favorite-book', removeFavoriteBookDoc, removeFavoriteBook)
}
