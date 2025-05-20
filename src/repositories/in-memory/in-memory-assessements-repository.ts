import type { Assessement } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type {
  AssessementCreateInput,
  AssessementsRepository,
} from '../assessements-repository'

interface UserLikeAssessement {
  userId: string
  assessementId: string
}

export class InMemoryAssessementsRepository implements AssessementsRepository {
  private assessements: Assessement[] = []
  private userLikeAssessements: UserLikeAssessement[] = []

  constructor(
    initialAssessements: Assessement[] = [],
    initialLikes: UserLikeAssessement[] = []
  ) {
    this.assessements = initialAssessements
    this.userLikeAssessements = initialLikes
  }

  async findById(id: string): Promise<Assessement | null> {
    const assessement = this.assessements.find(a => a.id === id)
    return assessement ?? null
  }

  async findManyAssessementsOfBook(bookId: string): Promise<Assessement[]> {
    return this.assessements.filter(a => a.bookId === bookId)
  }

  async create(data: AssessementCreateInput): Promise<Assessement> {
    const newAssessement: Assessement = {
      id: randomUUID(),
      score: data.score,
      comment: data.comment,
      likes: 0,
      userId: data.user,
      bookId: data.book,
    }

    this.assessements.push(newAssessement)
    return newAssessement
  }

  async save(data: Assessement): Promise<Assessement> {
    const index = this.assessements.findIndex(a => a.id === data.id)

    if (index !== -1) {
      this.assessements[index] = data
    }

    return data
  }

  async remove(assessementId: string): Promise<void> {
    this.assessements = this.assessements.filter(a => a.id !== assessementId)
    this.userLikeAssessements = this.userLikeAssessements.filter(
      like => like.assessementId !== assessementId
    )
  }

  async countAssessementOfUser(userId: string): Promise<number> {
    return this.assessements.filter(a => a.userId === userId).length
  }

  async addLikeAssessement(
    assessement: Assessement,
    userId: string
  ): Promise<Assessement> {
    const alreadyLiked = this.userLikeAssessements.some(
      like => like.assessementId === assessement.id && like.userId === userId
    )

    if (!alreadyLiked) {
      this.userLikeAssessements.push({
        assessementId: assessement.id,
        userId,
      })

      const index = this.assessements.findIndex(a => a.id === assessement.id)

      if (index !== -1) {
        this.assessements[index].likes++
        return this.assessements[index]
      }
    }

    return assessement
  }

  async removeLikeAssessement(
    assessement: Assessement,
    userId: string
  ): Promise<Assessement> {
    const before = this.userLikeAssessements.length

    this.userLikeAssessements = this.userLikeAssessements.filter(
      like => !(like.assessementId === assessement.id && like.userId === userId)
    )

    const index = this.assessements.findIndex(a => a.id === assessement.id)

    if (index !== -1 && this.userLikeAssessements.length < before) {
      this.assessements[index].likes = Math.max(
        0,
        this.assessements[index].likes - 1
      )

      return this.assessements[index]
    }

    return assessement
  }
}
