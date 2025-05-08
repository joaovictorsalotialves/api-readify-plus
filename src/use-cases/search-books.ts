import type { Book } from '@prisma/client'

import type { BooksRepository } from '@/repositories/books-repository'

interface SearchBookUseCaseRequest {
  query: {
    title: string
    category: string
    writer: string
  }
  page: number
}

interface SearchBookUseCaseResponse {
  books: Book[]
}

export class SearchBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    query,
    page,
  }: SearchBookUseCaseRequest): Promise<SearchBookUseCaseResponse> {
    const books = await this.booksRepository.searchMany(query, page)

    return { books }
  }
}
