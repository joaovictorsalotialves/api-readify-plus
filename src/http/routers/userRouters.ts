import type { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'
import { authenticate } from '../controllers/users/authenticate'
import { refresh } from '../controllers/users/refresh'
import { sendEmailToRecoverPassword } from '../controllers/users/send-email-to-recover-password'
import { validationRecoverPasswordCode } from '../controllers/users/validation-password-recovery-code'
import { resetPasswordCode } from '../controllers/users/reset-password'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.post('/recovery-password/send-email', sendEmailToRecoverPassword)
  app.post('/recovery-password/validate-code', validationRecoverPasswordCode)
  app.post('/recovery-password/reset-password', resetPasswordCode)
}
