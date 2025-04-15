import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticete', async () => {
    await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticete with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticete with wrong password', async () => {
    await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
