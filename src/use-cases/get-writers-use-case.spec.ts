import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryBookCategoriesRepository } from '@/repositories/in-memory/in-memory-book-categories-repository'
import { GetBookCategoriesUseCase } from './get-book-categories-use-case'
import { InMemoryWritersRepository } from '@/repositories/in-memory/in-memory-writers-repository'
import { GetWritersUseCase } from './get-writers-use-case'

let writersRepository: InMemoryWritersRepository
let sut: GetWritersUseCase

describe('Get Writers Use Case', () => {
  beforeEach(() => {
    writersRepository = new InMemoryWritersRepository([
      { id: 'writer-1', name: 'Writer One' },
      { id: 'writer-2', name: 'Writer Two' },
    ])

    sut = new GetWritersUseCase(writersRepository)
  })

  it('should return all writers in the repository', async () => {
    const { writers } = await sut.execute()

    expect(writers).toHaveLength(2)
    expect(writers).toEqual([
      expect.objectContaining({ id: 'writer-1', name: 'Writer One' }),
      expect.objectContaining({ id: 'writer-2', name: 'Writer Two' }),
    ])
  })

  it('should return an empty array if there are no writers', async () => {
    writersRepository = new InMemoryWritersRepository([])
    sut = new GetWritersUseCase(writersRepository)

    const { writers } = await sut.execute()

    expect(writers).toEqual([])
  })
})
