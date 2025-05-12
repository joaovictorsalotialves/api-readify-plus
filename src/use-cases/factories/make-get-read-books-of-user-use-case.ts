import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { GetReadBooksOfUserUseCase } from '../get-read-books-of-user-use-case'

export function makeGetReadBooksOfUserUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new GetReadBooksOfUserUseCase(booksRepository)

  return useCase
}
