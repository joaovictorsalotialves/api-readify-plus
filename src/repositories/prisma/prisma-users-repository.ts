import { prisma } from '@/lib/prisma'
import type { CreateUserInput, UsersRepository } from '../users-repository'
import type { User } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: CreateUserInput) {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,

        favoriteCategories: {
          create: data.favoriteCategories.map(bookCategoryId => ({
            bookCategoryId,
          })),
        },

        favoriteWriters: {
          create: data.favoriteWriters.map(writerId => ({
            writerId,
          })),
        },
      },
    })

    return user
  }

  async save(data: User) {
    await prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    })

    return data
  }
}
