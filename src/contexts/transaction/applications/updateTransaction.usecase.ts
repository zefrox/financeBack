import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../domain/transaction.repository';
import { UpdateTransactionValidation } from '../domain/transaction.validation';

@Injectable()
export class UpdateTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    id: string,
    body: UpdateTransactionValidation,
  ): Promise<boolean> {
    return await this.transactionRepository.updateTransaction(id, body);
  }
}
