import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaReadingSettingRepository } from '@/repositories/prisma/prisma-reading-setting-repository'
import { GetReadingSettingUseCase } from '../get-reading-setting'

export function makeGetReadingSettingUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const readingSettingRepository = new PrismaReadingSettingRepository()
  const useCase = new GetReadingSettingUseCase(
    usersRepository,
    readingSettingRepository
  )

  return useCase
}
