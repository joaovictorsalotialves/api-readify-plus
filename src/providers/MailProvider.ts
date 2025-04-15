interface EmailAddress {
  name: string
  email: string
}

export interface Message {
  to: EmailAddress
  subject: string
  body: string
}

export interface MailProvider {
  sendMail(message: Message): Promise<void>
}
