import type { ReadingsRepository } from '@/repositories/readings-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { Reading } from '@prisma/client'
import type { BooksRepository } from '@/repositories/books-repository'

interface SaveReadingProgressUseCaseRequest {
  readingId: string
  lastPageRead: number
  duration: number
}

interface SaveReadingProgressUseCaseResponse {
  reading: Reading
}

export class SaveReadingProgressUseCase {
  constructor(
    private readingsRepository: ReadingsRepository,
    private booksRepository: BooksRepository
  ) {}

  async execute({
    readingId,
    lastPageRead,
    duration,
  }: SaveReadingProgressUseCaseRequest): Promise<SaveReadingProgressUseCaseResponse> {
    const reading = await this.readingsRepository.findById(readingId)

    if (!reading) {
      throw new ResourceNotFoundError()
    }

    const book = await this.booksRepository.findById(reading.bookId)

    const updatedReading = await this.readingsRepository.save(readingId, {
      lastPageRead,
      duration: reading.duration + duration,
      endTime: reading.endTime
        ? reading.endTime
        : book?.numberPage === lastPageRead
          ? new Date()
          : null,
    })

    return { reading: updatedReading }
  }
}
