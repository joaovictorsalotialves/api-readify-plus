import { z } from 'zod'

export const removeBookReviewDoc = {
  schema: {
    summary: 'remove book reviews',
    tags: ['book review'],
    response: {
      204: z.object({}),
      401: z.object({ message: z.string() }),
    },
  },
}
