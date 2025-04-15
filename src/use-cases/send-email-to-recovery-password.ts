import type { UsersRepository } from '@/repositories/users-repository'
import { generateRecoveryCode } from '@/utils/generate-recovery-code'
import type { MailProvider } from '@/providers/MailProvider'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { generateEmailRecoveryPassword } from '@/utils/generate-email-recovery-password'
import type { User } from '@prisma/client'

interface SendEmailToRecoveryPasswordUseCaseRequest {
  email: string
}

interface SendEmailToRecoveryPasswordUseCaseResponse {
  user: User
}

export class SendEmailToRecoveryPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mailProvider: MailProvider
  ) {}

  async execute({
    email,
  }: SendEmailToRecoveryPasswordUseCaseRequest): Promise<SendEmailToRecoveryPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const recoveryCode = generateRecoveryCode()
    user.passwordRecoveryCode = recoveryCode

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Código de recuperação de senha',
      body: generateEmailRecoveryPassword(user.name, recoveryCode),
    })

    return {
      user,
    }
  }
}
