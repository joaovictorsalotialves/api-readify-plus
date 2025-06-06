import type { BooksRepository } from '@/repositories/books-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AddFavoriteBookUseCaseRequest {
  userId: string
  bookId: string
}

export class AddFavoriteBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({ bookId, userId }: AddFavoriteBookUseCaseRequest) {
    const book = await this.booksRepository.findById(bookId)

    if (!book) {
      throw new ResourceNotFoundError()
    }

    const addFavorite = await this.booksRepository.addFavoriteBook(
      bookId,
      userId
    )

    if (addFavorite) {
      await this.booksRepository.save(bookId, {
        favorite: (book.favorite ?? 0) + 1,
      })
    }
  }
}
