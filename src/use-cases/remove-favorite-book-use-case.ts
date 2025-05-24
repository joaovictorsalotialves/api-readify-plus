import type { BooksRepository } from '@/repositories/books-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RemoveFavoriteBookUseCaseRequest {
  userId: string
  bookId: string
}

export class RemoveFavoriteBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({ bookId, userId }: RemoveFavoriteBookUseCaseRequest) {
    const book = await this.booksRepository.findById(bookId)

    if (!book) {
      throw new ResourceNotFoundError()
    }

    await this.booksRepository.removeFavoriteBook(bookId, userId)

    await this.booksRepository.save(bookId, {
      favorite: book.favorite ? book.favorite - 1 : 0,
    })
  }
}
