import type { Book } from '@prisma/client'

import type { BooksRepository } from '@/repositories/books-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetBookUseCaseRequest {
  bookId: string
  userId: string
}

interface GetBookUseCaseResponse {
  book: Book
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

    console.log(bookResponse)

    return { book: { ...bookResponse } }
  }
}
