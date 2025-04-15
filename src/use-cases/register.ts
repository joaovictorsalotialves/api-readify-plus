import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  username: string
  name: string
  email: string
  password: string

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
    favoriteCategories,
    favoriteWriters,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

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
