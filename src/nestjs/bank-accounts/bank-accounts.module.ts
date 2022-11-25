import { Module } from '@nestjs/common'
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { BankAccountSchemaTypeOrm } from 'src/@core/infra/db/bankAccountTypeORM/schema/bank-account.schema'
import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/bankAccountTypeORM/repository/bank-account-typeorm.repository'
import { BankAccountRepository } from 'src/@core/domain/bank-accounts/repository/bank-account.repository'

import { CreateBankAccountController } from './controlles/createBankAccount/create-bank-account.controller'
import { FindAllBankAccountsController } from './controlles/findAllBankAccounts/find-all-bank-accounts.controller'
import { FindOneBankAccountsController } from './controlles/findOneBankAccount/find-one-bank-account.controller'
import { TransferBankAccountController } from './controlles/transferBankAccounts/transfer-bank-account.controller'

import { CreateBankAccountService } from 'src/@core/domain/bank-accounts/useCases/createBankAccount/create-bank-account.service'
import { FindAllBankAccountsService } from 'src/@core/domain/bank-accounts/useCases/findAllBankAccounts/find-all-bank-accounts.service'
import { FindOneBankAccountService } from 'src/@core/domain/bank-accounts/useCases/findOneBankAccount/find-one-bank-account.service'
import { TransferBankAccountService } from 'src/@core/domain/bank-accounts/useCases/transferBankAccounts/transfer-bank-account.service'

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchemaTypeOrm])],
  controllers: [
    CreateBankAccountController,
    FindAllBankAccountsController,
    FindOneBankAccountsController,
    TransferBankAccountController,
  ],
  providers: [
    CreateBankAccountService,
    FindAllBankAccountsService,
    FindOneBankAccountService,
    TransferBankAccountService,
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
      provide: CreateBankAccountService,
      useFactory: (repository: BankAccountRepository) => {
        return new CreateBankAccountService(repository)
      },
      inject: [BankAccountTypeOrmRepository],
    },
    {
      provide: FindAllBankAccountsService,
      useFactory: (repository: BankAccountRepository) => {
        return new FindAllBankAccountsService(repository)
      },
      inject: [BankAccountTypeOrmRepository],
    },
    {
      provide: FindOneBankAccountService,
      useFactory: (repository: BankAccountRepository) => {
        return new FindOneBankAccountService(repository)
      },
      inject: [BankAccountTypeOrmRepository],
    },
    {
      provide: TransferBankAccountService,
      useFactory: (repository: BankAccountRepository) => {
        return new TransferBankAccountService(repository)
      },
      inject: [BankAccountTypeOrmRepository],
    },
  ],
})
export class BankAccountsModule {}
