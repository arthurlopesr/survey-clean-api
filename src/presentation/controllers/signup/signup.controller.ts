import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator
} from "@/presentation/protocols"
import { InvalidParamError, MissingParamError } from "@/presentation/errors"
import { badRequest, serverError, ok} from "@/presentation/helpers"
import { AddAccount } from "@/domain/usecases"


export class SignUpController implements Controller{
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccountStub: AddAccount
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      const account = await this.addAccountStub.add({
        name,
        email,
        password,
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
