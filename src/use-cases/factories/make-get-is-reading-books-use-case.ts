import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { GetIsReadingBooksOfUserUseCase } from '../get-is-reading-books-of-user-use-case'

export function makeGetIsReadingBooksOfUserUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new GetIsReadingBooksOfUserUseCase(booksRepository)

  return useCase
}
