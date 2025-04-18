import { z } from 'zod'
import { regex } from '@/utils/regex/regex'

export const editPasswordBodySchema = z.object({
  currentPassword: z.string(),
  password: z.string().min(8).regex(regex.strongPasswordRegex),
  passwordConfirmation: z.string(),
})
