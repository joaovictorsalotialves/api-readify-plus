import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SendEmailToRecoveryPasswordUseCase } from '../send-email-to-recovery-password'
import { MailtrapMailProvider } from '@/providers/implementations/MailtrapMailProvider'

export function makeSendEmailToRecoveryPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const mailProvider = new MailtrapMailProvider()
  const useCase = new SendEmailToRecoveryPasswordUseCase(
    usersRepository,
    mailProvider
  )

  return useCase
}
