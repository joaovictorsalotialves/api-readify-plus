import type { FastifyInstance } from 'fastify'

import { getWriters } from '@/http/controllers/writers/get-writers'

import { getWritersDoc } from './docs/get-writers'

export async function writersRoutes(app: FastifyInstance) {
  app.get('/writers', getWritersDoc, getWriters)
}
