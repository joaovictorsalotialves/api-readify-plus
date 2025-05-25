import { GetOrCreateReadingUseCase } from '../get-or-create-reading'
import { PrismaReadingsRepository } from '@/repositories/prisma/prisma-readings-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'

export function makeGetOrCreateReadingUseCase() {
  const readingsRepository = new PrismaReadingsRepository()
  const usersRepository = new PrismaUsersRepository()
  const booksRepository = new PrismaBooksRepository()

  return new GetOrCreateReadingUseCase(
    readingsRepository,
    usersRepository,
    booksRepository
  )
}
