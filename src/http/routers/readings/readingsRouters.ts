import type { FastifyInstance } from 'fastify'

import { getOrCreateReadingDoc } from './docs/get-or-create-reading'
import { saveReadingProgressDoc } from './docs/save-reading-progress'

import { getOrCreateReading } from '@/http/controllers/readings/get-or-create-reading'
import { saveReadingProgress } from '@/http/controllers/readings/save-reading-progress'

export async function readingsRoutes(app: FastifyInstance) {
  app.get('/books/:bookId/reading', getOrCreateReadingDoc, getOrCreateReading)
  app.post(
    '/reading/:readingId/save-progress',
    saveReadingProgressDoc,
    saveReadingProgress
  )
}
