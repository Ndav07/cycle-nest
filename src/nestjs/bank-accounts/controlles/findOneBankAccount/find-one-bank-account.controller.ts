import { Controller, Param, Get } from '@nestjs/common'
import { FindOneBankAccountService } from 'src/@core/domain/bank-accounts/useCases/findOneBankAccount/find-one-bank-account.service'

@Controller('bank-accounts')
export class FindOneBankAccountsController {
  constructor(private readonly bankAccountService: FindOneBankAccountService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bankAccountService.findOneById(id)
  }
}
