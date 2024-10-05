import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/common/helpers/criteria';
import { TransactionRepository } from '../../domain/transaction.repository';
import { ITransaction } from '../../domain/transaction.interface';
import {
  CreateTransactionValidation,
  UpdateTransactionValidation,
} from '../../domain/transaction.validation';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionRepositoryImpl extends TransactionRepository {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<ITransaction>,
  ) {
    super();
  }

  async createTransaction(
    body: CreateTransactionValidation,
  ): Promise<ITransaction> {
    const dataToSave = {
      tipo: body.tipo,
      categoria: body.categoria,
      nombre: body.nombre,
      fecha: body.fecha,
      monto: body.monto,
    };

    const newTransaction = new this.transactionModel(dataToSave);
    return await newTransaction.save();
  }

  async updateTransaction(
    id: string,
    body: UpdateTransactionValidation,
  ): Promise<boolean> {
    return (await this.transactionModel.updateOne({ _id: id }, { $set: body }))
      .acknowledged;
  }

  async deleteTransaction(id: string): Promise<boolean> {
    return (await this.transactionModel.deleteOne({ _id: id })).acknowledged;
  }

  async read(criteria: Criteria): Promise<any> {
    const query = criteria.buildQuery(this.transactionModel);
    return await query.exec();
  }
}
