import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { CountReadBooksOfUserUseCase } from './count-read-books-of-user-use-case'

let bookRepository: InMemoryBooksRepository
let sut: CountReadBooksOfUserUseCase

describe('Count Read Books Of User Use Case', () => {
  beforeEach(() => {
    bookRepository = new InMemoryBooksRepository(
      [
        {
          id: 'book-1',
          title: 'Book 1',
          urlCover: 'https://example.com/covers/book-1.jpg',
          bookPath: '/books/book-1.pdf',
          synopsis: 'Synopsis for Book 1',
          publisher: 'Sample Publisher',
          numberPage: 300,
          language: 'English',
          ISBN: '9780132350884',
          visits: 0,
          writerId: 'writer-1',
          bookCategoryId: 'category-1',
        },
        {
          id: 'book-2',
          title: 'Book 2',
          urlCover: 'https://example.com/covers/book-2.jpg',
          bookPath: '/books/book-2.pdf',
          synopsis: 'Synopsis for Book 2',
          publisher: 'Sample Publisher',
          numberPage: 150,
          language: 'English',
          ISBN: '9780132350885',
          visits: 0,
          writerId: 'writer-1',
          bookCategoryId: 'category-1',
        },
        {
          id: 'book-3',
          title: 'Book 3',
          urlCover: 'https://example.com/covers/book-3.jpg',
          bookPath: '/books/book-3.pdf',
          synopsis: 'Synopsis for Book 3',
          publisher: 'Sample Publisher',
          numberPage: 250,
          language: 'English',
          ISBN: '9780132350885',
          visits: 0,
          writerId: 'writer-1',
          bookCategoryId: 'category-1',
        },
      ],
      [],
      [
        { userId: 'user-123', bookId: 'book-1', lastPageRead: 150 },
        { userId: 'user-123', bookId: 'book-2', lastPageRead: 150 }, // Completo
        { userId: 'user-123', bookId: 'book-3', lastPageRead: 250 }, // Completo
        { userId: 'user-789', bookId: 'book-3', lastPageRead: 200 },
      ]
    )

    sut = new CountReadBooksOfUserUseCase(bookRepository)
  })

  it('should return the correct count of read books by the user', async () => {
    const { count } = await sut.execute({ userId: 'user-123' })
    expect(count).toBe(2)
  })

  it('should return zero if the user did not read any book', async () => {
    const { count } = await sut.execute({ userId: 'user-456' })
    expect(count).toBe(0)
  })

  it('should return zero if the user has not finished any book', async () => {
    const { count } = await sut.execute({ userId: 'user-789' })
    expect(count).toBe(0)
  })
})
