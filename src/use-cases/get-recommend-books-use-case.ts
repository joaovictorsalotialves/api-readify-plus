import type { RecommendationProvider } from '@/providers/IAProvider'
import type { BooksRepository } from '../repositories/books-repository'
import { PrismaClient } from '@prisma/client'
import type { BooksDTO } from '@/dtos/Book'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

const prisma = new PrismaClient()

interface GetRecommendBooksUseCaseRequest {
  userId: string
}

interface GetRecommendBooksUseCaseResponse {
  books: BooksDTO[]
}

export class GetRecommendBooksUseCase {
  constructor(
    private recommendationProvider: RecommendationProvider,
    private booksRepository: BooksRepository
  ) {}

  async execute({
    userId,
  }: GetRecommendBooksUseCaseRequest): Promise<GetRecommendBooksUseCaseResponse> {
    // Buscar usuário com relacionamentos necessários
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        favoriteBooks: { include: { book: true } },
        favoriteWriters: { include: { writer: true } },
        favoriteCategories: { include: { BookCategory: true } },
        UserVisitBook: { include: { book: true } },
        Reading: true,
      },
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // Títulos favoritos e visitados
    const favoriteBookTitles = user.favoriteBooks.map(f => f.book.title)
    const visitedBooksWithCount = user.UserVisitBook.reduce<
      { title: string; visits: number }[]
    >((acc, visit) => {
      const existing = acc.find(v => v.title === visit.book.title)
      if (existing) {
        existing.visits++
      } else {
        acc.push({ title: visit.book.title, visits: 1 })
      }
      return acc
    }, [])

    // Leitura atual e livros já lidos
    const readingBooks =
      await this.booksRepository.findManyIsReadingBooksOfUser(userId)

    const readBooksIds =
      await this.booksRepository.findManyReadBooksOfUser(userId)

    // Buscar títulos dos livros lidos e em leitura atual
    const readingBooksTitles =
      readingBooks.length > 0 ? readingBooks.map(b => b.title) : []

    const readBooksTitles =
      readBooksIds.length > 0 ? readBooksIds.map(b => b.title) : []

    // Mapear engajamento (duração da leitura)
    const readings = await prisma.reading.findMany({
      where: { userId },
    })

    const engagementMap: Record<string, number> = {}

    // biome-ignore lint/complexity/noForEach: <explanation>
    readings.forEach(reading => {
      engagementMap[reading.bookId] =
        (engagementMap[reading.bookId] || 0) + reading.duration
    })

    // Buscar todos livros disponíveis
    const allBooks = await this.booksRepository.findManyBooks()
    const availableBooks = allBooks.map(book => ({
      title: book.title,
      writer: book.writer.name,
      category: book.category.name,
    }))

    // Top livros engajados
    const topEngagedBookTitles = (
      await prisma.book.findMany({
        where: {
          id: {
            in: Object.keys(engagementMap),
          },
        },
      })
    )
      .sort((a, b) => (engagementMap[b.id] ?? 0) - (engagementMap[a.id] ?? 0))
      .map(b => b.title)
      .slice(0, 5)

    const favoriteWriters = user.favoriteWriters.map(fw => fw.writer.name)
    const favoriteCategories = user.favoriteCategories.map(
      fc => fc.BookCategory.name
    )

    // Chamar provider com dados completos
    const recommendedTitles =
      await this.recommendationProvider.getRecommendedBooks({
        favoriteBooks: [...favoriteBookTitles, ...topEngagedBookTitles],
        favoriteWriters,
        favoriteCategories,
        visitedBooksWithCount,
        readingBooks: readingBooksTitles,
        readBooks: readBooksTitles,
        availableBooks,
      })

    // Buscar objetos completos dos livros recomendados
    const books = await Promise.all(
      recommendedTitles.map(title => this.booksRepository.findByTitle(title))
    )
    const recommendedBooks = books.filter((b): b is BooksDTO => !!b)

    return { books: recommendedBooks }
  }
}
