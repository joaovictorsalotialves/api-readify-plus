import type { Book } from '@prisma/client'

import type { BooksRepository } from '@/repositories/books-repository'

interface GetFavoriteBooksOfUserUseCaseRequest {
  userId: string
}

interface GetFavoriteBooksOfUserUseCaseResponse {
  books: Book[]
}

export class GetFavoriteBooksOfUserUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    userId,
  }: GetFavoriteBooksOfUserUseCaseRequest): Promise<GetFavoriteBooksOfUserUseCaseResponse> {
    const books = await this.booksRepository.findManyFavoriteBooksOfUser(userId)

    return { books }
  }
}
