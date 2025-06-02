export type AssessementDTO = {
  id: string
  score: number
  comment: string
  likes: number
  bookId: string
  userId: string
  user: {
    username: string
  }
}
