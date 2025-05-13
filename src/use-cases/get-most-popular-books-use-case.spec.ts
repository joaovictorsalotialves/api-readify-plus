import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { GetMostPopularBooksUseCase } from './get-most-popular-books-use-case'

let bookRepository: InMemoryBooksRepository
let sut: GetMostPopularBooksUseCase

describe('Get Most Popular Books Use Case', () => {
  beforeEach(() => {
    const books = Array.from({ length: 15 }).map((_, index) => ({
      id: `book-${index + 1}`,
      title: `Book ${index + 1}`,
      urlCover: `https://example.com/covers/book-${index + 1}.jpg`,
      bookPath: `/books/book-${index + 1}.pdf`,
      synopsis: `Synopsis for Book ${index + 1}`,
      publisher: 'Sample Publisher',
      numberPage: 100 + index,
      language: 'English',
      ISBN: `9780132350${880 + index}`,
      writerId: `writer-${index + 1}`,
      bookCategoryId: `category-${index + 1}`,
      visits: 100 - index * 5,
    }))

    bookRepository = new InMemoryBooksRepository(books)
    sut = new GetMostPopularBooksUseCase(bookRepository)
  })

  it('should be able to get the top 10 most popular books in descending order of visits', async () => {
    const { books } = await sut.execute()

    expect(books).toHaveLength(10)

    expect(books[0].title).toBe('Book 1')
    expect(books[1].title).toBe('Book 2')
    expect(books[2].title).toBe('Book 3')
    expect(books[3].title).toBe('Book 4')
    expect(books[4].title).toBe('Book 5')
    expect(books[5].title).toBe('Book 6')
    expect(books[6].title).toBe('Book 7')
    expect(books[7].title).toBe('Book 8')
    expect(books[8].title).toBe('Book 9')
    expect(books[9].title).toBe('Book 10')
  })

  it('should return an empty array if there are no books', async () => {
    bookRepository = new InMemoryBooksRepository()
    sut = new GetMostPopularBooksUseCase(bookRepository)

    const { books } = await sut.execute()

    expect(books).toHaveLength(0)
  })

  it('should return all books if there are less than 10', async () => {
    bookRepository = new InMemoryBooksRepository([
      {
        id: 'book-1',
        title: 'Clean Code',
        urlCover: 'https://example.com/covers/clean-code.jpg',
        bookPath: '/books/clean-code.pdf',
        synopsis: 'A Handbook of Agile Software Craftsmanship.',
        publisher: 'Prentice Hall',
        numberPage: 464,
        language: 'English',
        ISBN: '9780132350884',
        writerId: 'writer-1',
        bookCategoryId: 'category-1',
        visits: 20,
      },
      {
        id: 'book-2',
        title: 'The Pragmatic Programmer',
        urlCover: 'https://example.com/covers/pragmatic-programmer.jpg',
        bookPath: '/books/pragmatic-programmer.pdf',
        synopsis: 'Your Journey to Mastery.',
        publisher: 'Addison-Wesley',
        numberPage: 352,
        language: 'English',
        ISBN: '9780132350885',
        writerId: 'writer-2',
        bookCategoryId: 'category-2',
        visits: 30,
      },
    ])
    sut = new GetMostPopularBooksUseCase(bookRepository)

    const { books } = await sut.execute()

    expect(books).toHaveLength(2)
  })
})
