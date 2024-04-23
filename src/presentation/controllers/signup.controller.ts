import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols"
import { InvalidParamError, MissingParamError } from "@/presentation/errors"
import { badRequest, serverError } from "@/presentation/helpers"
import { EmailValidator } from "@/presentation/protocols"
import { AddAccount } from "@/domain/usecases"


export class SignUpController implements Controller{
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccountStub: AddAccount
  ) { }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const { name, email, password, passwordConfirmation } = httpRequest.body
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccountStub.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
