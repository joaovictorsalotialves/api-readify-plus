import type { BooksDTO } from '@/dtos/Book'

export interface BooksRepository {
  findById(id: string): Promise<BooksDTO | null>
  searchMany(query: {
    title?: string
    categoryId?: string
    writerId?: string
  }): Promise<BooksDTO[]>
  findByTitle(title: string): Promise<BooksDTO | null>
  findManyBooks(): Promise<BooksDTO[]>
  findManyMostPopularBooks(): Promise<BooksDTO[]>
  findManyFavoriteBooksOfUser(userId: string): Promise<BooksDTO[]>
  findManyIsReadingBooksOfUser(userId: string): Promise<BooksDTO[]>
  findManyReadBooksOfUser(userId: string): Promise<BooksDTO[]>
  countReadBooksOfUser(userId: string): Promise<number>
  addFavoriteBook(bookId: string, userId: string): Promise<void>
  removeFavoriteBook(bookId: string, userId: string): Promise<void>
  addUserVisitBook(book: BooksDTO, userId: string): Promise<BooksDTO>
  isFavoriteBookOfUser(bookId: string, userId: string): Promise<boolean>
}
