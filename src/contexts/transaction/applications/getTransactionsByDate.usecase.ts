import { Injectable } from '@nestjs/common';
import { Criteria, QueryType } from 'src/common/helpers/criteria';
import { TransactionRepository } from '../domain/transaction.repository';
import { TransactionType } from '../domain/transaction.interface';

interface GetTransactionsByDateResponse {
  totalIngresos: number;
  totalGastos: number;
  totalAhorro: number;
  saldoActual: number;
}

@Injectable()
export class GetTransactionsByDateUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    desde: string,
    hasta: string,
  ): Promise<GetTransactionsByDateResponse> {
    const filters = {
      fecha: { $gte: desde, $lte: hasta },
    };
    const criteria = new Criteria(filters, QueryType.Many);
    const transactions = await this.transactionRepository.read(criteria);

    const totalIngresos = transactions
      .filter((transaction) => transaction.tipo === TransactionType.INGRESO)
      .reduce((suma, transaction) => suma + transaction.monto, 0);

    const totalGastos = transactions
      .filter(
        (transaction) =>
          transaction.tipo === TransactionType.GASTO_FIJO ||
          transaction.tipo === TransactionType.OTRO_GASTO,
      )
      .reduce((suma, transaction) => suma + transaction.monto, 0);

    const totalAhorro = transactions
      .filter((transaction) => transaction.tipo === TransactionType.AHORRO)
      .reduce((suma, transaction) => suma + transaction.monto, 0);

    const saldoActual = totalIngresos - (totalGastos + totalAhorro);

    return {
      totalIngresos,
      totalGastos,
      totalAhorro,
      saldoActual,
    };
  }
}
