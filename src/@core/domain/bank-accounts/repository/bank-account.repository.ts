import { BankAccount } from '../entity/bank-account'

export interface BankAccountRepository {
  insert(bankAccount: BankAccount): Promise<void>
  findByAccountNumber(account_number: string): Promise<BankAccount>
  findAll(): Promise<BankAccount[]>
  findOneById(id: string): Promise<BankAccount>
  update(bankAccount: BankAccount): Promise<void>
}
