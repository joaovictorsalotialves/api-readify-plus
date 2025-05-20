import { describe, it, expect, beforeEach } from 'vitest'
import { CountBookReviewOfUserUseCase } from './count-book-review-of-user-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { InMemoryAssessementsRepository } from '@/repositories/in-memory/in-memory-assessements-repository'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let booksRepository: InMemoryBooksRepository
let assessementsRepository: InMemoryAssessementsRepository
let sut: CountBookReviewOfUserUseCase

describe('Count Book Review Of User Use Case', () => {
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

    sut = new CountBookReviewOfUserUseCase(assessementsRepository)
  })

  it('should count the number of reviews from a specific user', async () => {
    const user = await usersRepository.create({
      username: 'reviewer01',
      name: 'Reviewer',
      email: 'reviewer@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1'],
      favoriteWriters: ['writer-1'],
    })

    await assessementsRepository.create({
      score: 5,
      comment: 'Amazing!',
      likes: 0,
      user: user.id,
      book: 'book-1',
    })

    await assessementsRepository.create({
      score: 4,
      comment: 'Very good!',
      likes: 1,
      user: user.id,
      book: 'book-1',
    })

    const { count } = await sut.execute({ userId: user.id })

    expect(count).toBe(2)
  })

  it('should return 0 if the user has not submitted any reviews', async () => {
    const user = await usersRepository.create({
      username: 'no-review-user',
      name: 'No Reviews',
      email: 'noreviews@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: [],
      favoriteWriters: [],
    })

    const { count } = await sut.execute({ userId: user.id })

    expect(count).toBe(0)
  })
})
