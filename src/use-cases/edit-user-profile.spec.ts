import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { PasswordConfirmationMismatchError } from './errors/password-confirmation-mismatch-error'
import { EditUserProfileUseCase } from './edit-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: EditUserProfileUseCase

describe('Edit User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditUserProfileUseCase(usersRepository)
  })

  it('should be able to edit user profile with same email', async () => {
    const createdUser = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
      username: 'John Doe 12',
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    expect(user.username).toEqual('John Doe 12')
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('johndoe@example.com')
  })

  it('should be able to edit user profile with other email', async () => {
    const createdUser = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
      username: 'John Doe 12',
      name: 'John Doe',
      email: 'johndoe12@example.com',
    })

    expect(user.username).toEqual('John Doe 12')
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('johndoe12@example.com')
  })

  it('should not be able to edit user with same email twice', async () => {
    await usersRepository.create({
      username: 'John Doe 1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const createdUser = await usersRepository.create({
      username: 'John Doe 2',
      name: 'John',
      email: 'johndoe2@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await expect(
      sut.execute({
        userId: createdUser.id,
        username: 'John Doe 2',
        name: 'John',
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to edit user profile with wrong id', async () => {
    await expect(
      sut.execute({
        userId: 'none-existing-id',
        username: 'John Doe 2',
        name: 'John',
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
