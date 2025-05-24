import { prisma } from '@/lib/prisma'
import type { WritersRepository } from '../writers-repository'

export class PrismaWritersRepository implements WritersRepository {
  async findAll() {
    const writers = await prisma.writer.findMany()

    return writers
  }
}
