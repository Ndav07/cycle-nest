import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common'
import { BankAccountService } from 'src/@core/domain/bank-account.service'

import { BankAccountsService } from './bank-accounts.service'
import { CreateBankAccountDto } from './dto/create-bank-account.dto'
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto'

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(
    private readonly bankAccountsService: BankAccountsService,
    private readonly bankAccountService: BankAccountService
  ) {}

  @Post()
  async create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountService.create(
      createBankAccountDto.account_number
    )
  }

  @Get()
  async findAll() {
    return await this.bankAccountsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bankAccountsService.findOne(id)
  }

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
