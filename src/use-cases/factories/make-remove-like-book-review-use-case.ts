import { PrismaAssessementsRepository } from '@/repositories/prisma/prisma-assessements-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RemoveLikeBookReviewUseCase } from '../remove-like-book-review-use-case'

export function makeRemoveLikeBookReviewUseCase() {
  const assessmentsRepository = new PrismaAssessementsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RemoveLikeBookReviewUseCase(
    assessmentsRepository,
    usersRepository
  )

  return useCase
}
