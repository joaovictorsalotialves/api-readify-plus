import { z } from 'zod'

export const sendEmailToRecoverPasswordBodySchema = z.object({
  email: z.string().email(),
})
