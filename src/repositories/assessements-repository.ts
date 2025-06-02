import type { AssessementDTO } from '@/dtos/Assessement'
import type { Prisma, Assessement } from '@prisma/client'

export type AssessementCreateInput = Prisma.AssessementCreateInput & {
  user: string
  book: string
}

export interface AssessementsRepository {
  findById(id: string): Promise<Assessement | null>
  findManyAssessementsOfBook(bookId: string): Promise<AssessementDTO[]>
  create(data: AssessementCreateInput): Promise<Assessement>
  save(data: Assessement): Promise<Assessement>
  remove(assessementId: string): Promise<void>
  countAssessementOfUser(userId: string): Promise<number>
  addLikeAssessement(
    assessement: Assessement,
    userId: string
  ): Promise<Assessement>
  removeLikeAssessement(
    assessement: Assessement,
    userId: string
  ): Promise<Assessement>
}
