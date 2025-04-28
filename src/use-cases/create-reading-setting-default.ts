import type { UsersRepository } from '@/repositories/users-repository'
import type { ReadingSettingRepository } from '@/repositories/reading-setting-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { ReadingSetting } from '@prisma/client'

interface CreateReadingSettingDefaultUseCaseRequest {
  userId: string
}

interface CreateReadingSettingDefaultUseCaseResponse {
  readingSettingDefault: ReadingSetting
}

export class CreateReadingSettingDefaultUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private readingSettingRepository: ReadingSettingRepository
  ) {}

  async execute({
    userId,
  }: CreateReadingSettingDefaultUseCaseRequest): Promise<CreateReadingSettingDefaultUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const readingSettingDefault = await this.readingSettingRepository.create({
      fontFamily: 'serif',
      fontSize: 18,
      fontSpacing: '1.5',
      screenBrightness: 0.8,
      theme: 'light',
      user: user.id,
    })

    return { readingSettingDefault }
  }
}
