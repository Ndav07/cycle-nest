import { BankAccount } from '../../../../domain/bank-accounts/entity/bank-account'
import { BankAccountRepository } from '../../../../domain/bank-accounts/repository/bank-account.repository'
import { BankAccountSchemaTypeOrm } from '../schema/bank-account.schema'
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

  async findAll(): Promise<BankAccount[]> {
    const models = await this.ormRepository.find()
    const bankAccounts = []
    for (const j in models) {
      const bankAccount = new BankAccount(
        models[j].account_number,
        models[j].balance,
        models[j].id
      )
      bankAccounts.push(bankAccount)
    }
    return bankAccounts
  }

  async findOneById(id: string): Promise<BankAccount> {
    const model = await this.ormRepository.findOneBy({ id })
    return new BankAccount(model.account_number, model.balance, model.id)
  }

  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepository.update(bankAccount.id, {
      balance: bankAccount.balance,
    })
  }
}
