import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import type { MailProvider, Message } from '../MailProvider'
import { env } from '@/env'

export class MailtrapMailProvider implements MailProvider {
  private transporter: Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
      },
    })
  }

  async sendMail(message: Message): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: 'Readify Plus',
        address: 'readifyplus@gmail.com',
      },
      subject: message.subject,
      html: message.body,
    })
  }
}
