import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { AddFavoriteBookUseCase } from '../add-favorite-book-use-case'

export function makeAddFavoriteBookUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new AddFavoriteBookUseCase(booksRepository)

  return useCase
}
