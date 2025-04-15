export class InvalidPasswordRecoveryCodeError extends Error {
  constructor() {
    super('Invalid Password Recovery Code.')
  }
}
