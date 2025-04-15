import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ValidationPasswordRecoveryCodeUseCase } from './validation-password-recovery-code'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidPasswordRecoveryCodeError } from './errors/invalid-password-recovery-code-error'

let usersRepository: InMemoryUsersRepository
let sut: ValidationPasswordRecoveryCodeUseCase

describe('Validation Password Recovery Code Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ValidationPasswordRecoveryCodeUseCase(usersRepository)
  })

  it('should be able to validation password recovery code', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      passwordRecoveryCode: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await expect(
      sut.execute({
        userId: user.id,
        passwordRecoveryCode: user.passwordRecoveryCode as string,
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to validation password recovery code with wrong userId', async () => {
    await expect(
      sut.execute({
        userId: 'invalid-userid',
        passwordRecoveryCode: '123456',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validation password recovery code with wrong password recovery code', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      passwordRecoveryCode: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await expect(
      sut.execute({
        userId: user.id,
        passwordRecoveryCode: 'invalid-code',
      })
    ).rejects.toBeInstanceOf(InvalidPasswordRecoveryCodeError)
  })
})
