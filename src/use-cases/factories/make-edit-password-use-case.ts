import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { EditPasswordUseCase } from '../edit-password'

export function makeEditPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new EditPasswordUseCase(usersRepository)

  return useCase
}
