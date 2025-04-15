export class PasswordConfirmationMismatchError extends Error {
  constructor() {
    super('Password Confirmation Mismatch.')
  }
}
