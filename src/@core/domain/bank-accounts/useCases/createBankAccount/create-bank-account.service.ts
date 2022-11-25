import { BankAccountRepository } from '../../repository/bank-account.repository'
import { BankAccount } from '../../entity/bank-account'

export class CreateBankAccountService {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}
  async create(account_number: string) {
    const bankAccount = new BankAccount(account_number)
    await this.bankAccountRepository.insert(bankAccount)
    return bankAccount
  }
}
