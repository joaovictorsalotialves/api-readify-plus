import type { Assessement } from '@prisma/client'

import type { AssessementsRepository } from '@/repositories/assessements-repository'

interface GetBookReviewsUseCaseRequest {
  bookId: string
}

interface GetBookReviewsUseCaseResponse {
  assessement: Assessement[]
}

export class GetBookReviewsUseCase {
  constructor(private assessementsRepository: AssessementsRepository) {}

  async execute({
    bookId,
  }: GetBookReviewsUseCaseRequest): Promise<GetBookReviewsUseCaseResponse> {
    const assessement =
      await this.assessementsRepository.findManyAssessementsOfBook(bookId)

    return { assessement }
  }
}
