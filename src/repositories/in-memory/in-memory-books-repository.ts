import type { Book } from '@prisma/client'
import type { BooksRepository } from '../books-repository'
import type { BooksDTO } from '@/dtos/Book'

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

interface Writer {
  id: string
  name: string
}

interface BookCategory {
  id: string
  name: string
}

export class InMemoryBooksRepository implements BooksRepository {
  private books: Book[] = []
  private favoriteBooksOfUsers: FavoriteBooksOfUser[] = []
  private readingsOfUsers: ReadingOfUser[] = []
  private userVisitBooks: UserVisitBook[] = []
  private writers: Writer[] = []
  private bookCategories: BookCategory[] = []

  constructor(
    initialBooks: Book[] = [],
    initialFavorites: FavoriteBooksOfUser[] = [],
    initialReadings: ReadingOfUser[] = [],
    initialVisits: UserVisitBook[] = [],
    initialWriters: Writer[] = [],
    initialBookCategories: BookCategory[] = []
  ) {
    this.books = initialBooks
    this.favoriteBooksOfUsers = initialFavorites
    this.readingsOfUsers = initialReadings
    this.userVisitBooks = initialVisits
    this.writers = initialWriters
    this.bookCategories = initialBookCategories
  }

  private mapToDTO(book: Book): BooksDTO {
    const writer = this.writers.find(w => w.id === book.writerId)
    const category = this.bookCategories.find(c => c.id === book.bookCategoryId)

    return {
      id: book.id,
      title: book.title,
      urlCover: book.urlCover,
      bookPath: book.bookPath,
      synopsis: book.synopsis,
      publisher: book.publisher,
      numberPage: book.numberPage,
      language: book.language,
      ISBN: book.ISBN,
      score: book.score ?? 0,
      visits: book.visits ?? 0,
      read: book.read ?? 0,
      favorite: book.favorite ?? 0,
      assessements: book.assessements ?? 0,
      writer: {
        id: writer?.id ?? '',
        name: writer?.name ?? '',
      },
      category: {
        id: category?.id ?? '',
        name: category?.name ?? '',
      },
    }
  }

  async findById(id: string) {
    const book = this.books.find(book => book.id === id)
    return book ? this.mapToDTO(book) : null
  }

  async findByTitle(title: string) {
    const book = this.books.find(book => book.title === title)
    return book ? this.mapToDTO(book) : null
  }

  async findManyBooks() {
    return this.books.map(this.mapToDTO.bind(this))
  }

  async searchMany(query: {
    title: string
    categoryId: string
    writerId: string
  }) {
    const filtered = this.books.filter(
      book =>
        book.title.toLowerCase().includes(query.title.toLowerCase()) &&
        book.bookCategoryId === query.categoryId &&
        book.writerId === query.writerId
    )

    return filtered.map(this.mapToDTO.bind(this))
  }

  async findManyFavoriteBooksOfUser(userId: string) {
    const favoriteBookIds = this.favoriteBooksOfUsers
      .filter(favorite => favorite.userId === userId)
      .map(favorite => favorite.bookId)

    const books = this.books.filter(book => favoriteBookIds.includes(book.id))

    return books.map(this.mapToDTO.bind(this))
  }

  async findManyIsReadingBooksOfUser(userId: string) {
    const readingBookIds = this.readingsOfUsers
      .filter(reading => reading.userId === userId)
      .filter(reading => {
        const book = this.books.find(book => book.id === reading.bookId)
        return book && reading.lastPageRead < (book.numberPage ?? 0)
      })
      .map(reading => reading.bookId)

    const books = this.books.filter(book => readingBookIds.includes(book.id))

    return books.map(this.mapToDTO.bind(this))
  }

  async findManyReadBooksOfUser(userId: string) {
    const readingBookIds = this.readingsOfUsers
      .filter(reading => reading.userId === userId)
      .filter(reading => {
        const book = this.books.find(book => book.id === reading.bookId)
        return book && reading.lastPageRead === (book.numberPage ?? 0)
      })
      .map(reading => reading.bookId)

    const books = this.books.filter(book => readingBookIds.includes(book.id))

    return books.map(this.mapToDTO.bind(this))
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

  async addUserVisitBook(book: BooksDTO, userId: string): Promise<BooksDTO> {
    this.userVisitBooks.push({ bookId: book.id, userId })

    const bookIndex = this.books.findIndex(b => b.id === book.id)

    if (bookIndex !== -1) {
      this.books[bookIndex] = {
        ...this.books[bookIndex],
        visits: (this.books[bookIndex].visits ?? 0) + 1,
      }

      return this.mapToDTO(this.books[bookIndex])
    }

    return {
      ...book,
      visits: book.visits + 1,
    }
  }

  async findManyMostPopularBooks() {
    const sortedBooks = [...this.books].sort(
      (a, b) => (b.visits ?? 0) - (a.visits ?? 0)
    )
    return sortedBooks.slice(0, 10).map(this.mapToDTO.bind(this))
  }

  async isFavoriteBookOfUser(bookId: string, userId: string) {
    return this.favoriteBooksOfUsers.some(
      favorite => favorite.userId === userId && favorite.bookId === bookId
    )
  }

  async save(bookId: string, data: Partial<Book>): Promise<BooksDTO> {
    const bookIndex = this.books.findIndex(book => book.id === bookId)

    if (bookIndex >= 0) {
      this.books[bookIndex] = {
        ...this.books[bookIndex],
        ...data,
      }
    }

    return this.mapToDTO(this.books[bookIndex])
  }
}
