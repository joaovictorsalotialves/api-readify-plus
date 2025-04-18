import type { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'
import { authenticate } from '../controllers/users/authenticate'
import { refresh } from '../controllers/users/refresh'
import { sendEmailToRecoverPassword } from '../controllers/users/send-email-to-recover-password'
import { validationRecoverPasswordCode } from '../controllers/users/validation-password-recovery-code'
import { resetPasswordCode } from '../controllers/users/reset-password'
import { getUserProfile } from '../controllers/users/get-user-profile'
import { verifyJWT } from '../middlewares/verify-jwt'
import { editUserProfile } from '../controllers/users/edit-user-profile'
import { editPassword } from '../controllers/users/edit-password'

import { registerDoc } from './users/docs/register'
import { getUserProfileDoc } from './users/docs/get-user-profile'
import { editUserProfileDoc } from './users/docs/edit-user-profile'
import { editPasswordDoc } from './users/docs/edit-password'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerDoc, register)
  app.get('/me', getUserProfileDoc, getUserProfile)
  app.put('/users', editUserProfileDoc, editUserProfile)
  app.patch('/users/password', editPasswordDoc, editPassword)

  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.post('/recovery-password/send-email', sendEmailToRecoverPassword)
  app.post('/recovery-password/validate-code', validationRecoverPasswordCode)
  app.post('/recovery-password/reset-password', resetPasswordCode)
}
