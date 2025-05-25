import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'

const prisma = new PrismaClient()

async function main() {
  const filePath = path.resolve(__dirname, './writers.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const data = JSON.parse(fileContent)

  if (!Array.isArray(data.writers)) {
    throw new Error('Formato inválido de JSON: "writers" não encontrado.')
  }

  await prisma.writer.createMany({
    data: data.writers,
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
