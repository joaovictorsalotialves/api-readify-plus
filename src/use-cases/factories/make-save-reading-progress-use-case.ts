import { PrismaReadingsRepository } from '@/repositories/prisma/prisma-readings-repository'
import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { SaveReadingProgressUseCase } from '../save-reading-progress'

export function makeSaveReadingProgressUseCase() {
  const readingsRepository = new PrismaReadingsRepository()
  const booksRepository = new PrismaBooksRepository()

  return new SaveReadingProgressUseCase(readingsRepository, booksRepository)
}
