import type { BookCategory } from '@prisma/client'

export interface BookCategoriesRepository {
  findAll(): Promise<BookCategory[]>
}
