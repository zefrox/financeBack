import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTransactionUsecase } from './applications/createTransaction.usecase';
import { DeleteTransactionUsecase } from './applications/deleteTransaction.usecase';
import { GetTransactionsUsecase } from './applications/getTransactions.usecase';
import { GetTransactionsByDateUsecase } from './applications/getTransactionsByDate.usecase';
import { UpdateTransactionUsecase } from './applications/updateTransaction.usecase';
import { TransactionRepository } from './domain/Transaction.repository';
import { TransactionSchema } from './domain/transaction.schema';
import { CreateTransactionController } from './infraestructure/http-api/v1/createTransaction.controller';
import { DeleteTransactionController } from './infraestructure/http-api/v1/deleteTransaction.controller';
import { FinancialSummaryController } from './infraestructure/http-api/v1/financialSummary.controller';
import { GetTransactionsController } from './infraestructure/http-api/v1/getTransactions.controller';
import { UpdateTransactionController } from './infraestructure/http-api/v1/updateTransaction.controller';
import { TransactionRepositoryImpl } from './infraestructure/repository/transactionImpl.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Transaction',
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryImpl,
    },
    CreateTransactionUsecase,
    GetTransactionsUsecase,
    UpdateTransactionUsecase,
    DeleteTransactionUsecase,
    GetTransactionsByDateUsecase,
  ],
  controllers: [
    CreateTransactionController,
    GetTransactionsController,
    UpdateTransactionController,
    DeleteTransactionController,
    FinancialSummaryController,
  ],
})
export class TransactionModule {}
