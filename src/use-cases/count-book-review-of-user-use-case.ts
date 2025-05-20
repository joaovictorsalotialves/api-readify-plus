import type { AssessementsRepository } from '@/repositories/assessements-repository'

interface CountBookReviewOfUserUseCaseRequest {
  userId: string
}

interface CountBookReviewOfUserUseCaseResponse {
  count: number
}

export class CountBookReviewOfUserUseCase {
  constructor(private assessementsRepository: AssessementsRepository) {}

  async execute({
    userId,
  }: CountBookReviewOfUserUseCaseRequest): Promise<CountBookReviewOfUserUseCaseResponse> {
    const count =
      await this.assessementsRepository.countAssessementOfUser(userId)

    return { count }
  }
}
