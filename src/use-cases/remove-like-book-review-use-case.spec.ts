import { describe, it, expect, beforeEach } from 'vitest'
import { RemoveLikeBookReviewUseCase } from './remove-like-book-review-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { InMemoryAssessementsRepository } from '@/repositories/in-memory/in-memory-assessements-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let booksRepository: InMemoryBooksRepository
let assessementsRepository: InMemoryAssessementsRepository
let sut: RemoveLikeBookReviewUseCase

describe('Remove Like Book Review Use Case', () => {
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

    assessementsRepository = new InMemoryAssessementsRepository()

    sut = new RemoveLikeBookReviewUseCase(
      assessementsRepository,
      usersRepository
    )
  })

  it('should remove a like from an existing review', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1'],
      favoriteWriters: ['writer-1'],
    })

    const assessementCreated = await assessementsRepository.create({
      score: 5,
      comment: 'Great book!',
      likes: 0,
      user: 'user-1',
      book: 'book-1',
    })

    await assessementsRepository.addLikeAssessement(assessementCreated, user.id)

    const { assessement } = await sut.execute({
      assessementId: assessementCreated.id,
      userId: user.id,
    })

    expect(assessement.likes).toBe(0)
  })

  it('should not decrease likes below zero or if user had not liked before', async () => {
    const user1 = await usersRepository.create({
      username: 'User Without Like',
      name: 'No Like',
      email: 'nolik@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1'],
      favoriteWriters: ['writer-1'],
    })

    const user2 = await usersRepository.create({
      username: 'User With Like',
      name: 'Like',
      email: 'lik@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1'],
      favoriteWriters: ['writer-1'],
    })

    const assessementCreated = await assessementsRepository.create({
      score: 5,
      comment: 'Great book!',
      likes: 0,
      user: 'user-1',
      book: 'book-1',
    })

    await assessementsRepository.addLikeAssessement(
      assessementCreated,
      user2.id
    )

    const { assessement } = await sut.execute({
      assessementId: assessementCreated.id,
      userId: user1.id,
    })

    expect(assessement.likes).toBe(1)
  })

  it('should throw if the user does not exist', async () => {
    const assessementCreated = await assessementsRepository.create({
      score: 5,
      comment: 'Great book!',
      likes: 0,
      user: 'user-1',
      book: 'book-1',
    })

    await expect(() =>
      sut.execute({
        assessementId: assessementCreated.id,
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
      favoriteCategories: ['book-category-1'],
      favoriteWriters: ['writer-1'],
    })

    await expect(() =>
      sut.execute({
        assessementId: 'non-existent-assessement',
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
