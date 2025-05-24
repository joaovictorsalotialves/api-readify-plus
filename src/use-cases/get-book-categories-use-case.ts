import type { BookCategory } from '@prisma/client'

import type { BookCategoriesRepository } from '@/repositories/book-categories-repository'

interface GetBookCategoriesUseCaseResponse {
  bookCategories: BookCategory[]
}

export class GetBookCategoriesUseCase {
  constructor(private bookCategoriesRepository: BookCategoriesRepository) {}

  async execute(): Promise<GetBookCategoriesUseCaseResponse> {
    const bookCategories = await this.bookCategoriesRepository.findAll()

    return { bookCategories }
  }
}
