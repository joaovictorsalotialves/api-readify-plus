import type { ReadingSetting } from '@prisma/client'
import type {
  ReadingSettingCreateInput,
  ReadingSettingRepository,
} from '../reading-setting-repository'

import { prisma } from '@/lib/prisma'

export class PrismaReadingSettingRepository
  implements ReadingSettingRepository
{
  async findByUserId(userId: string) {
    const readingSetting = await prisma.readingSetting.findUnique({
      where: {
        userId,
      },
    })

    return readingSetting
  }

  async create(data: ReadingSettingCreateInput) {
    const readingSetting = await prisma.readingSetting.create({
      data: {
        ...data,
        user: {
          connect: {
            id: data.user,
          },
        },
      },
    })

    return readingSetting
  }

  async save(data: ReadingSetting): Promise<ReadingSetting> {
    const readingSetting = await prisma.readingSetting.update({
      data,
      where: {
        id: data.id,
      },
    })

    return readingSetting
  }
}
