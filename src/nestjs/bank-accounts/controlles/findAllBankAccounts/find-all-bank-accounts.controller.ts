import { Controller, Get } from '@nestjs/common'
import { FindAllBankAccountsService } from 'src/@core/domain/bank-accounts/useCases/findAllBankAccounts/find-all-bank-accounts.service'

@Controller('bank-accounts')
export class FindAllBankAccountsController {
  constructor(
    private readonly bankAccountService: FindAllBankAccountsService
  ) {}

  @Get()
  async findAll() {
    return await this.bankAccountService.findAll()
  }
}
