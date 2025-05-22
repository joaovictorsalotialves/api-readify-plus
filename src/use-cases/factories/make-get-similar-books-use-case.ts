import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { GeminiSimilarBooksProvider } from '@/providers/implementations/GeminiSimilarBooksProvider'
import { GetSimilarBooksUseCase } from '../get-similar-books-use-case'

export function makeGetSimilarBooksUseCase() {
  const similarProvider = new GeminiSimilarBooksProvider()
  const booksRepository = new PrismaBooksRepository()
  const useCase = new GetSimilarBooksUseCase(booksRepository, similarProvider)

  return useCase
}
