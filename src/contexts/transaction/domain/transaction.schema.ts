import { Schema } from 'mongoose';
import { TransactionType } from './transaction.interface';

export const TransactionSchema = new Schema(
  {
    id: String,
    tipo: { type: String, enum: Object.values(TransactionType) },
    categoria: String,
    nombre: String,
    fecha: String,
    monto: Number,
  },
  { versionKey: false },
);
