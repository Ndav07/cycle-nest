import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { BankAccount } from './entities/bank-account.entity'
import { CreateBankAccountDto } from './dto/create-bank-account.dto'

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly repository: Repository<BankAccount>
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.repository.create({
      account_number: createBankAccountDto.account_number,
      balance: 0,
    })
    await this.repository.insert(bankAccount)
    return bankAccount
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({ id })
  }

  async transfer(from: string, to: string, amount: number) {
    const fromAccount = await this.repository.findOneBy({
      account_number: from,
    })
    const toAccount = await this.repository.findOneBy({ account_number: to })

    fromAccount.balance -= amount
    toAccount.balance += amount

    this.repository.save(fromAccount)
    this.repository.save(toAccount)
  }
}
