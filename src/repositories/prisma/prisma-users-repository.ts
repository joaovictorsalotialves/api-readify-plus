import { prisma } from '@/lib/prisma'
import type { CreateUserInput, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
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
}
