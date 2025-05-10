import type { Book } from '@prisma/client'

import type { BooksRepository } from '@/repositories/books-repository'

interface GetIsReadingBooksOfUserUseCaseRequest {
  userId: string
}

interface GetIsReadingBooksOfUserUseCaseResponse {
  books: Book[]
}

export class GetIsReadingBooksOfUserUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    userId,
  }: GetIsReadingBooksOfUserUseCaseRequest): Promise<GetIsReadingBooksOfUserUseCaseResponse> {
    const books =
      await this.booksRepository.findManyIsReadingBooksOfUser(userId)

    return { books }
  }
}
