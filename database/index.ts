import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Executando Categories Books...')
    await import('./book_categories')

    console.log('Executando Writers...')
    await import('./writers')

    console.log('Executando Books...')
    await import('./books')

    console.log('Todos os seeds foram executados com sucesso.')
  } catch (error) {
    console.error('Erro ao executar os seeds:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
