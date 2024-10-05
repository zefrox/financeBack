import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { env } from './env';
import { TransactionModule } from './contexts/transaction/transaction.module';

@Module({
  imports: [MongooseModule.forRoot(env.PATH_CONNECTION_DB), TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
