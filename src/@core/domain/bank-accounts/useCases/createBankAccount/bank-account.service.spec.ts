import { DataSource, Repository } from 'typeorm'

import { BankAccountSchemaTypeOrm } from '../../../../infra/db/bankAccountTypeORM/schema/bank-account.schema'
import { BankAccountTypeOrmRepository } from '../../../../infra/db/bankAccountTypeORM/repository/bank-account-typeorm.repository'
import { CreateBankAccountService } from './create-bank-account.service'

describe('BankAccountService Test', () => {
  let dataSouce: DataSource
  let ormRepository: Repository<BankAccountSchemaTypeOrm>
  let repository: BankAccountTypeOrmRepository
  let bankAccountService: CreateBankAccountService

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
    bankAccountService = new CreateBankAccountService(repository)
  })

  it('should create a new bank account', async () => {
    await bankAccountService.create('9884-32')
    const model = await ormRepository.findOneBy({ account_number: '9884-32' })
    expect(model).toHaveProperty('id')
    expect(model.balance).toBe(0)
    expect(model.account_number).toBe('9884-32')
  })
})
