import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { PasswordConfirmationMismatchError } from './errors/password-confirmation-mismatch-error'

interface RegisterUseCaseRequest {
  username: string
  name: string
  email: string
  password: string
  passwordConfirmation: string

  favoriteCategories: string[] // A list of book category IDs
  favoriteWriters: string[] // A list of writer IDs
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    name,
    email,
    password,
    passwordConfirmation,
    favoriteCategories,
    favoriteWriters,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    if (password !== passwordConfirmation) {
      throw new PasswordConfirmationMismatchError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      username,
      name,
      email,
      passwordHash,
      favoriteCategories,
      favoriteWriters,
    })

    return { user }
  }
}
