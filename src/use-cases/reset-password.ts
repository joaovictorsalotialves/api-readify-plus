import type { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidPasswordRecoveryCodeError } from './errors/invalid-password-recovery-code-error'
import { PasswordConfirmationMismatchError } from './errors/password-confirmation-mismatch-error'
import { hash } from 'bcryptjs'
import type { User } from '@prisma/client'

interface ResetPasswordUseCaseRequest {
  userId: string
  passwordRecoveryCode: string
  password: string
  passwordConfirmation: string
}

interface ResetPasswordUseCaseResponse {
  user: User
}

export class ResetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    passwordRecoveryCode,
    password,
    passwordConfirmation,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordRecoveryCodeMatches =
      user.passwordRecoveryCode === passwordRecoveryCode

    if (!doesPasswordRecoveryCodeMatches) {
      throw new InvalidPasswordRecoveryCodeError()
    }

    if (password !== passwordConfirmation) {
      throw new PasswordConfirmationMismatchError()
    }

    const passwordHash = await hash(password, 6)

    user.passwordHash = passwordHash
    user.passwordRecoveryCode = null

    await this.usersRepository.save(user)

    return { user }
  }
}
