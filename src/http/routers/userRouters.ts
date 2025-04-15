import type { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'
import { authenticate } from '../controllers/users/authenticate'
import { refresh } from '../controllers/users/refresh'
import { sendEmailToRecoveryPassword } from '../controllers/users/send-email-to-recovery-password'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.post('/recovery-password/send-email', sendEmailToRecoveryPassword)
}
