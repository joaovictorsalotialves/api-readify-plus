import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { AddFavoriteBookUseCase } from './add-favorite-book-use-case'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let bookRepository: InMemoryBooksRepository
let sut: AddFavoriteBookUseCase

describe('Add Favorite Book Use Case', () => {
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
      ],
      []
    )

    sut = new AddFavoriteBookUseCase(bookRepository)
  })

  it("should add a book to the user's favorites", async () => {
    await sut.execute({ bookId: 'book-1', userId: 'user-123' })

    const favorites =
      await bookRepository.findManyFavoriteBooksOfUser('user-123')
    expect(favorites).toHaveLength(1)
    expect(favorites[0].id).toBe('book-1')
  })

  it('should not add the same book twice to the favorites', async () => {
    await sut.execute({ bookId: 'book-1', userId: 'user-123' })
    await sut.execute({ bookId: 'book-1', userId: 'user-123' })

    const favorites =
      await bookRepository.findManyFavoriteBooksOfUser('user-123')
    expect(favorites).toHaveLength(1)
  })

  it('should throw ResourceNotFoundError if book does not exist', async () => {
    await expect(() =>
      sut.execute({ bookId: 'non-existent-book', userId: 'user-123' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
