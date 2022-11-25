import { BankAccountRepository } from '../../repository/bank-account.repository'
import { BankAccount } from '../../entity/bank-account'

export class FindAllBankAccountsService {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async findAll(): Promise<BankAccount[]> {
    return await this.bankAccountRepository.findAll()
  }
}
