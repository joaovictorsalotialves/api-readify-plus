import type { Prisma, ReadingSetting } from '@prisma/client'

export type ReadingSettingCreateInput = Prisma.ReadingSettingCreateInput & {
  user: string
}

export interface ReadingSettingRepository {
  findByUserId(userId: string): Promise<ReadingSetting | null>
  create(data: ReadingSettingCreateInput): Promise<ReadingSetting>
  save(data: ReadingSetting): Promise<ReadingSetting>
}
