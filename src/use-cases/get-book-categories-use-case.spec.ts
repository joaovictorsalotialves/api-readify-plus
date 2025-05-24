import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryBookCategoriesRepository } from '@/repositories/in-memory/in-memory-book-categories-repository'
import { GetBookCategoriesUseCase } from './get-book-categories-use-case'

let bookCategoriesRepository: InMemoryBookCategoriesRepository
let sut: GetBookCategoriesUseCase

describe('Get Book Categories Use Case', () => {
  beforeEach(() => {
    bookCategoriesRepository = new InMemoryBookCategoriesRepository([
      { id: 'book-category-1', name: 'Book Category One' },
      { id: 'book-category-2', name: 'Book Category Two' },
    ])

    sut = new GetBookCategoriesUseCase(bookCategoriesRepository)
  })

  it('should return all book categories in the repository', async () => {
    const { bookCategories } = await sut.execute()

    expect(bookCategories).toHaveLength(2)
    expect(bookCategories).toEqual([
      expect.objectContaining({
        id: 'book-category-1',
        name: 'Book Category One',
      }),
      expect.objectContaining({
        id: 'book-category-2',
        name: 'Book Category Two',
      }),
    ])
  })

  it('should return an empty array if there are no book categories', async () => {
    bookCategoriesRepository = new InMemoryBookCategoriesRepository([])
    sut = new GetBookCategoriesUseCase(bookCategoriesRepository)

    const { bookCategories } = await sut.execute()

    expect(bookCategories).toEqual([])
  })
})
