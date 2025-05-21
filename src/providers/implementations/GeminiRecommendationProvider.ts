import type { RecommendationProvider } from '../IAProvider'
import axios from 'axios'

export class GeminiRecommendationProvider implements RecommendationProvider {
  async getRecommendedBooks(input: {
    favoriteWriters: string[]
    favoriteCategories: string[]
    favoriteBooks: string[]
    visitedBooksWithCount: { title: string; visits: number }[]
    readingBooks: string[]
    readBooks: string[]
    availableBooks: { title: string; writer: string; category: string }[]
  }): Promise<string[]> {
    const {
      favoriteWriters,
      favoriteCategories,
      favoriteBooks,
      visitedBooksWithCount,
      readingBooks,
      readBooks,
      availableBooks,
    } = input

    const prompt = `
O usuário possui os seguintes interesses e histórico:

📚 Autores favoritos: ${favoriteWriters.length > 0 ? favoriteWriters.join(', ') : 'nenhum'}  
🏷️ Categorias favoritas: ${favoriteCategories.length > 0 ? favoriteCategories.join(', ') : 'nenhuma'}  
⭐ Livros com forte engajamento ou favoritos: ${favoriteBooks.length > 0 ? favoriteBooks.join(', ') : 'nenhum'}  
👁️‍🗨️ Livros visitados com frequência:
${visitedBooksWithCount.length > 0 ? visitedBooksWithCount.map(b => `  - ${b.title}: ${b.visits} visita(s)`).join('\n') : '  Nenhum'}  
📖 Livros que está lendo atualmente: ${readingBooks.length > 0 ? readingBooks.join(', ') : 'nenhum'}  
✅ Livros já lidos: ${readBooks.length > 0 ? readBooks.join(', ') : 'nenhum'}

Abaixo está a lista completa dos livros disponíveis para recomendação, com autor e categoria:

${availableBooks.map(b => `- ${b.title} (autor: ${b.writer}, categoria: ${b.category})`).join('\n')}

Com base nas preferências, no histórico de leitura e nos livros já lidos ou em leitura, recomende até 10 livros relevantes da lista acima que o usuário ainda **não leu**.

⚠️ Responda SOMENTE com os títulos dos livros recomendados, um por linha.  
⚠️ NÃO inclua autores, categorias, explicações ou numeração.
    `.trim()

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [
          {
            parts: [{ text: prompt }],
            role: 'user',
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    )

    const candidates = response.data.candidates
    const content = candidates?.[0]?.content?.parts?.[0]?.text

    return (
      content
        ?.split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => line.trim()) || []
    )
  }
}
