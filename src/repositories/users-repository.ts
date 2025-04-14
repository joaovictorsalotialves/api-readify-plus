import type { Prisma, User } from '@prisma/client'

export type CreateUserInput = Prisma.UserCreateInput & {
  favoriteCategories: string[] // A list of book category IDs
  favoriteWriters: string[] // A list of writer IDs
  favoriteBooks?: undefined // Do not register the favorite book when creating the user
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUserInput): Promise<User>
}
