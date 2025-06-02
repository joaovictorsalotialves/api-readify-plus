import { PrismaAssessementsRepository } from '@/repositories/prisma/prisma-assessements-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RemoveBookReviewUseCase } from '../remove-book-review-use-case'
import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'

export function makeRemoveBookReviewUseCase() {
  const assessmentsRepository = new PrismaAssessementsRepository()
  const usersRepository = new PrismaUsersRepository()
  const booksRepository = new PrismaBooksRepository()
  const useCase = new RemoveBookReviewUseCase(
    assessmentsRepository,
    usersRepository,
    booksRepository
  )

  return useCase
}
