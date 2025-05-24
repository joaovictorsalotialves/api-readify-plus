export type BooksDTO = {
  id: string
  title: string
  urlCover: string
  bookPath: string
  synopsis: string
  publisher: string
  numberPage: number | null
  language: string
  ISBN: string
  score: number
  visits: number
  assessements: number
  read: number
  favorite: number

  writer: {
    id: string
    name: string
  }
  category: {
    id: string
    name: string
  }
}
