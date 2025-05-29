import type { BooksRepository } from '@/repositories/books-repository'
import type { ReadingsRepository } from '@/repositories/readings-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import type { Reading } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrCreateReadingUseCaseRequest {
  userId: string
  bookId: string
}

interface GetOrCreateReadingUseCaseResponse {
  reading: Reading
}

export class GetOrCreateReadingUseCase {
  constructor(
    private readingsRepository: ReadingsRepository,
    private usersRepository: UsersRepository,
    private booksRepository: BooksRepository
  ) {}

  async execute({
    userId,
    bookId,
  }: GetOrCreateReadingUseCaseRequest): Promise<GetOrCreateReadingUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const book = await this.booksRepository.findById(bookId)

    if (!user || !book) {
      throw new ResourceNotFoundError()
    }

    let reading = await this.readingsRepository.findByUserIdAndBookId(
      userId,
      bookId
    )

    if (!reading) {
      reading = await this.readingsRepository.create({
        user: userId,
        book: bookId,
        lastPageRead: 1,
        duration: 0,
      })

      await this.booksRepository.save(bookId, { read: book.read + 1 })
    }

    return { reading }
  }
}
