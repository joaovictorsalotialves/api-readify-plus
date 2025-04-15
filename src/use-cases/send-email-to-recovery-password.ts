import type { User } from '@prisma/client'

import type { UsersRepository } from '@/repositories/users-repository'
import { generateRecoveryCode } from '@/utils/generate-recovery-code'
import type { MailProvider } from '@/providers/MailProvider'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #333;">Olá, ${user.name}!</h2>
    
          <p>Recebemos uma solicitação para redefinir a sua senha.</p>
    
          <p>Use o código abaixo para continuar com o processo de recuperação:</p>
    
          <div style="font-size: 24px; font-weight: bold; background-color: #f0f0f0; padding: 16px; text-align: center; border-radius: 8px; margin: 20px 0;">
            ${recoveryCode}
          </div>
    
          <p style="color: #555;">Se você não solicitou essa recuperação, pode ignorar este e-mail.</p>
    
          <p>Atenciosamente,<br><strong>Equipe do Sistema</strong></p>
        </div>
      `,
    })

    return {
      user,
    }
  }
}
