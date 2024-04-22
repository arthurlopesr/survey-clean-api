import { HttpResponse } from "@/presentation/protocols"
import { ServerError } from "@/presentation/errors"

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 400,
    body: new ServerError
  }
}
