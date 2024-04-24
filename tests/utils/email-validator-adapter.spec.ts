import { EmailValidatorAdapter } from "@/utils/email-validator-adapter"

describe('EmailValidator Adapter', () => {
  it('shuld return false if valiator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect (isValid).toBe(false)
  })
})
