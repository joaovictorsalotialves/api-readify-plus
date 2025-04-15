import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { SendEmailToRecoveryPasswordUseCase } from './send-email-to-recovery-password'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: SendEmailToRecoveryPasswordUseCase

describe('Send Email To Recovery Password Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new SendEmailToRecoveryPasswordUseCase(usersRepository)
  })

  it('should be able to send email to recovery password', async () => {
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
    })

    expect(user.passwordRecoveryCode).toEqual(expect.any(String))
  })

  it('should not be able to send email to recovery password with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
