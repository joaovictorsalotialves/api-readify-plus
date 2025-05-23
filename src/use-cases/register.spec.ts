import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { PasswordConfirmationMismatchError } from './errors/password-confirmation-mismatch-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      passwordConfirmation: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with wrong password confirmation', async () => {
    await expect(() =>
      sut.execute({
        username: 'John Doe 123',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        passwordConfirmation: '654321',
        favoriteCategories: ['book-category-1', 'book-category-2'],
        favoriteWriters: ['writer-1', 'writer-2'],
      })
    ).rejects.toBeInstanceOf(PasswordConfirmationMismatchError)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      passwordConfirmation: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      username: 'John Doe 123',
      name: 'John Doe',
      email,
      password: '123456',
      passwordConfirmation: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await expect(() =>
      sut.execute({
        username: 'John Doe 123',
        name: 'John Doe',
        email,
        password: '123456',
        passwordConfirmation: '123456',
        favoriteCategories: ['book-category-1', 'book-category-2'],
        favoriteWriters: ['writer-1', 'writer-2'],
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
