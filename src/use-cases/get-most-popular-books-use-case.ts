import type { BooksRepository } from '@/repositories/books-repository'
import type { BooksDTO } from '@/dtos/Book'

interface GetMostPopularBooksUseCaseResponse {
  books: BooksDTO[]
}

export class GetMostPopularBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(): Promise<GetMostPopularBooksUseCaseResponse> {
    const books = await this.booksRepository.findManyMostPopularBooks()

    return { books }
  }
}
