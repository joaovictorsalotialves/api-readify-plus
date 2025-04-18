import { z } from 'zod'

export const editUserProfileBodySchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
})
