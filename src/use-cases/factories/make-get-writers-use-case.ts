import { PrismaWritersRepository } from '@/repositories/prisma/prisma-writers-repository'
import { GetWritersUseCase } from '../get-writers-use-case'

export function makeGetWritersUseCase() {
  const writersRepository = new PrismaWritersRepository()
  const useCase = new GetWritersUseCase(writersRepository)

  return useCase
}
