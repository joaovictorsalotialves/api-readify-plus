import { z } from 'zod'

export const validateRecoveryPasswordCodeBodySchema = z.object({
  passwordRecoveryCode: z.string().length(6),
})
