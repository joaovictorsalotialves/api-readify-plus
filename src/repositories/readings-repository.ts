import type { Prisma, Reading } from '@prisma/client'

export type ReadingCreateInput = Prisma.ReadingCreateInput & {
  user: string
  book: string
}

export interface ReadingsRepository {
  findById(readingId: string): Promise<Reading | null>
  findByUserIdAndBookId(userId: string, bookId: string): Promise<Reading | null>
  create(data: ReadingCreateInput): Promise<Reading>
  save(
    id: string,
    data: Partial<Pick<Reading, 'lastPageRead' | 'duration' | 'endTime'>>
  ): Promise<Reading>
}
