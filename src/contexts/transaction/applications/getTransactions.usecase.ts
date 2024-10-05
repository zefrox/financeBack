import { Injectable } from '@nestjs/common';
import { Criteria, QueryType } from 'src/common/helpers/criteria';
import { ITransaction } from '../domain/transaction.interface';
import { TransactionRepository } from '../domain/Transaction.repository';

@Injectable()
export class GetTransactionsUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(): Promise<ITransaction[]> {
    const filters = {};
    const criteria = new Criteria(filters, QueryType.Many);
    return await this.transactionRepository.read(criteria);
  }
}
