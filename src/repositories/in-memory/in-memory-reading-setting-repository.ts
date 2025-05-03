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

  async findByUserId(userId: string) {
    const user = this.items.find(item => item.userId === userId)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: ReadingSettingCreateInput) {
    const readingSettingDefault = {
      id: randomUUID(),
      fontFamily: data.fontFamily,
      fontSize: new Prisma.Decimal(data.fontSize.toString()),
      fontSpacing: data.fontSpacing,
      screenBrightness: new Prisma.Decimal(data.screenBrightness.toString()),
      theme: data.theme,
      userId: data.user,
    }

    this.items.push(readingSettingDefault)

    return readingSettingDefault
  }

  async save(data: ReadingSetting) {
    const readingSettingIndex = this.items.findIndex(
      item => item.userId === data.userId
    )

    if (readingSettingIndex >= 0) {
      this.items[readingSettingIndex] = data
    }

    return data
  }
}
