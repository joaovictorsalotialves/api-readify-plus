import { z } from 'zod'

export const getWritersDoc = {
  schema: {
    summary: 'Get writers',
    tags: ['writers'],
    response: {
      200: z.object({
        writers: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
          })
        ),
      }),
    },
  },
}
