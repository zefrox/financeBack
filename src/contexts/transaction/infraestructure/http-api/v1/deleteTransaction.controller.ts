import { Controller, Delete, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { DeleteTransactionUsecase } from 'src/contexts/transaction/applications/deleteTransaction.usecase';
import { V1_TRANSACTION } from 'src/contexts/shared/path.constant';

@Controller(V1_TRANSACTION)
export class DeleteTransactionController {
  constructor(
    private readonly deleteTransactionUsecase: DeleteTransactionUsecase,
  ) {}

  @Delete('/:id')
  async deleteTransaction(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.deleteTransactionUsecase.execute(id);
      response.status(result ? 200 : 422).json(result);
    } catch (error) {
      console.error('Error deleting transaction');
      throw error;
    }
  }
}
