import { prisma } from '@/lib/prisma'
import type { BookCategoriesRepository } from '../book-categories-repository'

export class PrismaBookCategoriesRepository
  implements BookCategoriesRepository
{
  async findAll() {
    const bookCategories = await prisma.bookCategory.findMany()

    return bookCategories
  }
}
