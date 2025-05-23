import { CreateBookReviewUseCase } from '../create-book-review-use-case'
import { PrismaAssessementsRepository } from '@/repositories/prisma/prisma-assessements-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'

export function makeCreateBookReviewUseCase() {
  const assessmentsRepository = new PrismaAssessementsRepository()
  const usersRepository = new PrismaUsersRepository()
  const booksRepository = new PrismaBooksRepository()
  const useCase = new CreateBookReviewUseCase(
    assessmentsRepository,
    usersRepository,
    booksRepository
  )

  return useCase
}
