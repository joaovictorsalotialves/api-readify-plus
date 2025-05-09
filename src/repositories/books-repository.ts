import type { Book } from '@prisma/client'

export interface BooksRepository {
  findById(id: string): Promise<Book | null>
  searchMany(
    query: {
      title?: string
      categoryId?: string
      writerId?: string
    },
    page: number
  ): Promise<Book[]>
  findFavoriteBooksOfUser(userId: string): Promise<Book[]>
}
