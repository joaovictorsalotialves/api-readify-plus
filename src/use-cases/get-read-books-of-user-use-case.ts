import type { Book } from '@prisma/client'

import type { BooksRepository } from '@/repositories/books-repository'

interface GetReadBooksOfUserUseCaseRequest {
  userId: string
}

interface GetReadBooksOfUserUseCaseResponse {
  books: Book[]
}

export class GetReadBooksOfUserUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    userId,
  }: GetReadBooksOfUserUseCaseRequest): Promise<GetReadBooksOfUserUseCaseResponse> {
    const books = await this.booksRepository.findManyReadBooksOfUser(userId)

    return { books }
  }
}
