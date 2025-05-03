import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryReadingSettingRepository } from '@/repositories/in-memory/in-memory-reading-setting-repository'
import { CreateReadingSettingDefaultUseCase } from './create-reading-setting-default'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let readingSettingRepository: InMemoryReadingSettingRepository
let sut: CreateReadingSettingDefaultUseCase

describe('Create Reading Setting Default Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    readingSettingRepository = new InMemoryReadingSettingRepository()
    sut = new CreateReadingSettingDefaultUseCase(
      usersRepository,
      readingSettingRepository
    )
  })

  it('should be able to create reading setting default', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const { readingSettingDefault } = await sut.execute({ userId: user.id })

    expect(readingSettingDefault.userId).toEqual(user.id)
    expect(readingSettingDefault.id).toEqual(expect.any(String))
  })

  it('should not be able to create reading setting default with wrong userId', async () => {
    await expect(() =>
      sut.execute({ userId: 'not-existing-user-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
