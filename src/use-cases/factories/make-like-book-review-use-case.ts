import { PrismaAssessementsRepository } from '@/repositories/prisma/prisma-assessements-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { LikeBookReviewUseCase } from '../like-book-review-use-case'

export function makeLikeBookReviewUseCase() {
  const assessmentsRepository = new PrismaAssessementsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new LikeBookReviewUseCase(
    assessmentsRepository,
    usersRepository
  )

  return useCase
}
