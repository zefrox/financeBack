import { Criteria } from 'src/common/helpers/criteria';
import { ITransaction } from './transaction.interface';
import {
  CreateTransactionValidation,
  UpdateTransactionValidation,
} from './transaction.validation';

export abstract class TransactionRepository {
  abstract createTransaction(
    body: CreateTransactionValidation,
  ): Promise<ITransaction>;
  abstract updateTransaction(
    id: string,
    body: UpdateTransactionValidation,
  ): Promise<boolean>;
  abstract deleteTransaction(id: string): Promise<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract read(criteria: Criteria): Promise<any>;
}
