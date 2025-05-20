import type { BooksRepository } from '@/repositories/books-repository'

interface CountReadBooksOfUserUseCaseRequest {
  userId: string
}

interface CountReadBooksOfUserUseCaseResponse {
  count: number
}

export class CountReadBooksOfUserUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    userId,
  }: CountReadBooksOfUserUseCaseRequest): Promise<CountReadBooksOfUserUseCaseResponse> {
    const count = await this.booksRepository.countReadBooksOfUser(userId)

    return { count }
  }
}
