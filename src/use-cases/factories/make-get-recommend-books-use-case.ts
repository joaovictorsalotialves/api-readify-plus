import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { GetRecommendBooksUseCase } from '../get-recommend-books-use-case'
import { GeminiRecommendationProvider } from '@/providers/implementations/GeminiRecommendationProvider'

export function makeGetRecommendBooksUseCase() {
  const recommendationProvider = new GeminiRecommendationProvider()
  const booksRepository = new PrismaBooksRepository()
  const useCase = new GetRecommendBooksUseCase(
    recommendationProvider,
    booksRepository
  )

  return useCase
}
