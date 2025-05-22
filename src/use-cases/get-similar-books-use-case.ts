import type { SimilarBooksProvider } from '@/providers/IAProvider'
import type { BooksRepository } from '../repositories/books-repository'
import type { BooksDTO } from '@/dtos/Book'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSimilarBooksUseCaseRequest {
  bookId: string
}

interface GetSimilarBooksUseCaseResponse {
  books: BooksDTO[]
}

export class GetSimilarBooksUseCase {
  constructor(
    private booksRepository: BooksRepository,
    private similarBooksProvider: SimilarBooksProvider
  ) {}

  async execute({
    bookId,
  }: GetSimilarBooksUseCaseRequest): Promise<GetSimilarBooksUseCaseResponse> {
    const referenceBook = await this.booksRepository.findById(bookId)
    if (!referenceBook) {
      throw new ResourceNotFoundError()
    }

    const allBooks = await this.booksRepository.findManyBooks()

    const availableBooks = allBooks
      .filter(book => book.id !== referenceBook.id)
      .map(book => ({
        title: book.title,
        writer: book.writer.name,
        category: book.category.name,
      }))

    const recommendedTitles = await this.similarBooksProvider.getSimilarBooks({
      referenceBook: {
        title: referenceBook.title,
        writer: referenceBook.writer.name,
        category: referenceBook.category.name,
      },
      availableBooks,
    })

    const similarBooks: BooksDTO[] = []

    for (const title of recommendedTitles) {
      const book = await this.booksRepository.findByTitle(title)
      if (book) {
        similarBooks.push(book)
      }
    }

    return { books: similarBooks }
  }
}
