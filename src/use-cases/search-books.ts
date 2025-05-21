import type { BooksRepository } from '@/repositories/books-repository'
import type { BooksDTO } from '@/dtos/Book'

interface SearchBooksUseCaseRequest {
  query: {
    title?: string
    categoryId?: string
    writerId?: string
  }
}

interface SearchBooksUseCaseResponse {
  books: BooksDTO[]
}

export class SearchBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    query,
  }: SearchBooksUseCaseRequest): Promise<SearchBooksUseCaseResponse> {
    const books = await this.booksRepository.searchMany(query)

    return { books }
  }
}
