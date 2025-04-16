import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ValidationPasswordRecoveryCodeUseCase } from '../validation-password-recovery-code'

export function makeValidationPasswordRecoveryUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new ValidationPasswordRecoveryCodeUseCase(usersRepository)

  return useCase
}
