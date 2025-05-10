import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { GetIsReadingBooksOfUserUseCase } from './get-is-reading-books-of-user-use-case'

let bookRepository: InMemoryBooksRepository
let sut: GetIsReadingBooksOfUserUseCase

describe('Get Is Reading Books Of User Use Case', () => {
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
          writerId: 'writer-1',
          bookCategoryId: 'category-1',
        },
      ],
      [],
      [
        { userId: 'user-123', bookId: 'book-1', lastPageRead: 150 },
        { userId: 'user-123', bookId: 'book-2', lastPageRead: 150 }, // Lido até o final
      ]
    )

    sut = new GetIsReadingBooksOfUserUseCase(bookRepository)
  })

  it('should return books that are being read and not finished by the user', async () => {
    const { books } = await sut.execute({ userId: 'user-123' })

    expect(books).toHaveLength(1)
    expect(books[0].title).toBe('Book 1')
  })

  it('should return an empty list if the user is not reading any book', async () => {
    const { books } = await sut.execute({ userId: 'user-456' })
    expect(books).toHaveLength(0)
  })

  it('should return an empty list if the user finished all the books', async () => {
    const { books } = await sut.execute({ userId: 'user-123' })

    const finishedBooks = books.filter(book => book.id === 'book-2')
    expect(finishedBooks).toHaveLength(0)
  })
})
