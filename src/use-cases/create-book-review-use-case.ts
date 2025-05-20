import type { UsersRepository } from '@/repositories/users-repository'
import type { AssessementsRepository } from '@/repositories/assessements-repository'
import type { BooksRepository } from '@/repositories/books-repository'
import type { Assessement } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateBookReviewUseCaseRequest {
  score: number
  comment: string
  likes: number
  userId: string
  bookId: string
}

interface CreateBookReviewUseCaseResponse {
  assessement: Assessement
}

export class CreateBookReviewUseCase {
  constructor(
    private assessementsRepository: AssessementsRepository,
    private usersRepository: UsersRepository,
    private booksRepository: BooksRepository
  ) {}

  async execute({
    score,
    comment,
    likes,
    userId,
    bookId,
  }: CreateBookReviewUseCaseRequest): Promise<CreateBookReviewUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const book = await this.booksRepository.findById(bookId)

    if (!user || !book) {
      throw new ResourceNotFoundError()
    }

    const assessement = await this.assessementsRepository.create({
      score,
      comment,
      likes,
      user: userId,
      book: bookId,
    })

    return { assessement }
  }
}
