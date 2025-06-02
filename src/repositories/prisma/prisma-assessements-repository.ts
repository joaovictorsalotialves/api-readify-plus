import { prisma } from '@/lib/prisma'
import type {
  AssessementCreateInput,
  AssessementsRepository,
} from '../assessements-repository'
import type { Assessement } from '@prisma/client'
import type { AssessementDTO } from '@/dtos/Assessement'

export class PrismaAssessementsRepository implements AssessementsRepository {
  async findById(id: string): Promise<Assessement | null> {
    return await prisma.assessement.findUnique({
      where: { id },
    })
  }

  async findManyAssessementsOfBook(bookId: string): Promise<AssessementDTO[]> {
    return await prisma.assessement.findMany({
      where: { bookId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    })
  }

  async create(data: AssessementCreateInput): Promise<Assessement> {
    return await prisma.assessement.create({
      data: {
        score: data.score,
        comment: data.comment,
        likes: 0,
        userId: data.user,
        bookId: data.book,
      },
    })
  }

  async save(data: Assessement): Promise<Assessement> {
    return await prisma.assessement.update({
      where: { id: data.id },
      data,
    })
  }

  async remove(assessementId: string): Promise<void> {
    console.log(assessementId)
    // Remove likes relacionados antes por constraints de FK
    await prisma.userLikeAssessement.deleteMany({
      where: { assessementId },
    })

    await prisma.assessement.delete({
      where: { id: assessementId },
    })
  }

  async countAssessementOfUser(userId: string): Promise<number> {
    return await prisma.assessement.count({
      where: { userId },
    })
  }

  async addLikeAssessement(
    assessement: Assessement,
    userId: string
  ): Promise<Assessement> {
    const alreadyLiked = await prisma.userLikeAssessement.findUnique({
      where: {
        userId_assessementId: {
          userId,
          assessementId: assessement.id,
        },
      },
    })

    if (!alreadyLiked) {
      await prisma.userLikeAssessement.create({
        data: {
          userId,
          assessementId: assessement.id,
        },
      })

      await prisma.assessement.update({
        where: { id: assessement.id },
        data: {
          likes: { increment: 1 },
        },
      })
    }

    return (await this.findById(assessement.id)) as Assessement
  }

  async removeLikeAssessement(
    assessement: Assessement,
    userId: string
  ): Promise<Assessement> {
    const deleted = await prisma.userLikeAssessement.deleteMany({
      where: {
        userId,
        assessementId: assessement.id,
      },
    })

    if (deleted.count > 0) {
      await prisma.assessement.update({
        where: { id: assessement.id },
        data: {
          likes: { decrement: 1 },
        },
      })
    }

    return (await this.findById(assessement.id)) as Assessement
  }
}
