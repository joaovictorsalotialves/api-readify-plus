import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaReadingSettingRepository } from '@/repositories/prisma/prisma-reading-setting-repository'
import { EditReadingSettingUseCase } from '../edit-reading-setting'

export function makeEditReadingSettingUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const readingSettingRepository = new PrismaReadingSettingRepository()
  const useCase = new EditReadingSettingUseCase(
    usersRepository,
    readingSettingRepository
  )

  return useCase
}
