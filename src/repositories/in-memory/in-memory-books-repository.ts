import type { Book } from '@prisma/client'
import type { BooksRepository } from '../books-repository' // ajuste o caminho conforme necessário

interface FavoriteBooksOfUser {
  bookId: string
  userId: string
}
export class InMemoryBooksRepository implements BooksRepository {
  private books: Book[] = []
  private favoriteBooksOfUsers: FavoriteBooksOfUser[] = []

  constructor(
    initialBooks: Book[] = [],
    initialFavorites: FavoriteBooksOfUser[] = []
  ) {
    this.books = initialBooks
    this.favoriteBooksOfUsers = initialFavorites
  }

  async findById(id: string): Promise<Book | null> {
    const book = this.books.find(book => book.id === id)

    if (!book) {
      return null
    }

    return book
  }

  async searchMany(
    query: { title: string; categoryId: string; writerId: string },
    page: number
  ) {
    const filtered = this.books.filter(
      book =>
        book.title.toLowerCase().includes(query.title.toLowerCase()) &&
        book.bookCategoryId &&
        book.writerId
    )
    const paginated = filtered.slice((page - 1) * 10, page * 10)
    return paginated.length > 0 ? paginated : []
  }

  async findFavoriteBooksOfUser(userId: string) {
    const favoriteBookIds = this.favoriteBooksOfUsers
      .filter(favorite => favorite.userId === userId)
      .map(favorite => favorite.bookId)

    const books = this.books.filter(book => favoriteBookIds.includes(book.id))

    return books
  }
}
