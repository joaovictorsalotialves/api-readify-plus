import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'

const prisma = new PrismaClient()

async function main() {
  const filePath = path.resolve(__dirname, './book_categories.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const data = JSON.parse(fileContent)

  if (!Array.isArray(data.book_categories)) {
    throw new Error(
      'Formato inválido de JSON: "book_categories" não encontrado.'
    )
  }

  await prisma.bookCategory.createMany({
    data: data.book_categories,
    skipDuplicates: true,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
