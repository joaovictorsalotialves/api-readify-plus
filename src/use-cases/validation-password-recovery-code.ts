import type { User } from '@prisma/client'

import type { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidPasswordRecoveryCodeError } from './errors/invalid-password-recovery-code-error'

interface ValidationPasswordRecoveryCodeUseCaseRequest {
  userId: string
  passwordRecoveryCode: string
}

interface ValidationPasswordRecoveryCodeUseCaseResponse {
  user: User
}

export class ValidationPasswordRecoveryCodeUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    passwordRecoveryCode,
  }: ValidationPasswordRecoveryCodeUseCaseRequest): Promise<ValidationPasswordRecoveryCodeUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordRecoveryCodeMatches =
      user.passwordRecoveryCode === passwordRecoveryCode

    if (!doesPasswordRecoveryCodeMatches) {
      throw new InvalidPasswordRecoveryCodeError()
    }

    return { user }
  }
}
