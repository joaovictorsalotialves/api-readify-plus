import { compare, hash } from 'bcryptjs'
import type { User } from '@prisma/client'
import type { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidPasswordRecoveryCodeError } from './errors/invalid-password-recovery-code-error'
import { PasswordConfirmationMismatchError } from './errors/password-confirmation-mismatch-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface EditPasswordUseCaseRequest {
  userId: string
  currentPassword: string
  password: string
  passwordConfirmation: string
}

interface EditPasswordUseCaseResponse {
  user: User
}

export class EditPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    currentPassword,
    password,
    passwordConfirmation,
  }: EditPasswordUseCaseRequest): Promise<EditPasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const doesCurrentPasswordMatches = await compare(
      currentPassword,
      user.passwordHash
    )

    if (!doesCurrentPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    if (password !== passwordConfirmation) {
      throw new PasswordConfirmationMismatchError()
    }

    const passwordHash = await hash(password, 6)

    user.passwordHash = passwordHash
    user.passwordRecoveryCode = null

    await this.usersRepository.save(user)

    return {
      user,
    }
  }
}
