export interface RecommendationProvider {
  getRecommendedBooks(input: {
    favoriteWriters: string[]
    favoriteCategories: string[]
    favoriteBooks: string[]
    visitedBooksWithCount: { title: string; visits: number }[]
    readingBooks: string[]
    readBooks: string[]
    availableBooks: { title: string; writer: string; category: string }[]
  }): Promise<string[]>
}

export interface SimilarBooksProvider {
  getSimilarBooks(input: {
    referenceBook: {
      title: string
      writer: string
      category: string
    }
    availableBooks: {
      title: string
      writer: string
      category: string
    }[]
  }): Promise<string[]>
}
