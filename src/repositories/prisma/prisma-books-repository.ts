import { prisma } from '@/lib/prisma'

import type { BooksRepository } from '../books-repository'
import type { Book } from '@prisma/client'

export class PrismaBooksRepository implements BooksRepository {
  async findById(id: string) {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })

    return book
  }

  async searchMany(query: {
    title?: string
    categoryId?: string
    writerId?: string
  }) {
    const book = await prisma.book.findMany({
      where: {
        ...(query.title ? { title: { contains: query.title } } : {}),
        ...(query.categoryId ? { bookCategoryId: query.categoryId } : {}),
        ...(query.writerId ? { writerId: query.writerId } : {}),
      },
    })

    return book
  }

  async findManyFavoriteBooksOfUser(userId: string) {
    const favoriteBooks = await prisma.favoriteBooksOfUser.findMany({
      where: {
        userId,
      },
      include: {
        book: {
          select: {
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
            writerId: true,
            bookCategoryId: true,
          },
        },
      },
    })

    const books = favoriteBooks.map(favorite => favorite.book)

    return books
  }

  async findManyIsReadingBooksOfUser(userId: string) {
    const readings = await prisma.reading.findMany({
      where: {
        userId,
      },
      include: {
        book: {
          select: {
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
            writerId: true,
            bookCategoryId: true,
          },
        },
      },
    })

    const books = readings
      .filter(reading => {
        const totalPages = reading.book.numberPage ?? 0
        return reading.lastPageRead < totalPages
      })
      .map(reading => reading.book)

    return books
  }

  async findManyReadBooksOfUser(userId: string) {
    const readings = await prisma.reading.findMany({
      where: {
        userId,
      },
      include: {
        book: {
          select: {
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
            writerId: true,
            bookCategoryId: true,
          },
        },
      },
    })

    const books = readings
      .filter(reading => {
        const totalPages = reading.book.numberPage ?? 0
        return reading.lastPageRead === totalPages
      })
      .map(reading => reading.book)

    return books
  }

  async countReadBooksOfUser(userId: string) {
    const booksRead = await this.findManyReadBooksOfUser(userId)

    return booksRead.length
  }

  async addFavoriteBook(bookId: string, userId: string) {
    const favoriteBooksOfUsers = await this.findManyFavoriteBooksOfUser(userId)

    const alreadyFavorited = favoriteBooksOfUsers.some(
      book => book.id === bookId
    )

    if (!alreadyFavorited) {
      await prisma.favoriteBooksOfUser.create({
        data: {
          userId,
          bookId,
        },
      })
    }
  }

  async removeFavoriteBook(bookId: string, userId: string) {
    await prisma.favoriteBooksOfUser.deleteMany({
      where: {
        userId,
        bookId,
      },
    })
  }

  async addUserVisitBook(book: Book, userId: string) {
    await prisma.userVisitBook.create({
      data: {
        bookId: book.id,
        userId,
      },
    })

    const bookResponse = await prisma.book.update({
      data: {
        ...book,
        visits: (book.visits ?? 0) + 1,
      },
      where: {
        id: book.id,
      },
    })

    return bookResponse
  }

  async findManyMostPopularBooks() {
    const book = await prisma.book.findMany({
      orderBy: {
        visits: 'desc',
      },
      take: 10,
    })

    return book
  }
}
