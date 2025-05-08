import type { Book } from '@prisma/client'
import type { BooksRepository } from '../books-repository' // ajuste o caminho conforme necessário

export class InMemoryBooksRepository implements BooksRepository {
  private books: Book[] = []

  constructor(initialBooks: Book[] = []) {
    this.books = initialBooks
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
}
