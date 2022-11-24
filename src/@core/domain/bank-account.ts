import { v4 as uuid } from 'uuid'

export class BankAccount {
  id: string

  balance: number

  account_number: string

  constructor(account_number: string, balance?: number, id?: string) {
    this.id = id ?? uuid()
    this.balance = balance ?? 0
    this.account_number = account_number
  }

  debit(amount: number): void {
    this.balance -= amount
  }

  credit(amount: number): void {
    this.balance += amount
  }
}
