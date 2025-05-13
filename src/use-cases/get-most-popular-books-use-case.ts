import type { Book } from '@prisma/client'

import type { BooksRepository } from '@/repositories/books-repository'

interface GetMostPopularBooksUseCaseResponse {
  books: Book[]
}

export class GetMostPopularBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(): Promise<GetMostPopularBooksUseCaseResponse> {
    const books = await this.booksRepository.findManyMostPopularBooks()

    return { books }
  }
}
