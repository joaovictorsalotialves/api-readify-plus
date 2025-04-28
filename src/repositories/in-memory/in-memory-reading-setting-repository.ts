import { Prisma, type ReadingSetting } from '@prisma/client'
import type {
  ReadingSettingCreateInput,
  ReadingSettingRepository,
} from '../reading-setting-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryReadingSettingRepository
  implements ReadingSettingRepository
{
  public items: ReadingSetting[] = []

  async findByUserId(userId: string): Promise<ReadingSetting | null> {
    const user = this.items.find(item => item.userId === userId)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: ReadingSettingCreateInput): Promise<ReadingSetting> {
    const readingSettingDefault = {
      id: randomUUID(),
      fontFamily: data.fontFamily,
      fontSize: Prisma.Decimal(data.fontSize.toString()),
      fontSpacing: data.fontSpacing,
      screenBrightness: Prisma.Decimal(data.screenBrightness.toString()),
      theme: data.theme,
      userId: data.user,
    }

    this.items.push(readingSettingDefault)

    return readingSettingDefault
  }

  async save(data: ReadingSetting): Promise<ReadingSetting> {
    throw new Error('Method not implemented.')
  }
}
