import type { BookCategory } from '@prisma/client'
import type { BookCategoriesRepository } from '../book-categories-repository'

export class InMemoryBookCategoriesRepository
  implements BookCategoriesRepository
{
  private item: BookCategory[] = []

  constructor(initialBookCategories: BookCategory[] = []) {
    this.item = initialBookCategories
  }

  async findAll() {
    return this.item
  }
}
