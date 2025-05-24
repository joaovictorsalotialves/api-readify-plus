import type { Writer } from '@prisma/client'

export interface WritersRepository {
  findAll(): Promise<Writer[]>
}
