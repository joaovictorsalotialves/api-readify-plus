import type { SimilarBooksProvider } from '../IAProvider'
import axios from 'axios'

export class GeminiSimilarBooksProvider implements SimilarBooksProvider {
  async getSimilarBooks(input: {
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
  }): Promise<string[]> {
    const { referenceBook, availableBooks } = input

    const prompt = `
O livro de referência é:
- Título: ${referenceBook.title}
- Autor: ${referenceBook.writer}
- Categoria: ${referenceBook.category}

Com base nisso, recomende até 10 livros semelhantes da seguinte lista de livros disponíveis:
${availableBooks
  .map(
    book =>
      `- Título: ${book.title}, Autor: ${book.writer}, Categoria: ${book.category}`
  )
  .join('\n')}

Responda apenas com os títulos dos livros recomendados, um por linha. Sem explicações, sem autores, sem numeração.
    `.trim()

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: process.env.GEMINI_API_KEY },
      }
    )

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text

    return (
      content
        ?.split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => line.trim()) || []
    )
  }
}
