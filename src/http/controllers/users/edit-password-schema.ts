import { z } from 'zod'

export const editPasswordBodySchema = z.object({
  currentPassword: z.string().min(6),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
})
