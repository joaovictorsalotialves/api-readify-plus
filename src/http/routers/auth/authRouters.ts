import type { FastifyInstance } from 'fastify'
import { authenticate } from '../../controllers/users/authenticate'
import { refresh } from '../../controllers/users/refresh'
import { sendEmailToRecoverPassword } from '../../controllers/users/send-email-to-recover-password'
import { validationRecoverPasswordCode } from '../../controllers/users/validation-password-recovery-code'
import { resetPasswordCode } from '../../controllers/users/reset-password'

import { authenticateDoc } from './docs/authenticate'
import { refreshDoc } from './docs/refresh'
import { sendEmailToRecoverPasswordDoc } from './docs/send-email-to-recover-password'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateDoc, authenticate)
  app.patch('/token/refresh', refreshDoc, refresh)
  app.post(
    '/recovery-password/send-email',
    sendEmailToRecoverPasswordDoc,
    sendEmailToRecoverPassword
  )
  app.post('/recovery-password/validate-code', validationRecoverPasswordCode)
  app.post('/recovery-password/reset-password', resetPasswordCode)
}
