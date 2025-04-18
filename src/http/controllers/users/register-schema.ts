import { regex } from '@/utils/regex/regex'
import { z } from 'zod'

export const registerBodySchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).regex(regex.strongPasswordRegex),
  passwordConfirmation: z.string(),
  favoriteCategories: z.array(z.string()).min(2),
  favoriteWriters: z.array(z.string()).min(2),
})
