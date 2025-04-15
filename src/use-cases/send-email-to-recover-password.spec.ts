import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { SendEmailToRecoverPasswordUseCase } from './send-email-to-recover-password'
import { FakeMailProvider } from '@/providers/implementations/FakeMailProvider'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let mailtrapMailProvider: FakeMailProvider
let sut: SendEmailToRecoverPasswordUseCase

describe('Send Email To Recovery Password Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mailtrapMailProvider = new FakeMailProvider()
    sut = new SendEmailToRecoverPasswordUseCase(
      usersRepository,
      mailtrapMailProvider
    )
  })

  it('should set a recovery code when sending email', async () => {
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
    expect(user.passwordRecoveryCode).toMatch(/^\d{6}$/)
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

    await sut.execute({
      email: 'johndoe@example.com',
    })

    expect(mailtrapMailProvider.sent.length).toBe(1)
    expect(mailtrapMailProvider.sent[0].to.email).toBe('johndoe@example.com')
  })

  it('should not be able to send email to recovery password with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
