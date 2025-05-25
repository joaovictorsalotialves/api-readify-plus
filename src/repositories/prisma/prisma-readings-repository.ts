import { PrismaClient, type Reading } from '@prisma/client'
import type {
  ReadingsRepository,
  ReadingCreateInput,
} from '../readings-repository'

const prisma = new PrismaClient()

export class PrismaReadingsRepository implements ReadingsRepository {
  async findById(id: string) {
    return await prisma.reading.findUnique({ where: { id } })
  }

  async findByUserIdAndBookId(
    userId: string,
    bookId: string
  ): Promise<Reading | null> {
    const reading = await prisma.reading.findFirst({
      where: { userId, bookId },
    })

    return reading
  }

  async create(data: ReadingCreateInput): Promise<Reading> {
    const reading = await prisma.reading.create({
      data: {
        startTime: new Date(),
        endTime: null,
        duration: data.duration ?? 0,
        lastPageRead: data.lastPageRead ?? 0,
        userId: data.user,
        bookId: data.book,
      },
    })

    return reading
  }

  async save(
    id: string,
    data: Partial<Pick<Reading, 'lastPageRead' | 'duration' | 'endTime'>>
  ) {
    return await prisma.reading.update({
      where: { id },
      data,
    })
  }
}
