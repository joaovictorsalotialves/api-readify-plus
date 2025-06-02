import type { UsersRepository } from '@/repositories/users-repository'
import type { AssessementsRepository } from '@/repositories/assessements-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'
import type { BooksRepository } from '@/repositories/books-repository'

interface RemoveBookReviewUseCaseRequest {
  assessementId: string
  userId: string
}

export class RemoveBookReviewUseCase {
  constructor(
    private assessementsRepository: AssessementsRepository,
    private usersRepository: UsersRepository,
    private bookRepository: BooksRepository
  ) {}

  async execute({
    assessementId,
    userId,
  }: RemoveBookReviewUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)
    const assessement =
      await this.assessementsRepository.findById(assessementId)

    if (!user || !assessement) {
      throw new ResourceNotFoundError()
    }

    const book = await this.bookRepository.findById(assessement?.bookId)

    if (!book) {
      throw new ResourceNotFoundError()
    }

    if (user.id !== assessement.userId) {
      throw new UnauthorizedError()
    }

    await this.bookRepository.save(assessement.bookId, {
      assessements: book.assessements - 1,
    })

    await this.assessementsRepository.remove(assessementId)
  }
}
