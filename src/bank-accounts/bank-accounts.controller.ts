import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common'

import { BankAccountsService } from './bank-accounts.service'
import { CreateBankAccountDto } from './dto/create-bank-account.dto'
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto'

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  async create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountsService.create(createBankAccountDto)
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
    await this.bankAccountsService.transfer(
      transferDto.from,
      transferDto.to,
      transferDto.amount
    )
  }
}
