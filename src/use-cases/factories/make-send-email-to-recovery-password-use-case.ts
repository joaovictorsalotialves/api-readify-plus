import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SendEmailToRecoverPasswordUseCase } from '../send-email-to-recover-password'
import { MailtrapMailProvider } from '@/providers/implementations/MailtrapMailProvider'

export function makeSendEmailToRecoverPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const mailProvider = new MailtrapMailProvider()
  const useCase = new SendEmailToRecoverPasswordUseCase(
    usersRepository,
    mailProvider
  )

  return useCase
}
