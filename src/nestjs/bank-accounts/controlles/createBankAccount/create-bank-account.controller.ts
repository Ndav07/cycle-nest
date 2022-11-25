import { Controller, Post, Body } from '@nestjs/common'

import { CreateBankAccountService } from 'src/@core/domain/bank-accounts/useCases/createBankAccount/create-bank-account.service'
import { CreateBankAccountDto } from '../../dto/create-bank-account.dto'

@Controller('bank-accounts')
export class CreateBankAccountController {
  constructor(private readonly bankAccountService: CreateBankAccountService) {}

  @Post()
  async create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountService.create(
      createBankAccountDto.account_number
    )
  }
}
