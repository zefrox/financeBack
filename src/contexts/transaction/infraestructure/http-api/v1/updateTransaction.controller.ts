import { Controller, Patch, Body, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UpdateTransactionUsecase } from 'src/contexts/transaction/applications/UpdateTransaction.usecase';
import { UpdateTransactionValidation } from 'src/contexts/transaction/domain/transaction.validation';
import { V1_TRANSACTION } from 'src/contexts/shared/path.constant';

@Controller(V1_TRANSACTION)
export class UpdateTransactionController {
  constructor(
    private readonly updateTransactionUsecase: UpdateTransactionUsecase,
  ) {}

  @Patch('/:id')
  async updateTransaction(
    @Body() body: UpdateTransactionValidation,
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.updateTransactionUsecase.execute(id, body);
      response.status(result ? 200 : 422).json(result);
    } catch (error) {
      console.error('Error updating transaction');
      throw error;
    }
  }
}
