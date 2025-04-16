import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { EditPasswordUseCase } from './edit-password'
import { InvalidPasswordRecoveryCodeError } from './errors/invalid-password-recovery-code-error'
import { PasswordConfirmationMismatchError } from './errors/password-confirmation-mismatch-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: EditPasswordUseCase

describe('Edit Password Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditPasswordUseCase(usersRepository)
  })

  it('should be able to edit password', async () => {
    const userCreated = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const { user } = await sut.execute({
      userId: userCreated.id,
      currentPassword: '123456',
      password: '654321',
      passwordConfirmation: '654321',
    })

    expect(await compare('654321', user.passwordHash)).toBe(true)
  })

  it('should not be able to edit password with wrong password confirmation', async () => {
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
        userId: user.id,
        currentPassword: '123456',
        password: '654321',
        passwordConfirmation: 'invalid-password-confirmation',
      })
    ).rejects.toBeInstanceOf(PasswordConfirmationMismatchError)
  })

  it('should not be able to edit password with wrong userId', async () => {
    await expect(
      sut.execute({
        userId: 'invalid-user-id',
        currentPassword: '123456',
        password: '654321',
        passwordConfirmation: '654321',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit password with wrong current password', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await expect(
      sut.execute({
        userId: user.id,
        currentPassword: 'invalid-current-password',
        password: '654321',
        passwordConfirmation: '654321',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
