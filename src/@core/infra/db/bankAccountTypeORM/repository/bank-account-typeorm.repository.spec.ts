import { BankAccountSchemaTypeOrm } from '../schema/bank-account.schema'
import { DataSource, Repository } from 'typeorm'
import { BankAccountTypeOrmRepository } from './bank-account-typeorm.repository'
import { BankAccount } from '../../../../domain/bank-accounts/entity/bank-account'

describe('BankAccountTypeOrmRepository Test', () => {
  let dataSouce: DataSource
  let ormRepository: Repository<BankAccountSchemaTypeOrm>
  let repository: BankAccountTypeOrmRepository

  beforeEach(async () => {
    dataSouce = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [BankAccountSchemaTypeOrm],
    })
    await dataSouce.initialize()
    ormRepository = dataSouce.getRepository(BankAccountSchemaTypeOrm)
    repository = new BankAccountTypeOrmRepository(ormRepository)
  })

  it('should insert a new bank account', async () => {
    const bankAccount = new BankAccount('9884-32', 100, '123')
    await repository.insert(bankAccount)
    const model = await ormRepository.findOneBy({ account_number: '9884-32' })
    expect(model.id).toBe('123')
    expect(model.balance).toBe(100)
    expect(model.account_number).toBe('9884-32')
  })
})
