import { BankAccountRepository } from '../../repository/bank-account.repository'
import { BankAccount } from '../../entity/bank-account'

export class FindOneBankAccountService {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async findOneById(id: string): Promise<BankAccount> {
    return await this.bankAccountRepository.findOneById(id)
  }
}
