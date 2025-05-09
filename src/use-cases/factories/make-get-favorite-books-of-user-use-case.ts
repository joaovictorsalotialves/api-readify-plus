import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { GetFavoriteBooksOfUserUseCase } from '../get-favorite-books-of-user-use-case'

export function makeGetFavoriteBooksOfUserUseCase() {
  const booksRepository = new PrismaBooksRepository()
  const useCase = new GetFavoriteBooksOfUserUseCase(booksRepository)

  return useCase
}
