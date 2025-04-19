import type { FastifyInstance } from 'fastify'
import { authenticate } from '../../controllers/auth/authenticate'
import { refresh } from '../../controllers/auth/refresh'
import { sendEmailToRecoverPassword } from '../../controllers/auth/send-email-to-recover-password'
import { validationRecoverPasswordCode } from '../../controllers/auth/validation-password-recovery-code'
import { resetPasswordCode } from '../../controllers/auth/reset-password'

import { authenticateDoc } from './docs/authenticate'
import { refreshDoc } from './docs/refresh'
import { sendEmailToRecoverPasswordDoc } from './docs/send-email-to-recover-password'
import { validationPasswordRecoveryCodeDoc } from './docs/validation-password-recovery-code'
import { resetPasswordDoc } from './docs/reset-password'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateDoc, authenticate)
  app.patch('/token/refresh', refreshDoc, refresh)
  app.post(
    '/recovery-password/send-email',
    sendEmailToRecoverPasswordDoc,
    sendEmailToRecoverPassword
  )
  app.post(
    '/recovery-password/validate-code',
    validationPasswordRecoveryCodeDoc,
    validationRecoverPasswordCode
  )
  app.post(
    '/recovery-password/reset-password',
    resetPasswordDoc,
    resetPasswordCode
  )
}
