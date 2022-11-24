import { Module } from '@nestjs/common'
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { BankAccountsService } from './bank-accounts.service'
import { BankAccountsController } from './bank-accounts.controller'
import { BankAccountSchemaTypeOrm } from '../@core/infra/db/bank-account.schema'
import { BankAccountService } from 'src/@core/domain/bank-account.service'
import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/bank-account-typeorm.repository'
import { BankAccountRepository } from 'src/@core/domain/bank-account.repository'

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchemaTypeOrm])],
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    {
      provide: BankAccountTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new BankAccountTypeOrmRepository(
          dataSource.getRepository(BankAccountSchemaTypeOrm)
        )
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountService,
      useFactory: (repository: BankAccountRepository) => {
        return new BankAccountService(repository)
      },
      inject: [BankAccountTypeOrmRepository],
    },
  ],
})
export class BankAccountsModule {}
