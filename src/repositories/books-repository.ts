import type { Book } from '@prisma/client'

export interface BooksRepository {
  findById(id: string): Promise<Book | null>
  searchMany(
    query: { title: string; category: string; writer: string },
    page: number
  ): Promise<Book[]>
}
