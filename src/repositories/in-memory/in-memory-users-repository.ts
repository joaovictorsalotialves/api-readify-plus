import type {
  User,
  FavoriteBooksOfUser,
  FavoriteCategoriesBookOfUser,
  FavoriteWritersOfUser,
} from '@prisma/client'
import type { CreateUserInput, UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  public favoriteBooks: FavoriteBooksOfUser[] = []
  public favoriteCategories: FavoriteCategoriesBookOfUser[] = []
  public favoriteWriters: FavoriteWritersOfUser[] = []

  async findById(id: string) {
    const user = this.items.find(item => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: CreateUserInput) {
    const user = {
      id: randomUUID(),
      username: data.username,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      passwordRecoveryCode: data.passwordRecoveryCode ?? null,
      createdAt: new Date(),
    }

    if (data.favoriteCategories.length > 0) {
      data.favoriteCategories.map(item => {
        this.favoriteCategories.push({
          userId: user.id,
          bookCategoryId: item,
        })
      })
    }

    if (data.favoriteWriters.length > 0) {
      data.favoriteWriters.map(item => {
        this.favoriteWriters.push({
          userId: user.id,
          writerId: item,
        })
      })
    }

    this.items.push(user)

    return user
  }

  async save(data: User) {
    const userIndex = this.items.findIndex(item => item.email === data.email)

    if (userIndex >= 0) {
      this.items[userIndex] = data
    }

    return data
  }
}
