import type { UsersRepository } from '@/repositories/users-repository'
import type { ReadingSettingRepository } from '@/repositories/reading-setting-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Prisma } from '@prisma/client'

interface EditReadingSettingUseCaseRequest {
  id: string
  fontFamily: string
  fontSize: number
  fontSpacing: string
  screenBrightness: number
  theme: string
  userId: string
}

interface ReadingSettingFormatted {
  id: string
  fontFamily: string
  fontSize: number
  fontSpacing: string
  screenBrightness: number
  theme: string
  userId: string
}

interface EditReadingSettingUseCaseResponse {
  readingSetting: ReadingSettingFormatted
}

export class EditReadingSettingUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private readingSettingRepository: ReadingSettingRepository
  ) {}

  async execute({
    id,
    fontFamily,
    fontSize,
    fontSpacing,
    screenBrightness,
    theme,
    userId,
  }: EditReadingSettingUseCaseRequest): Promise<EditReadingSettingUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const readingSettingResponse =
      await this.readingSettingRepository.findByUserId(userId)

    if (!user && !readingSettingResponse) {
      throw new ResourceNotFoundError()
    }

    const readingSetting = await this.readingSettingRepository.save({
      id,
      fontFamily,
      fontSize: new Prisma.Decimal(fontSize),
      fontSpacing,
      screenBrightness: new Prisma.Decimal(screenBrightness),
      theme,
      userId,
    })

    return {
      readingSetting: {
        ...readingSetting,
        fontSize: Number(readingSetting.fontSize),
        screenBrightness: Number(readingSetting.screenBrightness),
      },
    }
  }
}
