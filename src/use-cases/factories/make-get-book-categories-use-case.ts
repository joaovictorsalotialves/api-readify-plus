import { GetBookCategoriesUseCase } from '../get-book-categories-use-case'
import { PrismaBookCategoriesRepository } from '@/repositories/prisma/prisma-book-categories-repository'

export function makeGetBookCategoriesUseCase() {
  const bookCategoriesRepository = new PrismaBookCategoriesRepository()
  const useCase = new GetBookCategoriesUseCase(bookCategoriesRepository)

  return useCase
}
