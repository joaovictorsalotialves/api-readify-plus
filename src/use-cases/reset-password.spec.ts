import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidPasswordRecoveryCodeError } from './errors/invalid-password-recovery-code-error'
import { ResetPasswordUseCase } from './reset-password'
import { PasswordConfirmationMismatchError } from './errors/password-confirmation-mismatch-error'

let usersRepository: InMemoryUsersRepository
let sut: ResetPasswordUseCase

describe('Reset Password Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ResetPasswordUseCase(usersRepository)
  })

  it('should be able to reset password', async () => {
    const userCreated = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      passwordRecoveryCode: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const { user } = await sut.execute({
      userId: userCreated.id,
      passwordRecoveryCode: userCreated.passwordRecoveryCode as string,
      password: '654321',
      passwordConfirmation: '654321',
    })

    expect(await compare('654321', user.passwordHash)).toBe(true)
  })

  it('should not be able to reset password with wrong password confirmation', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      passwordRecoveryCode: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    await expect(() =>
      sut.execute({
        userId: user.id,
        passwordRecoveryCode: user.passwordRecoveryCode as string,
        password: '123456',
        passwordConfirmation: '654321',
      })
    ).rejects.toBeInstanceOf(PasswordConfirmationMismatchError)
  })

  it('should not be able to reset password with wrong userId', async () => {
    await expect(
      sut.execute({
        userId: 'invalid-userid',
        passwordRecoveryCode: '123456',
        password: '654321',
        passwordConfirmation: '654321',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to reset password with wrong password recovery code', async () => {
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
        password: '654321',
        passwordConfirmation: '654321',
      })
    ).rejects.toBeInstanceOf(InvalidPasswordRecoveryCodeError)
  })
})
