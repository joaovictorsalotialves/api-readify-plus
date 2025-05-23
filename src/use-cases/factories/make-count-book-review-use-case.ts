import { PrismaAssessementsRepository } from '@/repositories/prisma/prisma-assessements-repository'
import { CountBookReviewOfUserUseCase } from '../count-book-review-of-user-use-case'

export function makeCountBookReviewOfUserUseCase() {
  const assessmentsRepository = new PrismaAssessementsRepository()
  const useCase = new CountBookReviewOfUserUseCase(assessmentsRepository)

  return useCase
}
