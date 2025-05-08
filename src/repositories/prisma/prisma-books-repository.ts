import { prisma } from '@/lib/prisma'

import type { BooksRepository } from '../books-repository'

export class PrismaBooksRepository implements BooksRepository {
  async findById(id: string) {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })

    return book
  }

  async searchMany(
    query: {
      title?: string
      categoryId?: string
      writerId?: string
    },
    page: number
  ) {
    const book = await prisma.book.findMany({
      where: {
        ...(query.title ? { title: { contains: query.title } } : {}),
        ...(query.categoryId ? { bookCategoryId: query.categoryId } : {}),
        ...(query.writerId ? { writerId: query.writerId } : {}),
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return book
  }
}
