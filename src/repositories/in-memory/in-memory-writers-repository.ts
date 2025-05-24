import type { Writer } from '@prisma/client'
import type { WritersRepository } from '../writers-repository'

export class InMemoryWritersRepository implements WritersRepository {
  public item: Writer[] = []

  constructor(initialWriter: Writer[] = []) {
    this.item = initialWriter
  }

  async findAll() {
    return this.item
  }
}
