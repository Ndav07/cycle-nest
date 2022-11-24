import { BankAccount } from '../../domain/bank-account'
import { BankAccountRepository } from '../../domain/bank-account.repository'
import { BankAccountSchemaTypeOrm } from './bank-account.schema'
import { Repository } from 'typeorm'

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepository: Repository<BankAccountSchemaTypeOrm>) {}

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepository.create(bankAccount)
    await this.ormRepository.save(model)
  }

  async findByAccountNumber(account_number: string): Promise<BankAccount> {
    const model = await this.ormRepository.findOneBy({ account_number })
    return new BankAccount(model.account_number, model.balance, model.id)
  }

  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepository.update(bankAccount.id, {
      balance: bankAccount.balance,
    })
  }
}
