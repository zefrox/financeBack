import { Injectable } from '@nestjs/common';
import { type ITransaction } from '../domain/transaction.interface';
import { CreateTransactionValidation } from '../domain/transaction.validation';
import { TransactionRepository } from '../domain/transaction.repository';

@Injectable()
export class CreateTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(body: CreateTransactionValidation): Promise<ITransaction> {
    return await this.transactionRepository.createTransaction(body);
  }
}
