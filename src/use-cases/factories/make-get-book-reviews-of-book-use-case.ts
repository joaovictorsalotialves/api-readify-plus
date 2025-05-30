import { PrismaAssessementsRepository } from '@/repositories/prisma/prisma-assessements-repository'
import { GetBookReviewsUseCase } from '../get-book-reviews-of-book-use-case'

export function makeGetBookReviewsUseCase() {
  const assessmentsRepository = new PrismaAssessementsRepository()
  const useCase = new GetBookReviewsUseCase(assessmentsRepository)

  return useCase
}
