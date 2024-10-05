import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetTransactionsUsecase } from 'src/contexts/transaction/applications/getTransactions.usecase';
import { V1_TRANSACTION } from 'src/contexts/shared/path.constant';

@Controller(V1_TRANSACTION)
export class GetTransactionsController {
  constructor(
    private readonly getTransactionsUsecase: GetTransactionsUsecase,
  ) {}

  @Get()
  async getTransactions(@Res() response: Response): Promise<void> {
    try {
      const result = await this.getTransactionsUsecase.execute();
      response.status(result.length > 0 ? 200 : 204).json(result);
    } catch (error) {
      console.error('Error getting transactions');
      throw error;
    }
  }
}
