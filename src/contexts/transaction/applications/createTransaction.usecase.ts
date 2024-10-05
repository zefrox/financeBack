import { Injectable } from '@nestjs/common';
import { ITransaction } from '../domain/transaction.interface';
import { TransactionRepository } from '../domain/Transaction.repository';
import { CreateTransactionValidation } from '../domain/transaction.validation';

@Injectable()
export class CreateTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(body: CreateTransactionValidation): Promise<ITransaction> {
    return await this.transactionRepository.createTransaction(body);
  }
}
