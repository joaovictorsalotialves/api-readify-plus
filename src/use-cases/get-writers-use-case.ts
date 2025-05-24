import type { Writer } from '@prisma/client'

import type { WritersRepository } from '@/repositories/writers-repository'

interface GetWritersUseCaseResponse {
  writers: Writer[]
}

export class GetWritersUseCase {
  constructor(private writersRepository: WritersRepository) {}

  async execute(): Promise<GetWritersUseCaseResponse> {
    const writers = await this.writersRepository.findAll()

    return { writers }
  }
}
