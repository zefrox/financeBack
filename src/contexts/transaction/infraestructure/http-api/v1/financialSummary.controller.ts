import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetTransactionsByDateUsecase } from 'src/contexts/transaction/applications/GetTransactionsByDate.usecase';
import { V1_TRANSACTION } from 'src/contexts/shared/path.constant';

@Controller(V1_TRANSACTION)
export class FinancialSummaryController {
  constructor(
    private readonly getTransactionsByDateUsecase: GetTransactionsByDateUsecase,
  ) {}

  @Get('/summary/:desde/:hasta')
  async financialSummaryByDate(
    @Param('desde') desde: string,
    @Param('hasta') hasta: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.getTransactionsByDateUsecase.execute(
        desde,
        hasta,
      );
      response.status(200).json(result);
    } catch (error) {
      console.error('Error obteniendo resumen financiero');
      throw error;
    }
  }
}
