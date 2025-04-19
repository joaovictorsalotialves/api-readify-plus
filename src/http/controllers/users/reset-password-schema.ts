import { z } from 'zod'
import { regex } from '@/utils/regex/regex'

export const resetPasswordBodySchema = z.object({
  password: z.string().min(8).regex(regex.strongPasswordRegex),
  passwordConfirmation: z.string(),
})
