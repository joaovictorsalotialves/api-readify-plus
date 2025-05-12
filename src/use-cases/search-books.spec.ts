import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { SearchBooksUseCase } from './search-books'

let bookRepository: InMemoryBooksRepository
let sut: SearchBooksUseCase

describe('Search Book Use Case', () => {
  beforeEach(() => {
    bookRepository = new InMemoryBooksRepository(
      Array.from({ length: 15 }, (_, index) => ({
        id: `book-${index + 1}`,
        title: `Book ${index + 1}`,
        urlCover: `https://example.com/covers/book-${index + 1}.jpg`,
        bookPath: `/books/book-${index + 1}.pdf`,
        synopsis: `Synopsis for Book ${index + 1}`,
        publisher: 'Sample Publisher',
        numberPage: 300,
        language: 'English',
        ISBN: `9780132350${index + 1}`,
        writerId: 'writer-1',
        bookCategoryId: 'category-1',
      }))
    )
    sut = new SearchBooksUseCase(bookRepository)
  })

  it('should return books that match the search query', async () => {
    const { books } = await sut.execute({
      query: {
        title: 'Book 2',
        categoryId: 'category-1',
        writerId: 'writer-1',
      },
    })

    expect(books).toHaveLength(1)
    expect(books[0].title).toBe('Book 2')
  })

  it('should return an empty list if no books match the query', async () => {
    const { books } = await sut.execute({
      query: {
        title: 'Nonexistent Book',
        categoryId: 'nonexistent-category',
        writerId: 'nonexistent-writer',
      },
    })

    expect(books).toHaveLength(0)
  })
})
