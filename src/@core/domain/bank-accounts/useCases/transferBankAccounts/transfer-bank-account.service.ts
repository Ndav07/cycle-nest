import { BankAccountRepository } from '../../repository/bank-account.repository'

export class TransferBankAccountService {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}
  async transfer(
    account_number_src: string,
    account_number_dest: string,
    amount: number
  ) {
    const bankAccountSrc = await this.bankAccountRepository.findByAccountNumber(
      account_number_src
    )
    const bankAccountDest =
      await this.bankAccountRepository.findByAccountNumber(account_number_dest)

    try {
      bankAccountSrc.debit(amount)
      bankAccountDest.credit(amount)

      await this.bankAccountRepository.update(bankAccountSrc)
      await this.bankAccountRepository.update(bankAccountDest)
    } catch (e) {
      throw e
    }
  }
}
