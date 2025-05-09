import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { GetFavoriteBooksOfUserUseCase } from './get-favorite-books-of-user-use-case'

let bookRepository: InMemoryBooksRepository
let sut: GetFavoriteBooksOfUserUseCase

describe('Get Favorite Books Of User Use Case', () => {
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
          numberPage: 320,
          language: 'English',
          ISBN: '9780132350885',
          writerId: 'writer-1',
          bookCategoryId: 'category-1',
        },
      ],
      [
        { userId: 'user-1', bookId: 'book-1' },
        { userId: 'user-1', bookId: 'book-2' },
        { userId: 'user-2', bookId: 'book-2' },
      ]
    )

    sut = new GetFavoriteBooksOfUserUseCase(bookRepository)
  })

  it('should be able to get favorite books of a user', async () => {
    const { books } = await sut.execute({
      userId: 'user-1',
    })

    expect(books).toHaveLength(2)
    expect(books[0].title).toBe('Book 1')
    expect(books[1].title).toBe('Book 2')
  })

  it('should return an empty list if the user has no favorite books', async () => {
    const { books } = await sut.execute({
      userId: 'user-3',
    })

    expect(books).toHaveLength(0)
  })
})
