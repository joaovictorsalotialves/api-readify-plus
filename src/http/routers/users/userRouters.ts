import type { FastifyInstance } from 'fastify'
import { register } from '../../controllers/users/register'
import { getUserProfile } from '../../controllers/users/get-user-profile'
import { editUserProfile } from '../../controllers/users/edit-user-profile'
import { editPassword } from '../../controllers/users/edit-password'

import { registerDoc } from './docs/register'
import { getUserProfileDoc } from './docs/get-user-profile'
import { editUserProfileDoc } from './docs/edit-user-profile'
import { editPasswordDoc } from './docs/edit-password'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerDoc, register)
  app.get('/me', getUserProfileDoc, getUserProfile)
  app.put('/users', editUserProfileDoc, editUserProfile)
  app.patch('/users/password', editPasswordDoc, editPassword)
}
