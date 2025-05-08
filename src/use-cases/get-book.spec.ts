import { expect, describe, it, beforeEach } from 'vitest'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { GetBookUseCase } from './get-book'

let bookRepository: InMemoryBooksRepository
let sut: GetBookUseCase

describe('Get Book Use Case', () => {
  beforeEach(() => {
    bookRepository = new InMemoryBooksRepository([
      {
        id: 'book-1',
        title: 'Clean Code',
        urlCover: 'https://example.com/covers/clean-code.jpg',
        bookPath: '/books/clean-code.pdf',
        synopsis: 'A Handbook of Agile Software Craftsmanship.',
        publisher: 'Prentice Hall',
        numberPage: '464',
        language: 'English',
        ISBN: '9780132350884',
        writerId: 'writer-1',
        bookCategoryId: 'category-1',
      },
    ])
    sut = new GetBookUseCase(bookRepository)
  })

  it('should be able to get book', async () => {
    const { book } = await sut.execute({
      bookId: 'book-1',
    })

    expect(book.id).toEqual(expect.any(String))
    expect(book.title).toEqual('Clean Code')
  })

  it('should not be able to get book with wrong id', async () => {
    await expect(() =>
      sut.execute({
        bookId: 'none-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
