import { BankAccount } from './bank-account'

describe('BankAccount Unit Test', () => {
  it('should create a bank account', () => {
    const bankAccount = new BankAccount('1277', 200, '8897-56')
    expect(bankAccount.id).toBe('1277')
    expect(bankAccount.balance).toBe(200)
    expect(bankAccount.account_number).toBe('8897-56')
  })

  it('should debit an acount', () => {
    const bankAccount = new BankAccount('1277', 200, '8897-56')
    bankAccount.debit(50)
    expect(bankAccount.balance).toBe(150)
  })

  it('should credit an acount', () => {
    const bankAccount = new BankAccount('1277', 200, '8897-56')
    bankAccount.credit(50)
    expect(bankAccount.balance).toBe(250)
  })
})
