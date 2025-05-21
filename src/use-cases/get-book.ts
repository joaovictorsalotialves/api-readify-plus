import type { Book } from '@prisma/client'

import type { BooksRepository } from '@/repositories/books-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { BooksDTO } from '@/dtos/Book'

interface GetBookUseCaseRequest {
  bookId: string
  userId: string
}

interface GetBookUseCaseResponse {
  book: BooksDTO
  isFavorite: boolean
}

export class GetBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    bookId,
    userId,
  }: GetBookUseCaseRequest): Promise<GetBookUseCaseResponse> {
    const book = await this.booksRepository.findById(bookId)

    if (!book) {
      throw new ResourceNotFoundError()
    }

    const bookResponse = await this.booksRepository.addUserVisitBook(
      book,
      userId
    )

    const isFavorite = await this.booksRepository.isFavoriteBookOfUser(
      book.id,
      userId
    )

    return { book: { ...bookResponse }, isFavorite }
  }
}
