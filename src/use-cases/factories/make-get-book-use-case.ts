import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { GetBookUseCase } from '../get-book'

export function makeGetBookUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new GetBookUseCase(booksRepository)

  return useCase
}
