import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { GetMostPopularBooksUseCase } from '../get-most-popular-books-use-case'

export function makeGetMostPopularBooksUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new GetMostPopularBooksUseCase(booksRepository)

  return useCase
}
