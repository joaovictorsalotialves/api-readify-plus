import type { User } from '@prisma/client'
import type { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditUserProfileUseCaseRequest {
  userId: string
  username: string
  name: string
  email: string
}

interface EditUserProfileUseCaseResponse {
  user: User
}

export class EditUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    username,
    name,
    email,
  }: EditUserProfileUseCaseRequest): Promise<EditUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const existsOtherUserWithSameEmail =
      userWithSameEmail?.id !== user.id && userWithSameEmail

    if (existsOtherUserWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    user.username = username
    user.name = name
    user.email = email

    await this.usersRepository.save(user)

    return { user }
  }
}
