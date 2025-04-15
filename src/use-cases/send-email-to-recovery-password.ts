import { compare } from 'bcryptjs'
import type { User } from '@prisma/client'

import type { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { generateRecoveryCode } from '@/utils/generate-recovery-code'

interface SendEmailToRecoveryPasswordUseCaseRequest {
  email: string
}

interface SendEmailToRecoveryPasswordUseCaseResponse {
  user: User
}

export class SendEmailToRecoveryPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: SendEmailToRecoveryPasswordUseCaseRequest): Promise<SendEmailToRecoveryPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const recoveryCode = generateRecoveryCode()
    user.passwordRecoveryCode = recoveryCode

    await this.usersRepository.save(user)

    return {
      user,
    }
  }
}
