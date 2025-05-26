import { prisma } from '@/lib/prisma'
import type { BooksRepository } from '../books-repository'
import type { BooksDTO } from '@/dtos/Book'
import type { Prisma } from '@prisma/client'

export class PrismaBooksRepository implements BooksRepository {
  private bookSelect = {
    id: true,
    title: true,
    urlCover: true,
    bookPath: true,
    synopsis: true,
    publisher: true,
    numberPage: true,
    language: true,
    ISBN: true,
    visits: true,
    score: true,
    assessements: true,
    read: true,
    favorite: true,
    writer: {
      select: {
        id: true,
        name: true,
      },
    },
    category: {
      select: {
        id: true,
        name: true,
      },
    },
  }

  async findById(id: string): Promise<BooksDTO | null> {
    const book = await prisma.book.findUnique({
      where: { id },
      select: this.bookSelect,
    })

    if (!book) return null

    return book
  }

  async findByTitle(title: string) {
    const book = await prisma.book.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive',
        },
      },
      select: this.bookSelect,
    })

    if (!book) return null

    return book
  }

  async findManyBooks(): Promise<BooksDTO[]> {
    const books = await prisma.book.findMany({
      select: this.bookSelect,
    })

    return books
  }

  async searchMany(query: {
    title?: string
    categoryId?: string
    writerId?: string
  }): Promise<BooksDTO[]> {
    const books = await prisma.book.findMany({
      where: {
        ...(query.title && {
          title: { contains: query.title, mode: 'insensitive' },
        }),
        ...(query.categoryId && { bookCategoryId: query.categoryId }),
        ...(query.writerId && { writerId: query.writerId }),
      },
      select: this.bookSelect,
    })

    return books
  }

  async findManyFavoriteBooksOfUser(userId: string): Promise<BooksDTO[]> {
    const favorites = await prisma.favoriteBooksOfUser.findMany({
      where: { userId },
      include: {
        book: { select: this.bookSelect },
      },
    })

    return favorites.map(favorite => favorite.book)
  }

  async findManyIsReadingBooksOfUser(userId: string): Promise<BooksDTO[]> {
    const readings = await prisma.reading.findMany({
      where: { userId },
      include: {
        book: { select: this.bookSelect },
      },
    })

    return readings
      .filter(reading => (reading.book.numberPage ?? 0) > reading.lastPageRead)
      .map(favorite => favorite.book)
  }

  async findManyReadBooksOfUser(userId: string): Promise<BooksDTO[]> {
    const readings = await prisma.reading.findMany({
      where: { userId },
      include: {
        book: { select: this.bookSelect },
      },
    })

    return readings
      .filter(
        reading => (reading.book.numberPage ?? 0) === reading.lastPageRead
      )
      .map(favorite => favorite.book)
  }

  async countReadBooksOfUser(userId: string): Promise<number> {
    const readBooks = await this.findManyReadBooksOfUser(userId)
    return readBooks.length
  }

  async addFavoriteBook(bookId: string, userId: string) {
    const isAlreadyFavorite = await this.isFavoriteBookOfUser(bookId, userId)

    if (!isAlreadyFavorite) {
      await prisma.favoriteBooksOfUser.create({
        data: { userId, bookId },
      })

      return true
    }

    return false
  }

  async removeFavoriteBook(bookId: string, userId: string) {
    const isAlreadyFavorite = await this.isFavoriteBookOfUser(bookId, userId)

    if (isAlreadyFavorite) {
      await prisma.favoriteBooksOfUser.deleteMany({
        where: { userId, bookId },
      })

      return true
    }

    return false
  }

  async addUserVisitBook(book: BooksDTO, userId: string) {
    await prisma.userVisitBook.create({
      data: {
        userId,
        bookId: book.id,
      },
    })

    const updatedBook = await this.save(book.id, {
      visits: (book.visits ?? 0) + 1,
    })

    return updatedBook
  }

  async findManyMostPopularBooks(): Promise<BooksDTO[]> {
    const books = await prisma.book.findMany({
      orderBy: { read: 'desc', assessements: 'desc', visits: 'desc' },
      take: 10,
      select: this.bookSelect,
    })

    return books
  }

  async isFavoriteBookOfUser(bookId: string, userId: string) {
    const favorite = await prisma.favoriteBooksOfUser.findFirst({
      where: { bookId, userId },
    })

    return !!favorite
  }

  async save(bookId: string, data: Prisma.BookUpdateInput) {
    await prisma.book.update({
      data,
      where: {
        id: bookId,
      },
    })

    const book = await this.findById(bookId)

    return book as BooksDTO
  }
}
