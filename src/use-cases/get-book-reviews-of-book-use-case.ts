import type { AssessementsRepository } from '@/repositories/assessements-repository'
import type { AssessementDTO } from '@/dtos/Assessement'

interface GetBookReviewsUseCaseRequest {
  bookId: string
}

interface GetBookReviewsUseCaseResponse {
  assessement: AssessementDTO[]
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
