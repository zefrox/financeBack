import { IsEnum, IsString, IsNumber, IsDate } from 'class-validator';
import { TransactionType } from './transaction.interface';

export class CreateTransactionValidation {
  @IsEnum(TransactionType)
  tipo: TransactionType;

  @IsString()
  categoria?: string;

  @IsString()
  nombre?: string;

  @IsDate()
  fecha: string; // formato: "YYYY-MM-DD HH:mm:ss"

  @IsNumber()
  monto: number;

  @IsNumber()
  presupuesto?: number;
}

export class UpdateTransactionValidation {
  @IsEnum(TransactionType)
  tipo?: TransactionType;

  @IsString()
  categoria?: string;

  @IsString()
  nombre?: string;

  @IsDate()
  fecha?: string; // formato: "YYYY-MM-DD HH:mm:ss"

  @IsNumber()
  monto?: number;

  @IsNumber()
  presupuesto?: number;
}
