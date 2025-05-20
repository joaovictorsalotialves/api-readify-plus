import type { UsersRepository } from '@/repositories/users-repository'
import type { AssessementsRepository } from '@/repositories/assessements-repository'
import type { Assessement } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RemoveLikeBookReviewUseCaseRequest {
  assessementId: string
  userId: string
}

interface RemoveLikeBookReviewUseCaseResponse {
  assessement: Assessement
}

export class RemoveLikeBookReviewUseCase {
  constructor(
    private assessementsRepository: AssessementsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    assessementId,
    userId,
  }: RemoveLikeBookReviewUseCaseRequest): Promise<RemoveLikeBookReviewUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const assessement =
      await this.assessementsRepository.findById(assessementId)

    if (!user || !assessement) {
      throw new ResourceNotFoundError()
    }

    const updatedAssessement =
      await this.assessementsRepository.removeLikeAssessement(
        assessement,
        userId
      )

    return { assessement: updatedAssessement }
  }
}
