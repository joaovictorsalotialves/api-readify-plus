import { validateRecoveryPasswordCodeBodySchema } from '@/http/controllers/users/validation-password-recovery-code-schema'
import { z } from 'zod'

export const validationPasswordRecoveryCodeDoc = {
  schema: {
    summary: 'Validation password recovery code',
    tags: ['auth'],
    body: validateRecoveryPasswordCodeBodySchema,
    response: {
      200: z.object({ resetPasswordToken: z.string() }),
      404: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
  },
}
