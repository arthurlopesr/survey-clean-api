import { SignUpController } from '@/presentation/controllers'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcryot-adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/repositories/account/account-repository'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository
  )
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )
  return signUpController
}
