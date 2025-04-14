import type { User, Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      username: data.username,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      passwordRecoveryCode: data.passwordRecoveryCode ?? null,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
