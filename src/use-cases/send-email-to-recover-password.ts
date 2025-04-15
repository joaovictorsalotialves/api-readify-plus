import type { UsersRepository } from '@/repositories/users-repository'
import { generatePasswordRecoveryCode } from '@/utils/generate-password-recovery-code'
import type { MailProvider } from '@/providers/MailProvider'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { generateEmailRecoveryPassword } from '@/utils/generate-email-recover-password'
import type { User } from '@prisma/client'

interface SendEmailToRecoverPasswordUseCaseRequest {
  email: string
}

interface SendEmailToRecoverPasswordUseCaseResponse {
  user: User
}

export class SendEmailToRecoverPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mailProvider: MailProvider
  ) {}

  async execute({
    email,
  }: SendEmailToRecoverPasswordUseCaseRequest): Promise<SendEmailToRecoverPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const recoveryCode = generatePasswordRecoveryCode()
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
