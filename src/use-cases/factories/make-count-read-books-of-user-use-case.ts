import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { CountReadBooksOfUserUseCase } from '../count-read-books-of-user-use-case'

export function makeCountReadBooksOfUserUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new CountReadBooksOfUserUseCase(booksRepository)

  return useCase
}
