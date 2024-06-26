import { AddAccountRepository, Encrypter } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { AddAccount, AddAccountModel } from '@/domain/usecases'

export class DbAddAccount implements AddAccount{
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) { }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassoword = await this.encrypter.encrypt(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassoword
    });
    return account;
  }
}
