import type { UsersRepository } from '@/repositories/users-repository'
import type { ReadingSettingRepository } from '@/repositories/reading-setting-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetReadingSettingUseCaseRequest {
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

interface GetReadingSettingUseCaseResponse {
  readingSetting: ReadingSettingFormatted
}

export class GetReadingSettingUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private readingSettingRepository: ReadingSettingRepository
  ) {}

  async execute({
    userId,
  }: GetReadingSettingUseCaseRequest): Promise<GetReadingSettingUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const readingSetting =
      await this.readingSettingRepository.findByUserId(userId)

    if (!user || !readingSetting) {
      throw new ResourceNotFoundError()
    }

    return {
      readingSetting: {
        ...readingSetting,
        fontSize: Number(readingSetting.fontSize),
        screenBrightness: Number(readingSetting.screenBrightness),
      },
    }
  }
}
