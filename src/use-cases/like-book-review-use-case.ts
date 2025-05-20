import type { UsersRepository } from '@/repositories/users-repository'
import type { AssessementsRepository } from '@/repositories/assessements-repository'
import type { Assessement } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface LikeBookReviewUseCaseRequest {
  assessementId: string
  userId: string
}

interface LikeBookReviewUseCaseResponse {
  assessement: Assessement
}

export class LikeBookReviewUseCase {
  constructor(
    private assessementsRepository: AssessementsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    assessementId,
    userId,
  }: LikeBookReviewUseCaseRequest): Promise<LikeBookReviewUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const assessement =
      await this.assessementsRepository.findById(assessementId)

    if (!user || !assessement) {
      throw new ResourceNotFoundError()
    }

    const updatedAssessement =
      await this.assessementsRepository.addLikeAssessement(assessement, userId)

    return { assessement: updatedAssessement }
  }
}
