import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { RemoveFavoriteBookUseCase } from '../remove-favorite-book-use-case'

export function makeRemoveFavoriteBookUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new RemoveFavoriteBookUseCase(booksRepository)

  return useCase
}
