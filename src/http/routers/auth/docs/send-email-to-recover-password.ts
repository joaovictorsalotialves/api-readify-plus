import { sendEmailToRecoverPasswordBodySchema } from '@/http/controllers/auth/send-email-to-recover-password-schema'
import { z } from 'zod'

export const sendEmailToRecoverPasswordDoc = {
  schema: {
    summary: 'Send email to recover password',
    tags: ['auth'],
    body: sendEmailToRecoverPasswordBodySchema,
    response: {
      200: z.object({ recoveryPasswordToken: z.string() }),
      404: z.object({ message: z.string() }),
    },
  },
}
