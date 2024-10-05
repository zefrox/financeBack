import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateTransactionUsecase } from 'src/contexts/transaction/applications/CreateTransaction.usecase';
import { CreateTransactionValidation } from 'src/contexts/transaction/domain/transaction.validation';
import { V1_TRANSACTION } from 'src/contexts/shared/path.constant';

@Controller(V1_TRANSACTION)
export class CreateTransactionController {
  constructor(
    private readonly createTransactionUsecase: CreateTransactionUsecase,
  ) {}

  @Post()
  async createTransaction(
    @Body() body: CreateTransactionValidation,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.createTransactionUsecase.execute(body);
      response.status(result ? 201 : 422).json(result);
    } catch (error) {
      console.error('Error creating transaction');
      throw error;
    }
  }
}
