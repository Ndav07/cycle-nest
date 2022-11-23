import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'decimal', scale: 2 })
  balance: number

  @Column({ type: 'varchar', length: 255 })
  account_number: string
}
