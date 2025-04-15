import type { MailProvider, Message } from '../MailProvider'

export class FakeMailProvider implements MailProvider {
  public sent: Message[] = []

  async sendMail(data: Message) {
    this.sent.push(data)
  }
}
