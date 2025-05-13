import type { Book } from '@prisma/client'
import type { BooksRepository } from '../books-repository' // ajuste o caminho conforme necessário

interface FavoriteBooksOfUser {
  bookId: string
  userId: string
}

interface ReadingOfUser {
  bookId: string
  userId: string
  lastPageRead: number
}

interface UserVisitBook {
  bookId: string
  userId: string
}

export class InMemoryBooksRepository implements BooksRepository {
  private books: Book[] = []
  private favoriteBooksOfUsers: FavoriteBooksOfUser[] = []
  private readingsOfUsers: ReadingOfUser[] = []
  private userVisitBooks: UserVisitBook[] = []

  constructor(
    initialBooks: Book[] = [],
    initialFavorites: FavoriteBooksOfUser[] = [],
    initialReadings: ReadingOfUser[] = [],
    initialVisits: UserVisitBook[] = []
  ) {
    this.books = initialBooks
    this.favoriteBooksOfUsers = initialFavorites
    this.readingsOfUsers = initialReadings
    this.userVisitBooks = initialVisits
  }

  async findById(id: string): Promise<Book | null> {
    const book = this.books.find(book => book.id === id)

    if (!book) {
      return null
    }

    return book
  }

  async searchMany(query: {
    title: string
    categoryId: string
    writerId: string
  }) {
    const filtered = this.books.filter(
      book =>
        book.title.toLowerCase().includes(query.title.toLowerCase()) &&
        book.bookCategoryId &&
        book.writerId
    )
    return filtered.length > 0 ? filtered : []
  }

  async findManyFavoriteBooksOfUser(userId: string) {
    const favoriteBookIds = this.favoriteBooksOfUsers
      .filter(favorite => favorite.userId === userId)
      .map(favorite => favorite.bookId)

    const books = this.books.filter(book => favoriteBookIds.includes(book.id))

    return books
  }

  async findManyIsReadingBooksOfUser(userId: string): Promise<Book[]> {
    const readingBookIds = this.readingsOfUsers
      .filter(reading => reading.userId === userId)
      .filter(reading => {
        const book = this.books.find(book => book.id === reading.bookId)
        return book && reading.lastPageRead < (book.numberPage ?? 0)
      })
      .map(reading => reading.bookId)

    const books = this.books.filter(book => readingBookIds.includes(book.id))

    return books
  }

  async findManyReadBooksOfUser(userId: string): Promise<Book[]> {
    const readingBookIds = this.readingsOfUsers
      .filter(reading => reading.userId === userId)
      .filter(reading => {
        const book = this.books.find(book => book.id === reading.bookId)
        return book && reading.lastPageRead === (book.numberPage ?? 0)
      })
      .map(reading => reading.bookId)

    const books = this.books.filter(book => readingBookIds.includes(book.id))

    return books
  }

  async countReadBooksOfUser(userId: string) {
    const booksRead = await this.findManyReadBooksOfUser(userId)

    return booksRead.length
  }

  async addFavoriteBook(bookId: string, userId: string) {
    const alreadyFavorited = this.favoriteBooksOfUsers.some(
      favorite => favorite.userId === userId && favorite.bookId === bookId
    )

    if (!alreadyFavorited) {
      this.favoriteBooksOfUsers.push({ bookId, userId })
    }
  }

  async removeFavoriteBook(bookId: string, userId: string) {
    this.favoriteBooksOfUsers = this.favoriteBooksOfUsers.filter(
      favorite => !(favorite.userId === userId && favorite.bookId === bookId)
    )
  }

  async addUserVisitBook(book: Book, userId: string) {
    this.userVisitBooks.push({ bookId: book.id, userId })

    const bookIndex = this.books.findIndex(b => b.id === book.id)

    if (bookIndex !== -1) {
      this.books[bookIndex] = {
        ...this.books[bookIndex],
        visits: (this.books[bookIndex].visits ?? 0) + 1,
      }

      return this.books[bookIndex]
    }

    return this.books[bookIndex]
  }
}
