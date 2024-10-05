import { Document } from 'mongoose';

export interface ITransaction extends Document {
  id: string;
  tipo: TransactionType;
  categoria?: string;
  nombre?: string;
  fecha: string; // formato: "YYYY-MM-DD HH:mm:ss"
  monto: number;
  presupuesto?: number;
}

export enum TransactionType {
  GASTO_FIJO = 'Gasto Fijo',
  OTRO_GASTO = 'Otro Gasto',
  INGRESO = 'Ingreso',
  AHORRO = 'Ahorro',
}
