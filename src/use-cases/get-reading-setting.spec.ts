import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryReadingSettingRepository } from '@/repositories/in-memory/in-memory-reading-setting-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetReadingSettingUseCase } from './get-reading-setting'

let usersRepository: InMemoryUsersRepository
let readingSettingRepository: InMemoryReadingSettingRepository
let sut: GetReadingSettingUseCase

describe('Get Reading Setting Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    readingSettingRepository = new InMemoryReadingSettingRepository()
    sut = new GetReadingSettingUseCase(
      usersRepository,
      readingSettingRepository
    )
  })

  it('should be able to edit reading setting', async () => {
    const user = await usersRepository.create({
      username: 'John Doe 123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '123456',
      favoriteCategories: ['book-category-1', 'book-category-2'],
      favoriteWriters: ['writer-1', 'writer-2'],
    })

    const readingSettingDefault = await readingSettingRepository.create({
      fontFamily: 'serif',
      fontSize: 18,
      fontSpacing: '1.5',
      screenBrightness: 0.8,
      theme: 'light',
      user: user.id,
    })

    const { readingSetting } = await sut.execute({ userId: user.id })

    expect({
      ...readingSettingDefault,
      fontSize: Number(readingSettingDefault.fontSize),
      screenBrightness: Number(readingSettingDefault.screenBrightness),
    }).toEqual(readingSetting)
  })

  it('should not be able to edit reading setting bacause user not existing', async () => {
    await expect(() =>
      sut.execute({
        userId: 'not-existing-user-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
