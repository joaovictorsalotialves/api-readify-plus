import { z } from 'zod'

export const editReadingSettingParamSchema = z.object({
  id: z.string().uuid(),
})

export const editReadingSettingBodySchema = z.object({
  fontFamily: z.string(),
  fontSize: z.coerce.number(),
  fontSpacing: z.string(),
  screenBrightness: z.coerce.number(),
  theme: z.string(),
})
