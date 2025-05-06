import type { FastifyInstance } from 'fastify'
import { register } from '../../controllers/users/register'
import { getUserProfile } from '../../controllers/users/get-user-profile'
import { editUserProfile } from '../../controllers/users/edit-user-profile'
import { editPassword } from '../../controllers/users/edit-password'
import { editReadingSetting } from '@/http/controllers/users/edit-reading-setting'

import { registerDoc } from './docs/register'
import { getUserProfileDoc } from './docs/get-user-profile'
import { editUserProfileDoc } from './docs/edit-user-profile'
import { editPasswordDoc } from './docs/edit-password'
import { editReadingSettingDoc } from './docs/edit-reading-setting'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerDoc, register)
  app.get('/me', getUserProfileDoc, getUserProfile)
  app.put('/users', editUserProfileDoc, editUserProfile)
  app.patch('/users/password', editPasswordDoc, editPassword)
  app.patch(
    '/users/readingSetting/:id',
    editReadingSettingDoc,
    editReadingSetting
  )
}
