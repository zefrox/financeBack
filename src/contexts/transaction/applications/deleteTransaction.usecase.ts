import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../domain/transaction.repository';

@Injectable()
export class DeleteTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.transactionRepository.deleteTransaction(id);
  }
}
