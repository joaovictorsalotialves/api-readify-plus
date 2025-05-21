import type { BooksRepository } from '@/repositories/books-repository'
import type { BooksDTO } from '@/dtos/Book'

interface GetBookUseCaseResponse {
  books: BooksDTO[]
}

export class GetBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(): Promise<GetBookUseCaseResponse> {
    const books = await this.booksRepository.findManyBooks()

    return { books }
  }
}
