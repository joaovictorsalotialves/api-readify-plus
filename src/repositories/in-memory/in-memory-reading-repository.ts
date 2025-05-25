import type { Prisma, Reading } from '@prisma/client'
import type {
  ReadingCreateInput,
  ReadingsRepository,
} from '../readings-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryReadingsRepository implements ReadingsRepository {
  public items: Reading[] = []

  async findById(readingId: string) {
    const reading = this.items.find(reading => reading.id === readingId)

    if (!reading) {
      return null
    }

    return reading
  }

  async findByUserIdAndBookId(
    userId: string,
    bookId: string
  ): Promise<Reading | null> {
    const reading = this.items.find(
      reading => reading.userId === userId && reading.bookId === bookId
    )

    if (!reading) {
      return null
    }

    return reading
  }

  async create(data: ReadingCreateInput): Promise<Reading> {
    const reading = {
      id: randomUUID(),
      startTime: new Date(),
      endTime: null,
      duration: data.duration ?? 0,
      lastPageRead: data.lastPageRead ?? 0,
      userId: data.user as string,
      bookId: data.book as string,
    }

    this.items.push(reading)

    return reading
  }

  async save(
    id: string,
    data: Partial<Pick<Reading, 'lastPageRead' | 'duration' | 'endTime'>>
  ): Promise<Reading> {
    const index = this.items.findIndex(reading => reading.id === id)

    if (index === -1) {
      throw new Error('Reading not found')
    }

    const reading = this.items[index]

    const updatedReading = {
      ...reading,
      ...data,
    }

    this.items[index] = updatedReading

    return updatedReading
  }
}
