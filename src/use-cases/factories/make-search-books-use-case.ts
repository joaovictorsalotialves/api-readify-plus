import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { SearchBooksUseCase } from '../search-books'

export function makeSearchBooksUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new SearchBooksUseCase(booksRepository)

  return useCase
}
