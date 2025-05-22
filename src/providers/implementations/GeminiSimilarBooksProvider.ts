import { env } from '@/env'
import type { SimilarBooksProvider } from '../IAProvider'
import { GoogleGenAI } from '@google/genai'

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

    const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    })

    console.log(response.text)

    return (
      response.text
        ?.split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => line.trim()) || []
    )
  }
}
