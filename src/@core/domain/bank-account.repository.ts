import { BankAccount } from './bank-account'

export interface BankAccountRepository {
  insert(bankAccount: BankAccount): Promise<void>
  findByAccountNumber(account_number: string): Promise<BankAccount>
  update(bankAccount: BankAccount): Promise<void>
}
