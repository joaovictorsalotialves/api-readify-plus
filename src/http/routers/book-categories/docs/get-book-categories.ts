import { z } from 'zod'

export const getBookCategoriesDoc = {
  schema: {
    summary: 'Get book categories',
    tags: ['book categories'],
    response: {
      200: z.object({
        bookCategories: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
          })
        ),
      }),
    },
  },
}
