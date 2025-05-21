import { describe, it, expect, beforeEach } from 'vitest'
import { GetBooksUseCase } from './get-books-use-case'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'

let booksRepository: InMemoryBooksRepository
let sut: GetBooksUseCase

describe('Get Books Use Case', () => {
  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository([
      {
        id: 'book-1',
        title: 'Book One',
        urlCover: 'https://example.com/book1.jpg',
        bookPath: '/path/book1.pdf',
        synopsis: 'First book synopsis.',
        publisher: 'Publisher A',
        numberPage: 123,
        language: 'en',
        ISBN: 'ISBN-1',
        visits: 10,
        writerId: 'writer-1',
        bookCategoryId: 'category-1',
      },
      {
        id: 'book-2',
        title: 'Book Two',
        urlCover: 'https://example.com/book2.jpg',
        bookPath: '/path/book2.pdf',
        synopsis: 'Second book synopsis.',
        publisher: 'Publisher B',
        numberPage: 456,
        language: 'pt',
        ISBN: 'ISBN-2',
        visits: 5,
        writerId: 'writer-2',
        bookCategoryId: 'category-2',
      },
    ])

    sut = new GetBooksUseCase(booksRepository)
  })

  it('should return all books in the repository', async () => {
    const { books } = await sut.execute()

    expect(books).toHaveLength(2)
    expect(books).toEqual([
      expect.objectContaining({ title: 'Book One' }),
      expect.objectContaining({ title: 'Book Two' }),
    ])
  })

  it('should return an empty array if there are no books', async () => {
    booksRepository = new InMemoryBooksRepository([])
    sut = new GetBooksUseCase(booksRepository)

    const { books } = await sut.execute()

    expect(books).toEqual([])
  })
})
