import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BankAccountsModule } from './nestjs/bank-accounts/bank-accounts.module'
import { BankAccountSchemaTypeOrm } from './@core/infra/db/bankAccountTypeORM/schema/bank-account.schema'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      entities: [BankAccountSchemaTypeOrm],
    }),
    BankAccountsModule,
  ],
})
export class AppModule {}
