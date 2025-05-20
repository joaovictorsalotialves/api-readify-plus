import { describe, it, expect, beforeEach } from 'vitest'
import { LikeBookReviewUseCase } from './like-book-review-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { InMemoryAssessementsRepository } from '@/repositories/in-memory/in-memory-assessements-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let booksRepository: InMemoryBooksRepository
let assessementsRepository: InMemoryAssessementsRepository
let sut: LikeBookReviewUseCase

describe('Like Book Review Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    booksRepository = new InMemoryBooksRepository([
      {
        id: 'book-1',
        title: 'Book 1',
        urlCover: '',
        bookPath: '',
        synopsis: '',
        publisher: '',
        numberPage: 100,
        language: 'en',
        ISBN: 'isbn-1',
        visits: 0,
        writerId: 'writer-1',
        bookCategoryId: 'category-1',
      },
    ])

    assessementsRepository = new InMemoryAssessementsRepository([
      {
        id: 'assessement-1',
        score: 5,
        comment: 'Great book!',
        likes: 0,
        userId: 'user-1',
        bookId: 'book-1',
      },
    ])

    sut = new LikeBookReviewUseCase(assessementsRepository, usersRepository)
  })

  it('should add a like to an existing review', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const { assessement } = await sut.execute({
      assessementId: 'assessement-1',
      userId: user.id,
    })

    expect(assessement.likes).toBe(1)
  })

  it('should not allow duplicate likes from the same user', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await sut.execute({
      assessementId: 'assessement-1',
      userId: user.id,
    })

    const { assessement } = await sut.execute({
      assessementId: 'assessement-1',
      userId: user.id,
    })

    expect(assessement.likes).toBe(1)
  })

  it('should throw if the user does not exist', async () => {
    await expect(() =>
      sut.execute({
        assessementId: 'assessement-1',
        userId: 'non-existent-user',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw if the assessement does not exist', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await expect(() =>
      sut.execute({
        assessementId: 'non-existent-assessement',
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
