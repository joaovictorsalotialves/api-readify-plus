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
  findManyFavoriteBooksOfUser(userId: string): Promise<Book[]>
  findManyIsReadingBooksOfUser(userId: string): Promise<Book[]>
}
