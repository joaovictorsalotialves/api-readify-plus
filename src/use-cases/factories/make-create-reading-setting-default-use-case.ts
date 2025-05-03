import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaReadingSettingRepository } from '@/repositories/prisma/prisma-reading-setting-repository'
import { CreateReadingSettingDefaultUseCase } from '../create-reading-setting-default'

export function makeCreateReadingSettingDefaultUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const readingSettingRepository = new PrismaReadingSettingRepository()
  const useCase = new CreateReadingSettingDefaultUseCase(
    usersRepository,
    readingSettingRepository
  )

  return useCase
}
