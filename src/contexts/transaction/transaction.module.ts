import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionRepository } from './domain/Transaction.repository';
import { TransactionRepositoryImpl } from './infraestructure/repository/TransactionImpl.repository';
import { CreateTransactionUsecase } from './applications/CreateTransaction.usecase';
import { GetTransactionsUsecase } from './applications/GetTransactions.usecase';
import { UpdateTransactionUsecase } from './applications/UpdateTransaction.usecase';
import { DeleteTransactionUsecase } from './applications/DeleteTransaction.usecase';
import { CreateTransactionController } from './infraestructure/http-api/v1/CreateTransaction.controller';
import { GetTransactionsController } from './infraestructure/http-api/v1/GetTransactions.controller';
import { UpdateTransactionController } from './infraestructure/http-api/v1/UpdateTransaction.controller';
import { DeleteTransactionController } from './infraestructure/http-api/v1/DeleteTransaction.controller';
import { TransactionSchema } from './domain/transaction.schema';
import { FinancialSummaryController } from './infraestructure/http-api/v1/financialSummary.controller';
import { GetTransactionsByDateUsecase } from './applications/getTransactionsByDate.usecase';

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
