import type { Book } from '@prisma/client'

import type { BooksRepository } from '@/repositories/books-repository'

interface SearchBooksUseCaseRequest {
  query: {
    title?: string
    categoryId?: string
    writerId?: string
  }
  page: number
}

interface SearchBooksUseCaseResponse {
  books: Book[]
}

export class SearchBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    query,
    page,
  }: SearchBooksUseCaseRequest): Promise<SearchBooksUseCaseResponse> {
    const books = await this.booksRepository.searchMany(query, page)

    return { books }
  }
}
