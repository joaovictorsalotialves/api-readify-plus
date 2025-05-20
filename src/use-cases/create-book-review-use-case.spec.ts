import { expect, describe, it, beforeEach } from 'vitest'
import { CreateBookReviewUseCase } from './create-book-review-use-case'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryAssessementsRepository } from '@/repositories/in-memory/in-memory-assessements-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { hash } from 'bcryptjs'

let booksRepository: InMemoryBooksRepository
let usersRepository: InMemoryUsersRepository
let assessementsRepository: InMemoryAssessementsRepository
let sut: CreateBookReviewUseCase

describe('Create Book Review Use Case', () => {
  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository([
      {
        id: 'book-1',
        title: 'Book 1',
        urlCover: 'https://example.com/covers/book-1.jpg',
        bookPath: '/books/book-1.pdf',
        synopsis: 'Synopsis for Book 1',
        publisher: 'Publisher',
        numberPage: 300,
        language: 'English',
        ISBN: '1111111111111',
        visits: 0,
        writerId: 'writer-1',
        bookCategoryId: 'category-1',
      },
    ])

    usersRepository = new InMemoryUsersRepository()

    assessementsRepository = new InMemoryAssessementsRepository()

    sut = new CreateBookReviewUseCase(
      assessementsRepository,
      usersRepository,
      booksRepository
    )
  })

  it('should create a new book review successfully', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const { assessement } = await sut.execute({
      score: 4,
      comment: 'Excelente leitura!',
      likes: 0,
      userId: user.id,
      bookId: 'book-1',
    })

    expect(assessement).toBeTruthy()
    expect(assessement.id).toEqual(expect.any(String))
    expect(assessement.comment).toBe('Excelente leitura!')
    expect(assessement.score).toBe(4)
    expect(assessement.userId).toBe(user.id)
    expect(assessement.bookId).toBe('book-1')
  })

  it('should throw ResourceNotFoundError if user not exist', async () => {
    await expect(() =>
      sut.execute({
        score: 5,
        comment: 'Ótimo!',
        likes: 1,
        userId: 'non-existent-user',
        bookId: 'book-1',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw ResourceNotFoundError if book not exist', async () => {
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
        score: 5,
        comment: 'Ótimo!',
        likes: 1,
        userId: user.id,
        bookId: 'non-existent-book',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
