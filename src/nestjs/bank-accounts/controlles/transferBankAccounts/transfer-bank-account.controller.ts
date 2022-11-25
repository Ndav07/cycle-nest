import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { TransferBankAccountService } from 'src/@core/domain/bank-accounts/useCases/transferBankAccounts/transfer-bank-account.service'

import { TransferBankAccountDto } from '../../dto/transfer-bank-account.dto'

@Controller('bank-accounts')
export class TransferBankAccountController {
  constructor(
    private readonly bankAccountService: TransferBankAccountService
  ) {}

  @HttpCode(204)
  @Post('transfer')
  async transfer(@Body() transferDto: TransferBankAccountDto) {
    await this.bankAccountService.transfer(
      transferDto.from,
      transferDto.to,
      transferDto.amount
    )
  }
}
