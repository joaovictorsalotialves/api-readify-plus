import type { Book } from '@prisma/client'

export interface BooksRepository {
  findById(id: string): Promise<Book | null>
  searchMany(query: {
    title?: string
    categoryId?: string
    writerId?: string
  }): Promise<Book[]>
  findManyMostPopularBooks(): Promise<Book[]>
  findManyFavoriteBooksOfUser(userId: string): Promise<Book[]>
  findManyIsReadingBooksOfUser(userId: string): Promise<Book[]>
  findManyReadBooksOfUser(userId: string): Promise<Book[]>
  countReadBooksOfUser(userId: string): Promise<number>
  addFavoriteBook(bookId: string, userId: string): Promise<void>
  removeFavoriteBook(bookId: string, userId: string): Promise<void>
  addUserVisitBook(book: Book, userId: string): Promise<Book>
}
