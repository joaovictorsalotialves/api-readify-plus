import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { RemoveFavoriteBookUseCase } from './remove-favorite-book-use-case'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let bookRepository: InMemoryBooksRepository
let sut: RemoveFavoriteBookUseCase

describe('Remove Favorite Book Use Case', () => {
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
      ],
      [{ bookId: 'book-1', userId: 'user-123' }]
    )

    sut = new RemoveFavoriteBookUseCase(bookRepository)
  })

  it("should remove a book from user's favorites", async () => {
    await sut.execute({ bookId: 'book-1', userId: 'user-123' })

    const favorites =
      await bookRepository.findManyFavoriteBooksOfUser('user-123')
    expect(favorites).toHaveLength(0)
  })

  it('should throw an error if the book does not exist', async () => {
    await expect(
      sut.execute({ bookId: 'book-2', userId: 'user-123' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not fail if trying to remove a non-favorited book', async () => {
    await sut.execute({ bookId: 'book-1', userId: 'user-123' })

    const favorites =
      await bookRepository.findManyFavoriteBooksOfUser('user-123')
    expect(favorites).toHaveLength(0)

    // Tentando remover de novo, não deve falhar
    await sut.execute({ bookId: 'book-1', userId: 'user-123' })
    expect(favorites).toHaveLength(0)
  })
})
