import { AddAccountRepository } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { AddAccountModel } from '@/domain/usecases';
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = {
      account_id: result.insertedId.toString(),
      name: accountData.name,
      email: accountData.email,
      password: accountData.password
    }
    return account
  }
}
